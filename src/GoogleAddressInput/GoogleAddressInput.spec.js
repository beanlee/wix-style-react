import 'react';
import { componentFactory } from './GoogleAddressInput.driver';

import eventually from 'wix-eventually';
import sinon from 'sinon';
import { GoogleAddressInputHandler } from './GoogleAddressInput';
import InputWithOptions from '../InputWithOptions';
import {
  GmapsTestClient,
  GEOCODE_RESULT,
  GmapsTestClientWithFields,
} from './gmapsTestClient';

const buildResult = originValue => {
  return {
    originValue,
    googleResult: GEOCODE_RESULT,
    address: {
      approximate: true,
      latLng: {
        lat: 31.12,
        lng: 33.34,
      },
      number: 123,
      formatted: '_formatted_address_',
    },
  };
};

describe('GoogleAddressInput', () => {
  const { createShallow, createMount } = componentFactory();

  describe('appearance', () => {
    it('should show magnifying glass by default', () => {
      const component = createMount({ Client: GmapsTestClient }).getDOMNode();
      expect(component.querySelector('[data-hook="search-icon"]')).toBeTruthy();
    });

    it('should allow hiding magnifying glass', () => {
      const component = createMount({
        Client: GmapsTestClient,
        magnifyingGlass: false,
      }).getDOMNode();
      expect(component.querySelector('[data-hook="search-icon"]')).toBe(null);
    });

    it('should allow the input to be readOnly', () => {
      const component = createShallow({
        Client: GmapsTestClient,
        readOnly: true,
      });
      expect(component.find('InputWithOptions').props().readOnly).toEqual(true);
    });

    it('should show a footer', () => {
      const component = createShallow({
        Client: GmapsTestClient,
        readOnly: true,
        footer: 'foo bar',
        footerOptions: { overrideStyle: true, disabled: true },
      });

      expect(component.find('InputWithOptions').props().options).toEqual([
        {
          id: 0,
          value: 'foo bar',
          overrideStyle: true,
          disabled: true,
        },
      ]);
    });

    it('should not highlight selected option by default', () => {
      const component = createShallow({ Client: GmapsTestClient });
      expect(
        component.find('InputWithOptions').props().selectedHighlight,
      ).toEqual(false);
    });
  });

  describe('when `props.poweredByGoogle`', () => {
    describe('is `true`', () => {
      it.skip('should show google footer', () => {
        const component = createMount({
          Client: GmapsTestClient,
          poweredByGoogle: true,
        });
        component.setState({
          suggestions: ['a', 'b', 'c'].map(s => ({ description: s, id: s })),
        });
        expect(component.find('[data-hook="google-footer"]').exists()).toEqual(
          true,
        );
      });

      it('should not show google footer if `state.suggestions.length === 0`', () => {
        const component = createMount({
          Client: GmapsTestClient,
          poweredByGoogle: true,
        });
        component.setState({ suggestions: [] });
        expect(component.find('[data-hook="google-footer"]').exists()).toEqual(
          false,
        );
      });
    });

    describe('is falsy', () => {
      it('should not show the powered by google footer', () => {
        const component = createShallow({ Client: GmapsTestClient });
        expect(component.find('[data-hook="google-footer"]').exists()).toEqual(
          false,
        );
      });
    });
  });

  describe('User Interactions', () => {
    const defaultSuggestions = [
      JSON.parse(
        '{"description": "my address", "id": "my-id", "place_id": 123}',
      ),
    ];

    it('should specify autoSelect as default option', () => {
      const component = createMount({
        Client: GmapsTestClient,
        countryCode: 'XX',
      });
      expect(component.find('InputWithOptions').props().autoSelect).toEqual(
        true,
      );
    });

    it('should allow to override autoSelect option', () => {
      const component = createMount({
        Client: GmapsTestClient,
        countryCode: 'XX',
        autoSelect: false,
      });
      expect(component.find('InputWithOptions').props().autoSelect).toEqual(
        false,
      );
    });

    it('should allow specify specific fields', async () => {
      const onSet = sinon.spy();

      const component = createShallow({
        Client: GmapsTestClientWithFields,
        countryCode: 'XX',
        onSet,
        placeDetailsFields: [
          'name',
          'rating',
          'formatted_phone_number',
          'geometry',
        ],
        handler: GoogleAddressInputHandler.places,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onSelect({ id: 0, value: 'my address' });

      await eventually(() => {
        expect(onSet.args[0][0]).toEqual(buildResult('my address'));
      });
    });

    it('should allow focusing input', () => {
      const component = createMount({
        Client: GmapsTestClient,
        countryCode: 'XX',
      });
      const input = component.find('input').instance();
      sinon.spy(input, 'focus');
      component.instance().focus();
      expect(input.focus.calledOnce).toEqual(true);
    });

    it('should allow selecting input', () => {
      const component = createMount({
        Client: GmapsTestClient,
        countryCode: 'XX',
      });
      const input = component.find('input').instance();
      sinon.spy(input, 'select');
      component.instance().select();
      expect(input.select.calledOnce).toEqual(true);
    });

    it('If user changes the value in the autocomplete box, request suggestions from google.maps', async () => {
      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'XX',
      });
      const event = { target: { value: 'Hatomer 49' } };
      component
        .find('InputWithOptions')
        .props()
        .onInput(event);

      await eventually(() => {
        component.update();
        expect(component.find('InputWithOptions').props().options).toEqual([
          {
            id: 0,
            value:
              '{"componentRestrictions":{"country":"XX"},"input":"Hatomer 49"} - 1',
          },
          {
            id: 1,
            value:
              '{"componentRestrictions":{"country":"XX"},"input":"Hatomer 49"} - 2',
          },
        ]);
      });
    });

    it('If user pressed <enter> with a suggested value, geocode the suggested value, and call the onSet callback  (with geocode handler)', async () => {
      const onSet = sinon.spy();

      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'XX',
        onSet,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onSelect({ id: 0, value: 'my address' });

      await eventually(() => {
        expect(onSet.args[0][0]).toEqual(buildResult('my address'));
      });
    });

    it('If user pressed <enter> with a suggested value, geocode the suggested value, and call the onSet callback (with places handler)', async () => {
      const onSet = sinon.spy();

      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'XX',
        onSet,
        handler: GoogleAddressInputHandler.places,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onSelect({ id: 0, value: 'my address' });

      await eventually(() => {
        expect(onSet.args[0][0]).toEqual(buildResult('my address'));
      });
    });

    it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and geocode if successful', async () => {
      const onSet = sinon.spy();

      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'XX',
        onSet,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onManuallyInput('my addr');

      await eventually(() => {
        expect(onSet.called).toBe(false);
      });
    });

    it('If user pressed <enter> with a value that is not on the suggestions list, try to suggest it and return null if unsuccessful', async () => {
      const onSet = sinon.spy();
      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'YY',
        onSet,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onManuallyInput('dontfind');

      await eventually(() => {
        expect(onSet.called).toBe(false);
      });
    });

    it('If user pressed <enter> and there is no value on the suggestions list and fallbackToManual is set to true, search for the value anyway', async () => {
      const onSet = sinon.spy();
      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'YY',
        onSet,
        fallbackToManual: true,
      });
      component.setState({ suggestions: [] });
      component
        .find('InputWithOptions')
        .props()
        .onManuallyInput('dontfind');

      await eventually(() => {
        expect(onSet.args[0][0]).toEqual(buildResult('dontfind'));
      });
    });

    it('clear suggestions on blur', () => {
      jest.useFakeTimers();
      const component = createMount({
        Client: GmapsTestClient,
        countryCode: 'XX',
        clearSuggestionsOnBlur: true,
      });
      component.setState({ suggestions: defaultSuggestions });
      component.find('input').simulate('blur');
      jest.runAllTimers();
      component.update();
      jest.useRealTimers();
      expect(component.find(InputWithOptions).props().options).toHaveLength(0);
    });

    it("don't clear suggestions if clearSuggestionsOnBlur === false", done => {
      const component = createShallow({
        Client: GmapsTestClient,
        countryCode: 'XX',
        clearSuggestionsOnBlur: false,
      });
      component.setState({ suggestions: defaultSuggestions });
      component
        .find('InputWithOptions')
        .props()
        .onBlur();
      setTimeout(() => {
        expect(component.find('InputWithOptions').props().options).toHaveLength(
          1,
        );
        done();
      }, 300);
    });
  });
});
