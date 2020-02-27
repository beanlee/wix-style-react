import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Ticker from './Ticker';
import IconAffix from './IconAffix';
import Affix from './Affix';
import Group from './Group';
import InputSuffix, { getVisibleSuffixCount } from './InputSuffix';
import deprecationLog from '../utils/deprecationLog';

import styles from './Input.scss';
import { InputContext } from './InputContext';

class Input extends Component {
  static Ticker = Ticker;
  static IconAffix = IconAffix;
  static Affix = Affix;
  static Group = Group;

  static StatusError = 'error';
  static StatusWarning = 'warning';
  static StatusLoading = 'loading';

  state = {
    focus: false,
  };

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.logDeprecations(props);
  }

  componentDidMount() {
    this._isMounted = true;
    const { autoFocus, value } = this.props;

    if (autoFocus) {
      this._onFocus();
      // Multiply by 2 to ensure the cursor always ends up at the end;
      // Opera sometimes sees a carriage return as 2 characters.
      value && this.input.setSelectionRange(value.length * 2, value.length * 2);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onCompositionChange = isComposing => {
    if (this.props.onCompositionChange) {
      this.props.onCompositionChange(isComposing);
    }

    this.isComposing = isComposing;
  };

  logDeprecations(props) {
    if (
      this._isClearFeatureEnabled &&
      this._isControlled &&
      !props.updateControlledOnClear
    ) {
      deprecationLog(
        `<Input/> - Clearing the value in a controlled component through onChange() will be deprecated in next major version. Pass updateControlledOnClear prop and use the onClear() callback to apply the new behavior`,
      );
    }
  }

  get _isClearFeatureEnabled() {
    return !!this.props.onClear || !!this.props.clearButton;
  }

  get _isControlled() {
    return this.props.value !== undefined;
  }

  extractRef = ref => {
    const { inputRef } = this.props;
    this.input = ref;
    if (inputRef) {
      inputRef(ref);
    }
  };

  render(props = {}) {
    const {
      id,
      name,
      value,
      placeholder,
      menuArrow,
      defaultValue,
      tabIndex,
      clearButton,
      onClear,
      autoFocus,
      onKeyUp,
      onPaste,
      disableEditing,
      readOnly,
      prefix,
      suffix,
      type,
      maxLength,
      textOverflow,
      theme,
      disabled,
      status,
      statusMessage,
      tooltipPlacement,
      onTooltipShow,
      autocomplete,
      min,
      max,
      step,
      required,
      hideStatusSuffix,
      customInput,
      pattern,
    } = this.props;
    const onIconClicked = e => {
      if (!disabled) {
        this.input && this.input.focus();
        this._isMounted && this._onFocus();
        this._onClick(e);
      }
    };

    // this doesn't work for uncontrolled, "value" refers only to controlled input
    const isClearButtonVisible =
      this._isClearFeatureEnabled && !!value && !status && !disabled;

    const visibleSuffixCount = getVisibleSuffixCount({
      status: hideStatusSuffix ? undefined : status,
      statusMessage,
      disabled,
      isClearButtonVisible,
      menuArrow,
      suffix,
    });

    const ariaAttribute = {};
    Object.keys(this.props)
      .filter(key => key.startsWith('aria'))
      .map(
        key =>
          (ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[
            key
          ]),
      );

    /* eslint-disable no-unused-vars */
    const { className, ...inputElementProps } = props;

    const inputElement = this._renderInput({
      min,
      max,
      step,
      'data-hook': 'wsr-input',
      style: { textOverflow },
      ref: this.extractRef,
      className: classNames(styles.input, {
        [styles.disabled]: !!disabled,
        [styles.withPrefix]: !!prefix, // For testing
        [styles.withSuffix]: visibleSuffixCount, // For testing
        [styles.withSuffixes]: visibleSuffixCount > 1, // For testing
      }),
      id,
      name,
      disabled,
      defaultValue,
      value,
      onChange: this._onChange,
      onKeyPress: this._onKeyPress,
      maxLength,
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      onKeyDown: this._onKeyDown,
      onPaste,
      placeholder,
      tabIndex,
      autoFocus,
      onClick: this._onClick,
      onKeyUp,
      readOnly: readOnly || disableEditing,
      type,
      required,
      autoComplete: autocomplete,
      onCompositionStart: () => this.onCompositionChange(true),
      onCompositionEnd: () => this.onCompositionChange(false),
      customInput,
      pattern,
      ...ariaAttribute,
      ...inputElementProps,
    });

    return (
      <div className={styles.inputWrapper}>
        {prefix && (
          <div className={styles.prefix}>
            <InputContext.Provider value={{ ...this.props, inPrefix: true }}>
              <span>{prefix}</span>
            </InputContext.Provider>
          </div>
        )}
        {inputElement}
        <InputContext.Provider value={{ ...this.props, inSuffix: true }}>
          {visibleSuffixCount > 0 && (
            <InputSuffix
              status={hideStatusSuffix ? undefined : status}
              statusMessage={statusMessage}
              theme={theme}
              disabled={disabled}
              onIconClicked={onIconClicked}
              isClearButtonVisible={isClearButtonVisible}
              onClear={this.handleSuffixOnClear}
              menuArrow={menuArrow}
              suffix={suffix}
              tooltipPlacement={tooltipPlacement}
              onTooltipShow={onTooltipShow}
            />
          )}
        </InputContext.Provider>
      </div>
    );
  }

  handleSuffixOnClear = e => {
    this.focus();
    this.clear(e);
  };

  focus = (options = {}) => {
    this._onFocus();
    this.input && this.input.focus(options);
  };

  blur = () => {
    this.input && this.input.blur();
  };

  select = () => {
    this.input && this.input.select();
  };

  _onFocus = e => {
    this.setState({ focus: true });
    this.props.onFocus && this.props.onFocus(e);

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => {
        /**
          here we trying to cover edge case with chrome forms autofill,
          after user will trigger chrome form autofill, onFocus will be called for each input,
          each input will cause this.select, select may(mostly all time) cause new onFocus,
          which will cause new this.select, ..., we have recursion which will all time randomly cause
          inputs to become focused.
          To prevent this, we check, that current input node is equal to focused node.
        */
        if (document && document.activeElement === this.input) {
          this.select();
        }
      }, 0);
    }
  };

  _onBlur = e => {
    this.setState({ focus: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  _onClick = e => {
    this.props.onInputClicked && this.props.onInputClicked(e);
  };

  _onKeyDown = e => {
    if (this.isComposing) {
      return;
    }

    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed(e);
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed(e);
    }
  };

  _isInvalidNumber = value =>
    this.props.type === 'number' && !/^[\d.,\-+]*$/.test(value);

  _onChange = e => {
    if (this._isInvalidNumber(e.target.value)) {
      return;
    }
    this.props.onChange && this.props.onChange(e);
  };

  _onKeyPress = e => {
    if (this._isInvalidNumber(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Clears the input.
   *
   * Fires onClear with the given event triggered on the clear button
   *
   * @param [Event] event to delegate to the onClear call
   */
  clear = event => {
    const { onClear, updateControlledOnClear } = this.props;

    if (updateControlledOnClear) {
      if (!this._isControlled) {
        this.input.value = '';
      }
    } else {
      /* an older implementation that has a hack, it's currently enabled by default for backward compatibility
       * see https://github.com/wix/wix-style-react/issues/3122
       */
      const prevValue = this.input.value;
      this.input.value = '';
      prevValue && this._triggerOnChangeHandlerOnClearEvent(event);
    }

    onClear && onClear(event);
  };

  _triggerOnChangeHandlerOnClearEvent = event => {
    if (!event) {
      /* We cannot dispatch a proper new event,
       * using this.input.dispatchEvent(new Event('change'))),
       * because react listens only to SyntheticEvents.
       * There is this react-trigger-changes library which is a hack for testing only (https://github.com/vitalyq/react-trigger-change).
       * The solution of creating a new pseudo event object, works for passing along tha target.value, but e.preventDefault() and e.stopPropagation() won't work.
       */
      event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', {
        writable: true,
        value: this.input,
      });
    }
    /* FIXME: The event (e) could be any event type, and even it's target may not be the input.
     * So it would be better to do e.target = this.input.
     * We don't use `clear` in WSR except in InputWithTags which does not pass an event, so it's ok.
     * But if some consumer is using <Input/> directly, then this might be a breaking change.
     */
    Object.defineProperty(event, 'target', {
      writable: false,
      value: { ...event.target, value: '' },
    });
    this._onChange(event);
  };

  _renderInput = props => {
    const { customInput: CustomInputComponent, ref, ...rest } = props;
    const inputProps = {
      ...(CustomInputComponent
        ? { ref: ref, ...rest, 'data-hook': 'wsr-custom-input' }
        : { ref, ...rest }),
    };

    return React.cloneElement(
      CustomInputComponent ? <CustomInputComponent /> : <input />,
      inputProps,
    );
  };
}

Input.displayName = 'Input';

Input.defaultProps = {
  autoSelect: true,
  size: 'normal',
  theme: 'normal',
  roundInput: false,
  textOverflow: 'clip',
  maxLength: 524288,
  withSelection: false,
  clearButton: false,
  updateControlledOnClear: false,
  hideStatusSuffix: false,
};

const borderRadiusValidator = (props, propName) => {
  const value = props[propName];
  if (typeof value === 'string') {
    throw new Error(
      'Passing a string (for className) is deprecated. Use new className prop.',
    );
  } else if (typeof value === 'undefined' || typeof value === 'boolean') {
    return null;
  } else {
    return new Error('Invalid type. boolean expected.');
  }
};

Input.propTypes = {
  ariaControls: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaLabel: PropTypes.string,

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus: PropTypes.bool,

  /** Standard React Input autoSelect (select the entire text of the element on focus) */
  autoSelect: PropTypes.bool,

  /** Sets value of autocomplete attribute (consult the [HTML spec](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete) for possible values  */
  autocomplete: PropTypes.string,

  /** Specifies a data-hook for tests */
  dataHook: PropTypes.string,

  /** Default value for those who wants to use this component un-controlled */
  defaultValue: PropTypes.string,

  /** when set to true this component is disabled */
  disabled: PropTypes.bool,

  /** Sets UI to indicate a status */
  status: PropTypes.oneOf([
    Input.StatusError,
    Input.StatusWarning,
    Input.StatusLoading,
  ]),

  /** The status message to display when hovering the status icon, if not given or empty there will be no tooltip */
  statusMessage: PropTypes.node,

  /** When set to true, this input won't display status suffix */
  hideStatusSuffix: PropTypes.bool,

  forceFocus: PropTypes.bool,
  forceHover: PropTypes.bool,

  id: PropTypes.string,

  /** Input max length */
  maxLength: PropTypes.number,

  /** Should the component include a menu arrow */
  menuArrow: PropTypes.bool,

  /** Displays clear button (X) on a non-empty input */
  clearButton: PropTypes.bool,

  /** A single CSS class name to be appended to the Input's wrapper element. */
  className: PropTypes.string,

  name: PropTypes.string,

  /** When set to true, this input will have no rounded corners on its left */
  noLeftBorderRadius: borderRadiusValidator,

  /** When set to true, this input will have no rounded corners on its right */
  noRightBorderRadius: borderRadiusValidator,

  /** Standard input onBlur callback */
  onBlur: PropTypes.func,

  /** Standard input onChange callback */
  onChange: PropTypes.func,

  /** Displays clear button (X) on a non-empty input and calls callback with no arguments */
  onClear: PropTypes.func,
  onCompositionChange: PropTypes.func,

  /** Called when user presses -enter- */
  onEnterPressed: PropTypes.func,

  /** Called when user presses -escape- */
  onEscapePressed: PropTypes.func,

  /** Standard input onFocus callback */
  onFocus: PropTypes.func,

  /** Standard input onClick callback */
  onInputClicked: PropTypes.func,

  /** Standard input onKeyDown callback */
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,

  /** called when user pastes text from clipboard (using mouse or keyboard shortcut) */
  onPaste: PropTypes.func,

  /** onShow prop for the error and help tooltips (supported only for amaterial theme for now) */
  onTooltipShow: PropTypes.func,

  /** Placeholder to display */
  placeholder: PropTypes.string,

  /** Component you want to show as the prefix of the input */
  prefix: PropTypes.node,

  /** Sets the input to readOnly */
  readOnly: PropTypes.bool,

  /** When set to true, this input will not be editable */
  disableEditing: PropTypes.bool,

  /** When set to true, this input will be rounded */
  roundInput: PropTypes.bool,

  /** Flip the magnify glass image so it be more suitable to rtl */
  rtl: PropTypes.bool,

  /** Specifies the size of the input */
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'large']),

  /** Component you want to show as the suffix of the input */
  suffix: PropTypes.node,

  /** Standard component tabIndex */
  tabIndex: PropTypes.number,

  /** Text overflow behaviour */
  textOverflow: PropTypes.string,

  /** The theme of the input */
  theme: PropTypes.oneOf([
    'normal',
    'tags',
    'paneltitle',
    'material',
    'amaterial',
    'flat',
    'flatdark',
  ]),

  /** The material design style floating label for input (supported only for amaterial theme for now) */
  title: PropTypes.string,

  /** Placement of the error and help tooltips (supported only for amaterial theme for now) */
  tooltipPlacement: PropTypes.string,
  type: PropTypes.string,

  /** Inputs value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withSelection: PropTypes.bool,
  required: PropTypes.bool,

  /** Minimum value input can have - similar to html5 min attribute */
  min: PropTypes.number,

  /** Maximum value input can have - similar to html5 max attribute */
  max: PropTypes.number,

  /** Step steps to increment/decrement - similar to html5 step attribute */
  step: PropTypes.number,

  /** Use a customized input component instead of the default html input tag */
  customInput: PropTypes.elementType
    ? PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
        PropTypes.elementType,
      ])
    : PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

  /** Don't call onChange on a controlled Input when user clicks the clear button.
   *  See https://github.com/wix/wix-style-react/issues/3122
   */
  updateControlledOnClear: PropTypes.bool,

  /** Pattern the value must match to be valid (regex) */
  pattern: PropTypes.string,
};

export default Input;
