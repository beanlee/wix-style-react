import React from 'react';

import isSameDay from 'date-fns/is_same_day';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

import datePickerDriverFactory from '../DatePicker.driver';
import Input from '../../Input';
import DatePicker from '../DatePicker';
import {
  rangePolyfill,
  requestAnimationFramePolyfill,
} from '../../../testkit/polyfills';

import isLocale from 'date-fns/locale/is';
import { format } from 'date-fns';

const noop = () => {};

describe('DatePicker', () => {
  const createDriver = createDriverFactory(datePickerDriverFactory);

  beforeAll(() => {
    rangePolyfill.install();
    requestAnimationFramePolyfill.install();
  });

  describe('date picker input', () => {
    it('should exist', () => {
      const { inputDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(inputDriver.exists()).toBe(true);
    });

    it('should set inputDataHook from props', () => {
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} inputDataHook={'inputDataHook'} />,
      );
      expect(inputDriver.getDataHook()).toBe('inputDataHook');
    });

    describe('given `disabled` prop', () => {
      it('should be disabled', () => {
        const { inputDriver } = createDriver(
          <DatePicker onChange={noop} disabled />,
        );
        expect(inputDriver.isDisabled()).toBe(true);
      });

      it('should not open calendar on click', () => {
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} disabled />,
        );
        inputDriver.trigger('click');
        expect(calendarDriver.isVisible()).toBe(false);
      });
    });

    it('has prefix by default', () => {
      const { inputDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(inputDriver.hasPrefix()).toBe(true);
    });

    it('has custom prefix', () => {
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} prefix={<span>#</span>} />,
      );

      expect(inputDriver.hasPrefix()).toBe(true);
    });

    it('allow rendering custom input', () => {
      const placeHolder = 'input date';
      const customInput = <Input placeholder={placeHolder} />;
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} customInput={customInput} />,
      );
      expect(inputDriver.getPlaceholder()).toEqual(placeHolder);
    });
  });

  describe('calendar', () => {
    it('should be hidden by default', () => {
      const { calendarDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(calendarDriver.isVisible()).toBe(false);
    });

    describe('should open', () => {
      it('on click on datePickerInput', () => {
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        inputDriver.trigger('click');
        expect(calendarDriver.isVisible()).toBe(true);
      });

      it('on focus', () => {
        const value = new Date(2017, 5, 2);
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker value={value} onChange={noop} />,
        );
        inputDriver.focus();
        expect(calendarDriver.isVisible()).toBe(true);
      });

      it('on render when given `initialOpen` prop', () => {
        const onChange = jest.fn();
        const date = new Date(2015, 9, 2);
        const { calendarDriver } = createDriver(
          <DatePicker onChange={onChange} value={date} initialOpen />,
        );

        expect(calendarDriver.isVisible()).toBe(true);
      });
    });

    describe('should close', () => {
      it('on select date with click', () => {
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnNthDay();

        setTimeout(() => expect(calendarDriver.isVisible()).toBe(false), 0);
      });

      it('on press "Escape" key', () => {
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        inputDriver.trigger('click');
        calendarDriver.triggerKeyDown({ key: 'Escape', keyCode: 27 });

        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on press "Escape" key and call onClose callback', () => {
        const onClose = jest.fn();
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} onClose={onClose} />,
        );

        inputDriver.trigger('click');
        calendarDriver.triggerKeyDown({ key: 'Escape', keyCode: 27 });

        expect(calendarDriver.isVisible()).toBe(false);
        expect(onClose).toBeCalled();
      });

      it('on press "Tab" key', () => {
        const preventDefault = jest.fn();
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        inputDriver.trigger('click');
        calendarDriver.triggerKeyDown({
          key: 'Tab',
          keyCode: 9,
          preventDefault,
        });

        expect(preventDefault.mock.calls).toHaveLength(0);
        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on outside click', () => {
        const { inputDriver, calendarDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        inputDriver.trigger('click');
        calendarDriver.mouseClickOutside();

        expect(calendarDriver.isVisible()).toBe(false);
      });
    });

    it('should not close on select when "shouldCloseOnSelect" property is false', () => {
      const { inputDriver, calendarDriver } = createDriver(
        <DatePicker onChange={noop} shouldCloseOnSelect={false} />,
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(calendarDriver.isVisible()).toBe(true);
    });

    it('should disable past dates given `excludePastDates` prop', () => {
      const onChange = jest.fn();
      const date = new Date(2015, 9, 2);
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker onChange={onChange} value={date} excludePastDates />,
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(onChange).not.toHaveBeenCalled();
      expect(calendarDriver.isVisible()).toBe(true);
    });

    it('should disable past dates given `excludePastDates` prop (current date selected)', () => {
      const onChange = jest.fn();
      const now = new Date();
      const date = new Date(now);
      date.setDate(now.getDate() === 1 ? 2 : 1); // set selected date other then now, but stay in the same month
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker onChange={onChange} value={date} excludePastDates />,
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay();

      expect(onChange).toHaveBeenCalled();
      expect(calendarDriver.isVisible()).toBe(false);

      const newDate = onChange.mock.calls[0][0];
      expect(newDate.getMonth()).toEqual(now.getMonth());
      expect(newDate.getDate()).toEqual(now.getDate());
    });

    describe('navbar arrow navigation', () => {
      it('should select previous month on previous month button click - LTR mode', () => {
        const onChange = jest.fn();
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={onChange} value={new Date(2015, 9, 2)} />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnPrevMonthButton();
        calendarDriver.clickOnNthDay();

        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getMonth()).toEqual(8);
        expect(newDate.getDate()).toEqual(1);
      });

      it('should select next month on next month button click - LTR mode', () => {
        const onChange = jest.fn();
        const date = new Date(2015, 9, 2);
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={onChange} value={date} />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnNextMonthButton();
        calendarDriver.clickOnNthDay();

        const newDate = onChange.mock.calls[0][0];

        expect(newDate.getMonth()).toEqual(10);
        expect(newDate.getDate()).toEqual(1);
      });

      it('should select previous month on previous month button click - RTL mode', () => {
        const onChange = jest.fn();
        const date = new Date(2015, 9, 2);
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={onChange} value={date} rtl />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnPrevMonthButton();
        calendarDriver.clickOnNthDay();

        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getMonth()).toEqual(8);
        expect(newDate.getDate()).toEqual(1);
      });

      it('should select next month on next month button click - RTL mode', () => {
        const onChange = jest.fn();
        const date = new Date(2015, 9, 2);
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={onChange} value={date} rtl />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnNextMonthButton();
        calendarDriver.clickOnNthDay();

        const newDate = onChange.mock.calls[0][0];
        expect(newDate.getMonth()).toEqual(10);
        expect(newDate.getDate()).toEqual(1);
      });
    });

    it('should show header', () => {
      const date = new Date(2015, 9, 2);
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker onChange={noop} value={date} />,
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isHeaderVisible()).toEqual(true);
      expect(calendarDriver.isYearCaptionExists()).toEqual(true);
      expect(calendarDriver.isMonthCaptionExists()).toEqual(true);
    });

    it('should show year dropdown', () => {
      const date = new Date(2015, 9, 2);
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker onChange={noop} showYearDropdown value={date} />,
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isYearDropdownExists()).toEqual(true);
      expect(calendarDriver.isYearCaptionExists()).toEqual(false);
    });

    it('should show month dropdown', () => {
      const date = new Date(2015, 9, 2);
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker onChange={noop} showMonthDropdown value={date} />,
      );

      inputDriver.trigger('click');
      expect(calendarDriver.isMonthDropdownExists()).toEqual(true);
      expect(calendarDriver.isMonthCaptionExists()).toEqual(false);
    });

    describe('given date in far future', () => {
      it('should not fail', () => {
        const { calendarDriver, driver } = createDriver(
          <DatePicker
            value={new Date('2055/01/01')}
            onChange={noop}
            showYearDropdown
          />,
        );

        driver.open();

        const yearDropdownDriver = calendarDriver.getYearDropdownDriver();
        const years = yearDropdownDriver
          .optionsContent()
          .map(n => parseInt(n, 10));
        const firstYear = years[0];
        const lastYear = years[years.length - 1];

        expect(firstYear).toBe(2055);
        expect(lastYear).toBe(1900);
      });
    });

    describe('`width` prop', () => {
      it('should set 150px by default to Input', () => {
        const { driver, inputDriver } = createDriver(
          <DatePicker onChange={noop} />,
        );
        inputDriver.trigger('click');

        expect(driver.getWidth()).toBe('150px');
      });

      it('should allow to be changed to Input', () => {
        const { driver, inputDriver } = createDriver(
          <DatePicker onChange={noop} width={4} />,
        );

        inputDriver.trigger('click');

        expect(driver.getWidth()).toBe('4px');
      });
    });

    describe('with year dropdown', () => {
      it('should give a possibility to choose date from another year', () => {
        const date = new Date(2015, 9, 2);
        const { calendarDriver, inputDriver } = createDriver(
          <DatePicker onChange={noop} showYearDropdown value={date} />,
        );

        inputDriver.trigger('click');
        calendarDriver.clickOnYearDropdown();
        calendarDriver.clickOnNthYear();
        expect(calendarDriver.getSelectedYear()).not.toEqual(
          date.getFullYear(),
        );
      });
    });

    describe('When trigger open and close', () => {
      it('should open calendar using ref', () => {
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} />,
        );
        driver.open();
        expect(calendarDriver.isVisible()).toBe(true);
      });

      it('should hide the focus visually on the current element from the user', () => {
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} />,
        );
        driver.open();
        expect(calendarDriver.isFocusedDayVisuallyUnfocused()).toBe(true);
      });

      it('should close calendar using ref', () => {
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} />,
        );

        driver.open();
        expect(calendarDriver.isVisible()).toBe(true);

        calendarDriver.close();
        expect(calendarDriver.isVisible()).toBe(false);
      });
    });

    describe('keyboard navigation', () => {
      it('should navigate days correctly with keyboard - LTR mode', done => {
        const date = new Date(2018, 1, 5);
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} value={date} />,
        );

        driver.open();
        expect(calendarDriver.getFocusedDay()).toEqual('5');
        calendarDriver.pressLeftArrow();
        // we need setTimeout because pressLeftArrow trigger async actions
        setTimeout(() => {
          expect(calendarDriver.getFocusedDay()).toEqual('4');
          done();
        });
      });

      it('should navigate days correctly with keyboard - RTL mode(same as with LTR)', done => {
        const date = new Date(2018, 1, 5);
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} rtl value={date} />,
        );

        driver.open();
        expect(calendarDriver.getFocusedDay()).toEqual('5');
        calendarDriver.pressLeftArrow();
        // we need setTimeout because pressLeftArrow trigger async actions
        setTimeout(() => {
          expect(calendarDriver.getFocusedDay()).toEqual('4');
          done();
        });
      });

      it('should not update input value while navigating the calendar', () => {
        const date = new Date(2018, 1, 5);
        const { calendarDriver, inputDriver, driver } = createDriver(
          <DatePicker onChange={noop} value={date} />,
        );

        driver.open();
        expect(inputDriver.getValue()).toEqual('02/05/2018');

        calendarDriver.pressLeftArrow();
        expect(inputDriver.getValue()).toEqual('02/05/2018');
      });

      it('should keep selected day unchanged when navigating with keyboard', done => {
        const date = new Date(2018, 1, 5);
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} value={date} />,
        );

        driver.open();

        expect(calendarDriver.getSelectedDay()).toEqual('5');
        expect(calendarDriver.getFocusedDay()).toEqual('5');

        calendarDriver.pressLeftArrow();
        setTimeout(() => {
          expect(calendarDriver.getSelectedDay()).toEqual('5');
          expect(calendarDriver.getFocusedDay()).toEqual('4');
          done();
        });
      });

      it('should remove unfocused class from the selected day while navigating the calendar', () => {
        const date = new Date(2018, 1, 5);
        const { calendarDriver, driver } = createDriver(
          <DatePicker onChange={noop} value={date} />,
        );

        driver.open();
        expect(calendarDriver.isFocusedDayVisuallyUnfocused()).toBe(true);

        calendarDriver.pressLeftArrow();
        expect(calendarDriver.containsVisuallyUnfocusedDay()).toBe(false);
      });
    });
  });

  describe('`format` prop', () => {
    it('should display date according to string format', () => {
      const { inputDriver } = createDriver(
        <DatePicker
          onChange={noop}
          value={new Date(2017, 9, 2)}
          dateFormat={'DD/MM/YYYY'}
        />,
      );

      expect(inputDriver.getValue()).toBe('02/10/2017');
    });

    it('should ignore format from locale', () => {
      const date = new Date(2017, 9, 2);
      const { inputDriver } = createDriver(
        <DatePicker
          onChange={noop}
          locale="fr"
          dateFormat="YYYY/MM/DD"
          value={date}
        />,
      );

      expect(inputDriver.getValue()).toBe('2017/10/02');
    });

    it('should display date according to custom function format', () => {
      const date = new Date(2017, 9, 2);
      const { inputDriver } = createDriver(
        <DatePicker
          onChange={noop}
          locale="fr"
          dateFormat={_date => format(_date, 'YYYY MMM DD')}
          value={date}
        />,
      );

      expect(inputDriver.getValue()).toBe('2017 Oct 02');
    });
  });

  describe('placeholder', () => {
    it('should be taken from `placeholderText` prop', () => {
      const placeholder = 'Datepicker test placeholder';
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} placeholderText={placeholder} />,
      );
      expect(inputDriver.getPlaceholder()).toBe(placeholder);
    });

    it('should be taken from `placeholder` prop of `customInput`', () => {
      const placeholder = 'Input test placeholder';
      const { inputDriver } = createDriver(
        <DatePicker
          onChange={noop}
          placeholderText={'you should not see me!'}
          customInput={<Input placeholder={placeholder} />}
        />,
      );

      expect(inputDriver.getPlaceholder()).toBe(placeholder);
    });
  });

  describe('`onChange` prop', () => {
    it('should be called on available day click', () => {
      const onChange = jest.fn();
      const value = new Date(2017, 7, 1);
      const expectedValue = new Date(2017, 7, 2);
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker value={value} onChange={onChange} />,
      );
      inputDriver.trigger('click');
      calendarDriver.clickOnNthDay(1);

      const newValue = onChange.mock.calls[0][0];

      expect(onChange).toHaveBeenCalled();
      expect(isSameDay(newValue, expectedValue)).toBe(true);
    });

    it('should not be called choosing already selected date with enter key', () => {
      const onChange = jest.fn();
      const value = new Date(2017, 5, 2);
      const { inputDriver } = createDriver(
        <DatePicker value={value} onChange={onChange} />,
      );

      inputDriver.trigger('click');
      inputDriver.trigger('keyDown', { keyCode: 13 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not be called clicking already selected date', () => {
      const onChange = jest.fn();
      const value = new Date();
      const { calendarDriver, inputDriver } = createDriver(
        <DatePicker value={value} onChange={onChange} />,
      );

      inputDriver.trigger('click');
      calendarDriver.clickOnSelectedDay();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not adjust time of given value', () => {
      const onChange = jest.fn();
      const value = new Date('2017/01/01 12:34:56.000Z');
      const { calendarDriver, driver } = createDriver(
        <DatePicker value={value} onChange={onChange} />,
      );
      driver.open();
      calendarDriver.clickOnNthDay(1);
      expect(onChange.mock.calls[0][0]).toEqual(
        new Date('2017-01-02T12:34:56.000Z'),
      );
    });
  });

  describe('`readonly` prop', () => {
    it('should be false by default', () => {
      const { inputDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(inputDriver.getReadOnly()).toBe(false);
    });

    it('should be readonly when true', () => {
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} readOnly />,
      );
      expect(inputDriver.getReadOnly()).toBe(true);
    });
  });

  describe('`locale` prop', () => {
    const setup = (props = {}) => {
      const { calendarDriver, inputDriver, driver } = createDriver(
        <DatePicker
          onChange={noop}
          locale="fr"
          value={new Date(2015, 9, 2)}
          {...props}
        />,
      );

      inputDriver.trigger('click');

      return {
        calendarDriver,
        driver,
        inputDriver,
      };
    };

    it('should display translated month in caption', () => {
      const { calendarDriver } = setup();
      expect(calendarDriver.getMonthCaption()).toEqual('octobre');
    });

    it('should display translated month in dropdown label', () => {
      const { calendarDriver } = setup({
        showMonthDropdown: true,
      });
      expect(calendarDriver.getMonthDropdownLabel()).toEqual('octobre');
    });

    it('should display translated months in dropdown options', () => {
      const { calendarDriver } = setup({
        showMonthDropdown: true,
      });
      expect(
        calendarDriver.getMonthDropdownDriver().optionContentAt(0),
      ).toEqual('janvier');
    });

    it('should display translated weekdays', () => {
      const { calendarDriver } = setup();
      expect(calendarDriver.getNthWeekDayName(0)).toEqual('lu');
    });

    describe('when function from date-fns', () => {
      it('should display translated month in caption', () => {
        const { calendarDriver } = setup({ locale: isLocale });
        expect(calendarDriver.getMonthCaption()).toEqual('október');
      });

      it('should display translated month in dropdown label', () => {
        const { calendarDriver } = setup({
          locale: isLocale,
          showMonthDropdown: true,
        });
        expect(calendarDriver.getMonthDropdownLabel()).toEqual('október');
      });

      it('should display translated months in dropdown options', () => {
        const { calendarDriver } = setup({
          locale: isLocale,
          showMonthDropdown: true,
        });
        expect(
          calendarDriver.getMonthDropdownDriver().optionContentAt(0),
        ).toEqual('janúar');
      });

      it('should display translated weekdays', () => {
        const { calendarDriver } = setup({ locale: isLocale });
        expect(calendarDriver.getNthWeekDayName(0)).toEqual('má');
      });
    });
  });

  describe('`value` prop', () => {
    it('should show correct value from props', () => {
      const { inputDriver } = createDriver(
        <DatePicker onChange={noop} value={new Date(2017, 9, 2)} />,
      );
      expect(inputDriver.getValue()).toBe('10/02/2017');
    });

    it('should show empty value', () => {
      const { inputDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(inputDriver.getValue()).toBe('');
    });

    describe('when undefined', () => {
      it('should display `placeholderText`', () => {
        const { inputDriver } = createDriver(
          <DatePicker
            value={undefined}
            placeholderText="hello"
            onChange={noop}
          />,
        );
        expect(inputDriver.getValue()).toBe('');
        expect(inputDriver.getPlaceholder()).toBe('hello');
      });
    });
  });

  describe('borderRadius', () => {
    it('should have both borderRadius by default', () => {
      const { inputDriver } = createDriver(<DatePicker onChange={noop} />);
      expect(inputDriver.hasRightBorderRadius()).toBe(true);
      expect(inputDriver.hasLeftBorderRadius()).toBe(true);
    });
  });

  describe('inputProps prop', () => {
    it('should pass inputProps to input component', () => {
      const { inputDriver } = createDriver(
        <DatePicker
          inputProps={{ noRightBorderRadius: true, noLeftBorderRadius: true }}
          onChange={noop}
        />,
      );
      expect(inputDriver.hasRightBorderRadius()).toBe(false);
      expect(inputDriver.hasLeftBorderRadius()).toBe(false);
    });
  });

  describe('two months layout', () => {
    it('should switch to 2 months layout if we set twoMonths prop to true', () => {
      const { inputDriver, calendarDriver } = createDriver(
        <DatePicker twoMonths onChange={noop} />,
      );
      inputDriver.trigger('click');
      expect(calendarDriver.isTwoMonthsLayout()).toBe(true);
    });
  });
});
