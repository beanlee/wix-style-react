import React from 'react';
import circularProgressBarDriverFactory from '../CircularProgressBar.driver';
import CircularProgressBar from '../CircularProgressBar';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

import { Size } from '../constants';
import { circularProgressBarDriverFactory as circularProgressBarUniDriverFactory } from '../CircularProgressBar.uni.driver';

const createCircularProgressBar = (props = {}) => {
  const dataHook = 'circular-progress-bar';
  return <CircularProgressBar {...props} dataHook={dataHook} />;
};

describe('CircularProgressBar', () => {
  const defaultProps = {
    value: 40,
  };

  describe('[sync]', () => {
    runTests(createRendererWithDriver(circularProgressBarDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(circularProgressBarUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should render', async () => {
      const { driver } = render(createCircularProgressBar({ ...defaultProps }));
      expect(await driver.exists()).toBe(true);
    });

    describe('on error', () => {
      const errorProps = {
        error: true,
        errorMessage: 'No soup for you',
        showProgressIndication: true,
      };

      it('should display error message', async () => {
        const { driver } = render(
          createCircularProgressBar({ ...defaultProps, ...errorProps }),
        );
        const toolTipErrorMsg = await driver.getTooltipErrorMessage();
        expect(toolTipErrorMsg).toEqual(errorProps.errorMessage);
      });

      it('should display error icon', async () => {
        const { driver } = render(
          createCircularProgressBar({ ...defaultProps, ...errorProps }),
        );
        expect(await driver.isErrorIconShown()).toBe(true);
      });
    });

    describe('on completion', () => {
      const successProps = {
        value: 100,
        showProgressIndication: true,
      };

      it('should display success icon', async () => {
        const { driver } = render(
          createCircularProgressBar({ ...successProps }),
        );
        expect(await driver.isSuccessIconShown()).toBe(true);
      });
    });

    describe('size prop', () => {
      Object.keys(Size).forEach(size => {
        it(`should be ${size}`, async () => {
          const { driver } = render(
            createCircularProgressBar({ ...defaultProps, size: size }),
          );
          expect(await driver.getSize()).toBe(size);
        });
      });

      it(`should be default ${Size.medium}`, async () => {
        const { driver } = render(
          createCircularProgressBar({ ...defaultProps }),
        );
        expect(await driver.getSize()).toBe(Size.medium);
      });
    });
  }
});
