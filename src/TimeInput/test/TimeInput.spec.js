import React from 'react';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

import TimePicker from '../TimeInput';
import timeInputDriverFactory from '../TimeInput.driver';
import { timeInputUniDriverFactory } from '../TimeInput.uni.driver';

import moment from 'moment';
import sinon from 'sinon';

const defaultMoment = moment();
const defaultMomentWithAM = moment('2014-04-25T01:00:00.00Z');
const defaultMomentWithPM = moment('2014-04-25T13:00:00.00Z');

describe('TimeInput', () => {
  const format12Hours = time => time.format('hh:mm');
  const format24Hours = time => time.format('HH:mm');

  describe('[sync]', () => {
    runTests(createRendererWithDriver(timeInputDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(timeInputUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    describe('Time display', () => {
      it(`should render the given default value`, async () => {
        const props = {
          defaultValue: defaultMoment,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.getValue()).toBe(format12Hours(props.defaultValue));
      });

      it(`should render the current time if no default value were passed `, async () => {
        const { driver } = render(<TimePicker />);
        const currentTime = defaultMoment;
        const currentTimeHours = format12Hours(currentTime).substring(0, 2);
        const currentTimeMinutes = format12Hours(currentTime).substring(3, 5);
        const inputTimeHours = (await driver.getValue()).substring(0, 2);
        const inputTimeMinutes = (await driver.getValue()).substring(3, 5);
        const minutesDiff = Math.abs(
          parseInt(inputTimeMinutes) - parseInt(currentTimeMinutes),
        );
        expect(inputTimeHours).toBe(currentTimeHours);
        expect(minutesDiff <= 1).toBe(true); //ignore diff of one minute (minute can be change from the time the object was created to current time)
      });

      it(`should allow rendering time in 24 hours mode`, async () => {
        const props = {
          defaultValue: defaultMoment,
          disableAmPm: true,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.getValue()).toBe(format24Hours(props.defaultValue));
      });

      it(`should display am/pm indicator when in 12 hours mode`, async () => {
        const props = {
          defaultValue: defaultMoment,
          disableAmPm: false,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.isAmPmIndicatorExist()).toBe(true);
      });

      it(`should display AM indicator when in 12 hours mode and the time displayed is AM`, async () => {
        const props = {
          defaultValue: defaultMomentWithAM,
          disableAmPm: false,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.getAmPmIndicatorText()).toBe('am');
      });

      it(`should display AM indicator when in 12 hours mode and the time displayed is PM`, async () => {
        const props = {
          defaultValue: defaultMomentWithPM,
          disableAmPm: false,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.getAmPmIndicatorText()).toBe('pm');
      });

      it('should display custom suffix before ticker', async () => {
        const customSuffix = 'Custom Suffix';
        const props = { customSuffix };

        const { driver } = render(<TimePicker {...props} />);

        const customSuffixNode = await driver.getCustomSuffix();
        expect(customSuffixNode).toBe(customSuffix);
      });
    });

    describe('onChange & disabled', () => {
      it(`should trigger 'onChange' callBack upon clicking input's up/down ticker`, async () => {
        const props = {
          onChange: sinon.spy(),
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.isDisabled()).toBe(false);
        await driver.clickTickerUp();
        await driver.clickTickerDown();
        expect(props.onChange.calledTwice).toBe(true);
      });

      it(`should not do anything upon clicking input's up/down ticker when disabled`, async () => {
        const props = {
          onChange: sinon.spy(),
          disabled: true,
        };
        const { driver } = render(<TimePicker {...props} />);

        await driver.clickTickerUp();
        await driver.clickTickerDown();

        expect(await driver.isDisabled()).toBe(true);
        expect(props.onChange.called).toBe(false);
      });

      it(`should increase input value by 20 minutes upon clicking the input's up ticker`, async () => {
        const props = {
          defaultValue: defaultMoment,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.clickTickerUp();
        expect(await driver.getValue()).toBe(
          format12Hours(props.defaultValue.add(20, 'minutes')),
        );
      });

      it(`should decrease input value by 20 minutes upon clicking the input's down ticker`, async () => {
        const props = {
          defaultValue: defaultMoment,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.clickTickerDown();
        expect(await driver.getValue()).toBe(
          format12Hours(props.defaultValue.subtract(20, 'minutes')),
        );
      });

      it(`should increase input value by given minutesStep in minutes upon clicking the input's up ticker`, async () => {
        const minutesStep = 30;
        const props = {
          defaultValue: defaultMoment,
          minutesStep,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.clickTickerUp();
        expect(await driver.getValue()).toBe(
          format12Hours(props.defaultValue.add(minutesStep, 'minutes')),
        );
      });

      it(`should decrease input value by given minutesStep upon clicking the input's down ticker`, async () => {
        const minutesStep = 30;
        const props = {
          defaultValue: defaultMoment,
          minutesStep,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.clickTickerDown();
        expect(await driver.getValue()).toBe(
          format12Hours(props.defaultValue.subtract(minutesStep, 'minutes')),
        );
      });

      it(`should allow to change time using keyboard's input`, async () => {
        const props = {
          defaultValue: defaultMoment,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.setValue('12:00');
        await driver.blur();
        expect(await driver.getValue()).toBe('12:00');
      });

      it(`should not allow to enter non numeric characters using keyboard's input, it should bring back the previous valid value`, async () => {
        const props = {
          defaultValue: defaultMomentWithAM,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.setValue('blabla');
        await driver.blur();
        expect(await driver.getValue()).toBe(format12Hours(props.defaultValue));
      });

      it(`should not allow to enter invalid time using keyboard's input, it should bring back the previous valid value`, async () => {
        const props = {
          defaultValue: defaultMomentWithAM,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.setValue('99:99');
        await driver.blur();
        expect(await driver.getValue()).toBe(format12Hours(props.defaultValue));
      });

      it(`should allow toggling between am/pm when in 12 hours mode`, async () => {
        const props = {
          defaultValue: defaultMomentWithPM,
          disableAmPm: false,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.getAmPmIndicatorText()).toBe('pm');
        await driver.toggleAmPmIndicator();
        expect(await driver.getAmPmIndicatorText()).toBe('am');
      });

      it(`should not allow to enter letters`, async () => {
        const props = {
          defaultValue: defaultMoment,
        };
        const { driver } = render(<TimePicker {...props} />);
        await driver.setValue('11:01');
        await driver.setValue('10a:02');
        expect(await driver.getValue()).toBe('11:01');
      });
    });

    describe('Styling', () => {
      it(`should not be created in rtl mode by default`, async () => {
        const props = {};
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.isRtl()).toBe(false);
      });

      it(`should allow to be created in rtl mode`, async () => {
        const props = {
          rtl: true,
        };
        const { driver } = render(<TimePicker {...props} />);
        expect(await driver.isRtl()).toBe(true);
      });
    });
  }
});
