/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import castArray from 'lodash/castArray';
import Search from 'wix-ui-icons-common/Search';

import Input from '../Input';
import InputWithOptions from '../InputWithOptions';
import {
  google2address,
  includes,
  trySetStreetNumberIfNotReceived,
} from './google2address';
import styles from './GoogleAddressInput.scss';

export const GoogleAddressInputHandler = {
  geocode: 'geocode',
  places: 'places',
};

/**
 * Address input box (using Google Maps)
 */
class GoogleAddressInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      value: props.value || '',
    };

    this.autoCompleteRequestId = 0;
    this.geocodeRequestId = 0;
    this.client = new props.Client();

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSet = this.onSet.bind(this);
    this.onManuallyInput = this.onManuallyInput.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._getSuggestions(nextProps.value)
        .then(suggestions => {
          this.setState({ suggestions });
        })
        .catch(() => {
          // Nothing really to do...
          this.setState({ suggestions: [] });
        });
    }
  }

  render() {
    const { suggestions, value } = this.state;
    const { magnifyingGlass } = this.props;

    const options = [
      ...suggestions.map(({ description, id }) => ({ id, value: description })),

      ...(this.props.footer
        ? [
            {
              id: suggestions.length,
              value: this.props.footer,
              ...this.props.footerOptions,
            },
          ]
        : []),
    ];

    const suffix = magnifyingGlass ? (
      <Input.IconAffix>
        <Search data-hook="search-icon" />
      </Input.IconAffix>
    ) : (
      undefined
    );

    return (
      <div>
        <InputWithOptions
          ref={autocomplete => (this.autocomplete = autocomplete)}
          {...this.props}
          onInput={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onSelect={option => this.onSet(option.value)}
          onManuallyInput={this.onManuallyInput}
          value={value}
          options={options}
          fixedFooter={
            suggestions.length && this.props.poweredByGoogle
              ? GoogleAddressInput.getGoogleFooter()
              : null
          }
          suffix={suffix}
          selectedHighlight={false}
        />
      </div>
    );
  }

  static getGoogleFooter = () => (
    <div className={styles.googleFooter} data-hook="google-footer" />
  );

  focus() {
    this.autocomplete.focus();
  }

  select() {
    this.autocomplete.select();
  }

  onChange(e) {
    const value = e.target.value;
    this.props.onChange && this.props.onChange(e);
    this.props.onSet && this.props.onSet(null);

    if (typeof this.props.value !== 'undefined') {
      // Controlled mode
      return;
    }

    this._getSuggestions(value)
      .then(suggestions => {
        this.setState({ suggestions });
      })
      .catch(() => {
        // Nothing really to do...
        this.setState({ suggestions: [] });
      });
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();

    if (this.props.clearSuggestionsOnBlur) {
      this.timer = setTimeout(() => {
        this.setState({ suggestions: [] });
      }, 250);
    }
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
  }

  onSet(value) {
    const { countryCode, handler } = this.props;

    const suggestion = this.state.suggestions.find(
      s => s.description === value,
    );

    this.setState({ suggestions: [], value: this.props.value || value });

    const requestId = ++this.geocodeRequestId;
    let handlerCall;

    if (
      handler === GoogleAddressInputHandler.places &&
      suggestion &&
      suggestion.place_id
    ) {
      const request = {
        request: {
          placeId: suggestion.place_id,
        },
      };
      if (this.props.placeDetailsFields) {
        request.request.fields = this.props.placeDetailsFields;
      }
      handlerCall = this.client.placeDetails(request);
    } else {
      handlerCall = this.client.geocode({
        request: {
          region: countryCode,
          [suggestion ? 'placeId' : 'address']: suggestion
            ? suggestion.place_id
            : value,
        },
      });
    }

    handlerCall
      .then(results => {
        results = castArray(results).filter(Boolean);

        if (requestId !== this.geocodeRequestId) {
          return;
        }

        if (results.length === 0) {
          console.error(
            `[GoogleAddressInput] handler (${handler}) returned no results on`,
            value,
          );
          this.props.onSet && this.props.onSet(null);
          // This shouldn't happen since we're running geocode on exactly the same
          // value returned by suggestions list
          return;
        }
        const firstResult = trySetStreetNumberIfNotReceived(
          results[0],
          this.state.value,
        );
        const result = {
          originValue: value,
          googleResult: firstResult,
          address: google2address(firstResult),
        };

        this.props.onSet && this.props.onSet(result);
      })
      .catch(e => {
        console.error(
          `[GoogleAddressInput] handler (${handler}) failed on`,
          value,
          e.message,
        );
        this.props.onSet && this.props.onSet(null);
      });
  }

  onManuallyInput(inputValue) {
    const { value, fallbackToManual, onSet } = this.props;
    if (fallbackToManual) {
      this._getSuggestions(inputValue, typeof value !== 'undefined').then(
        suggestions => {
          if (suggestions.length === 0) {
            // No suggestion to the text entered
            if (inputValue) {
              this.onSet(inputValue);
            } else {
              onSet && onSet(null);
            }
          }
        },
      );
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  _getSuggestions(value, skipSetState) {
    const { valuePrefix = '', countryCode, types, filterTypes } = this.props;

    const requestId = ++this.autoCompleteRequestId;

    return new Promise(resolve => {
      if (skipSetState) {
        // Controlled mode
        resolve();
        return;
      }

      this.setState({ value }, () => resolve());
    })
      .then(() => {
        if (value === '') {
          return Promise.resolve([]);
        }

        const request = {
          types,
          componentRestrictions: { country: countryCode },
          input: valuePrefix + value,
        };

        return this.client.autocomplete({ request });
      })
      .then(results => {
        if (results.length === 0) {
          return Promise.resolve([]);
        }

        if (requestId !== this.autoCompleteRequestId) {
          return Promise.resolve([]);
        }

        if (filterTypes) {
          results = results.filter(result =>
            includes(result.types, filterTypes),
          );
        }

        return Promise.resolve(results);
      });
  }
}

GoogleAddressInput.displayName = 'GoogleAddressInput';

GoogleAddressInput.defaultProps = {
  magnifyingGlass: true,
  autoSelect: true,
  footerOptions: {},
  clearSuggestionsOnBlur: true,
  fallbackToManual: false,
  poweredByGoogle: false,
  handler: GoogleAddressInputHandler.geocode,
};

GoogleAddressInput.propTypes = {
  /** Placeholder for the input box */
  placeholder: PropTypes.string,

  /** Value to place before every search term (normally should not be used) */
  valuePrefix: PropTypes.string,

  /** Country code used to help with suggestions and geocoding */
  countryCode: PropTypes.string,

  /** Controlled mode - value to display */
  value: PropTypes.string,

  /** Limit the autocomplete to specific types (see [here](https://developers.google.com/places/supported_types#table3) for list) */
  types: PropTypes.array,

  /** Lower level filtering of autocomplete result types (see [here](https://developers.google.com/places/supported_types) for list)  */
  filterTypes: PropTypes.array,

  /** Fields indicating which types of Places data to return (see [here](https://developers.google.com/maps/documentation/javascript/places#place_details)**/
  placeDetailsFields: PropTypes.array,

  /** Sets UI to indicate a status */
  status: PropTypes.oneOf(['error', 'warning', 'loading']),

  /** The status message to display when hovering the status icon, if not given or empty there will be no tooltip */
  statusMessage: PropTypes.node,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,

  /** Callback for results. Will return an object containing: originValue (value in the search), googleResult (google geocode result for the search), address (which will include: formatted (google formatted address), country, countryCode, street, number, postalCode, latLng (lat, lng)) */
  onSet: PropTypes.func,

  /** Google map client implementation (should implement autocomplete and geocode functions). Normally you would use wix-style-react/clients/GoogleMapsClient */
  Client: PropTypes.func.isRequired,

  /** Show or hide magnifying glass icon */
  magnifyingGlass: PropTypes.bool,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,
  autoSelect: PropTypes.bool,

  /** Display a footer as the last suggestion in the list */
  footer: PropTypes.any,

  /** Set the footer's options (e.g. disabled, overrideStyles, etc. ) */
  footerOptions: PropTypes.object,

  /** Clear the suggestions list upon input blur */
  clearSuggestionsOnBlur: PropTypes.bool,

  /** If set to `true`, we will attempt to get a Google location from the input's text if there are no suggestions. This is useful when looking for locations for which google does not give suggestions - for example: Apartment/Apt  */
  fallbackToManual: PropTypes.bool,

  /** Shows the Powered By Google credit in a fixed footer */
  poweredByGoogle: PropTypes.bool,

  /** Sets how to get more details for a place (e.g. geocode, places, etc) */
  handler: PropTypes.oneOf([
    GoogleAddressInputHandler.geocode,
    GoogleAddressInputHandler.places,
  ]),
};

export default GoogleAddressInput;
