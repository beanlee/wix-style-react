import React from 'react';
import ColorInput from './ColorInput';
import { colorInputPrivateDriverFactory } from './ColorInput.private.uni.driver';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react/index';
import { extractHex } from './hex-helpers';

describe('ColorInput', () => {
  afterEach(() => cleanup());

  const renderColorInput = ({
    value = '',
    onConfirm = () => {},
    ...rest
  } = {}) => <ColorInput {...rest} value={value} onConfirm={onConfirm} />;

  const render = createRendererWithUniDriver(colorInputPrivateDriverFactory);

  describe('Input', () => {
    it('should be in controlled mode when value is passed', async () => {
      const value = 'value';
      const { driver } = render(renderColorInput({ value }));
      expect(await driver.getValue()).toBe('AE');
    });

    describe(`value`, () => {
      it(`should convert letters to uppercase while typed`, async () => {
        const { driver } = render(renderColorInput());
        await driver.enterText('abc');
        expect(await driver.getValue()).toBe('ABC');
      });
      it(`should strip invalid characters from pasted value`, async () => {
        const { driver } = render(renderColorInput());
        await driver.enterText('#$%abc');
        expect(await driver.getValue()).toBe('ABC');
      });
    });

    describe('value is confirmed on', () => {
      it(`keyboard key 'Enter'`, async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.enterText('aze');
        await driver.keyDown('Enter');
        expect(onConfirm).toHaveBeenCalledWith('#AEAEAE');
      });

      it('click outside', async () => {
        const { driver } = render(renderColorInput());
        await driver.click();
        await driver.enterText('aze');
        await driver.clickOutside();
        expect(await driver.colorPickerVisible()).toBe(false);
      });
    });

    describe('value is not confirmed on', () => {
      it('click outside when ColorViewer is not active', async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.clickOutside();
        expect(onConfirm.mock.calls.length).toBe(0);
      });
    });

    describe('value is cancelled on', () => {
      it(`keyboard key 'Escape'`, async () => {
        const value = '#123456';
        const { driver } = render(renderColorInput({ value }));
        await driver.click();
        await driver.enterText('1234');
        expect(await driver.getValue()).toBe('1234');
        await driver.keyDown('Escape');
        expect(await driver.getValue()).toBe(value.replace('#', ''));
      });
    });

    describe('confirmed values', () => {
      [
        ['', ''],
        ['1', '#111111'],
        ['12', '#121212'],
        ['123', '#112233'],
        ['1234', '#112233'],
        ['12345', '#112233'],
        ['123456', '#123456'],
        ['1234$3A74', '#12343A'],
        ['1234AB', '#1234AB'],
        ['%4EB7F', '#44EEBB'],
        ['%##7$39', '#773399'],
        ['2C45$#74', '#2C4574'],
        ['4EB7F568A7', '#4EB7F5'],
      ].map(([expectation, output]) =>
        it(`given ${expectation} should return ${output}`, async () => {
          const onConfirm = jest.fn();
          const { driver } = render(renderColorInput({ onConfirm }));
          await driver.enterText(expectation);
          expect(await driver.getValue()).toBe(
            extractHex(expectation).replace('#', ''),
          );
          await driver.keyDown('Enter');
          expect(onConfirm).toHaveBeenCalledTimes(1);
          expect(onConfirm.mock.calls[0][0]).toBe(output);
        }),
      );
    });
  });

  describe(`prefix '#'`, () => {
    it(`should be hidden by default`, async () => {
      const { driver } = render(renderColorInput());
      expect(await driver.hasPrefix()).toBe(false);
    });

    it(`should be visible when input is clicked`, async () => {
      const { driver } = render(renderColorInput());
      await driver.click();
      expect(await driver.hasPrefix()).toBe(true);
    });

    it(`should be visible when input is focused`, async () => {
      const { driver } = render(renderColorInput());
      await driver.click();
      expect(await driver.hasPrefix()).toBe(true);
    });

    it(`should be visible when value is given but input is confirmed with Enter`, async () => {
      const { driver } = render(renderColorInput({ value: '#123' }));
      await driver.click();
      await driver.keyDown('Enter');
      expect(await driver.hasPrefix()).toBe(true);
    });

    it(`should be hidden when value is empty and input is confirmed with Enter`, async () => {
      const { driver } = render(renderColorInput());
      await driver.click();
      await driver.keyDown('Enter');
      expect(await driver.hasPrefix()).toBe(false);
    });

    it(`should be hidden after value is cleared`, async () => {
      const { driver, rerender } = render(renderColorInput({ value: '#123' }));
      await driver.click();
      await driver.enterText('');
      await driver.keyDown('Enter');
      rerender(renderColorInput({ value: '' }));
      expect(await driver.getValue()).toBe('');
      expect(await driver.hasPrefix()).toBe(false);
    });
  });

  describe('suffix ColorViewer', () => {
    it(`should be null state when value is empty string`, async () => {
      const { driver } = render(renderColorInput());
      expect(await driver.isViewerNull()).toBe(true);
    });

    it(`should set size as given`, async () => {
      const { driver } = render(renderColorInput({ size: 'small' }));
      expect(await driver.getViewerSize()).toBe('small');
    });

    it(`should be null after value is cleared`, async () => {
      const { driver, rerender } = render(renderColorInput({ value: '#123' }));
      await driver.click();
      await driver.enterText('');
      await driver.keyDown('Enter');
      rerender(renderColorInput({ value: '' }));
      expect(await driver.getValue()).toBe('');
      expect(await driver.isViewerNull()).toBe(true);
    });
  });

  describe('ColorPicker', () => {
    describe('should open when', () => {
      it(`input is clicked`, async () => {
        const { driver } = render(renderColorInput());
        await driver.click();
        expect(await driver.colorPickerVisible()).toBe(true);
      });
      it(`input is focused`, async () => {
        const { driver } = render(renderColorInput());
        await driver.focus();
        expect(await driver.colorPickerVisible()).toBe(true);
      });
      it(`colorviewer is clicked`, async () => {
        const { driver } = render(renderColorInput());
        await driver.clickColorViewer();
        expect(await driver.colorPickerVisible()).toBe(true);
      });
    });

    describe('should close when ', () => {
      it(`input is confirmed with Enter`, async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.click();
        await driver.keyDown('Enter');
        expect(onConfirm).toHaveBeenCalled();
      });
      it(`action button - confirm is clicked`, async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.click();
        await driver.enterText('#123');
        await driver.confirm();
        expect(await driver.colorPickerVisible()).toBe(false);
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('action button', () => {
      it(`'confirm' should fire confirm event for input`, async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.click();
        await driver.enterText('#123');
        await driver.confirm();
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm.mock.calls[0][0]).toBe('#112233');
      });
      it(`'cancel' should fire cancel event for input`, async () => {
        const value = '#123456';
        const { driver } = render(renderColorInput({ value }));
        await driver.click();
        await driver.enterText('1234');
        expect(await driver.getValue()).toBe('1234');
        await driver.cancel();
        expect(true).toEqual(true);
        expect(await driver.getValue()).toBe(value.replace('#', ''));
      });
    });
  });

  describe('props', () => {
    describe('`disabled` prop', () => {
      it('should disable input', async () => {
        const disabled = true;
        const { driver } = render(renderColorInput({ disabled }));
        expect(await driver.isDisabled()).toBe(true);
      });

      it('should disable hash', async () => {
        const value = '#ffffff';
        const disabled = true;
        const { driver } = render(renderColorInput({ disabled, value }));
        expect(await driver.isHashDisabled()).toBe(true);
      });
    });

    describe(`'size' prop`, () => {
      it(`by default should be medium`, async () => {
        const { driver } = render(renderColorInput());
        expect(await driver.getSize()).toEqual('medium');
      });
      it(`should be equal to given`, async () => {
        const { driver } = render(renderColorInput({ size: 'small' }));
        expect(await driver.getSize()).toEqual('small');
      });
    });
    describe(`'placeholder' prop`, () => {
      const defaultPlaceholder = '';

      it(`by default should be defined`, async () => {
        const { driver } = render(renderColorInput());
        expect(await driver.getPlaceholder()).toBe(defaultPlaceholder);
      });

      it(`should be equal to given`, async () => {
        const placeholder = 'Please choose';
        const { driver } = render(renderColorInput({ placeholder }));
        expect(await driver.getPlaceholder()).toBe(placeholder);
      });

      it(`should be hidden when input is clicked`, async () => {
        const { driver } = render(renderColorInput());
        await driver.click();
        expect(await driver.getPlaceholder()).toBe('');
      });
    });

    describe('with status', () => {
      [
        { status: 'error', statusMessage: 'Error Message' },
        { status: 'warning', statusMessage: 'Warning Message' },
        { status: 'loading', statusMessage: 'Loading Message' },
      ].forEach(test => {
        it(`should display a status icon when status="${test.status}"`, async () => {
          const { driver } = render(renderColorInput(test));

          expect(await driver.hasStatus()).toBe(true);
          expect(await driver.getStatus()).toBe(test.status);
          expect(await driver.hasStatusMessage()).toBe(true);
          expect(await driver.getStatusMessage()).toBe(test.statusMessage);
        });
      });
    });

    describe('`onChange` prop', () => {
      it(`should be triggered when input value has changed`, async () => {
        const onChange = jest.fn();
        const { driver } = render(renderColorInput({ onChange }));
        await driver.enterText('#123');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toBe('#123');
      });
      it(`should be triggered when one of the confirmed actions triggered`, async () => {
        const onChange = jest.fn();
        const { driver } = render(renderColorInput({ onChange }));
        await driver.enterText('#123');
        await driver.keyDown('Enter');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[0][0]).toBe('#123');
        expect(onChange.mock.calls[1][0]).toBe('#112233');
      });
      it(`should be triggered when one of the cancelled actions triggered`, async () => {
        const value = '#1234';
        const onChange = jest.fn();
        const { driver } = render(renderColorInput({ onChange, value }));
        await driver.enterText('#123');
        await driver.keyDown('Escape');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[0][0]).toBe('#123');
        expect(onChange.mock.calls[1][0]).toBe(value);
      });
    });

    describe('`onConfirm` prop', () => {
      it(`should return confirmed value `, async () => {
        const onConfirm = jest.fn();
        const { driver } = render(renderColorInput({ onConfirm }));
        await driver.enterText('#123');
        expect(await driver.getValue()).toBe('123');
        await driver.keyDown('Enter');
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm.mock.calls[0][0]).toBe('#112233');
      });
    });
    describe('`onCancel` prop', () => {
      it(`should return value from props`, async () => {
        const value = '#555555';
        const onCancel = jest.fn();
        const { driver } = render(renderColorInput({ onCancel, value }));

        await driver.enterText('#123');
        expect(await driver.getValue()).toBe('123');
        await driver.keyDown('Escape');
        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onCancel.mock.calls[0][0]).toBe(value);
      });
    });
  });
});
