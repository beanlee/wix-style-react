import React from 'react';
import inputAreaDriverFactory from '../InputArea.driver';
import InputArea from '../InputArea';

import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/unit';
import { inputAreaUniDriverFactory } from '../InputArea.uni.driver';

describe('InputArea', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(inputAreaDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(inputAreaUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const createDriver = jsx => render(jsx).driver;

    const InputAreaForTesting = props => (
      <InputArea {...props} dataHook="textarea-div" />
    );

    afterEach(() => {
      cleanup();
    });

    describe('enterText driver method', () => {
      it('passes the name and value attribute', async () => {
        const onChangeMock = jest.fn();
        const props = {
          name: 'gal',
          onChange: onChangeMock,
        };
        const driver = createDriver(<InputAreaForTesting {...props} />);
        await driver.enterText('some text');
        const eventTarget = onChangeMock.mock.calls[0][0].target;
        expect(eventTarget.name).toEqual('gal');
        expect(eventTarget.value).toEqual('some text');
      });
    });

    describe('value attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          value: 'hello',
          onChange: () => {},
        };

        const driver = createDriver(<InputAreaForTesting {...props} />);
        expect(await driver.getValue()).toEqual(props.value);
      });
    });

    describe('defaultValue attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const defaultValue = 'hello';

        const driver = createDriver(
          <InputAreaForTesting defaultValue={defaultValue} />,
        );
        expect(await driver.getDefaultValue()).toEqual(defaultValue);
      });
    });

    describe('maxHeight attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const maxHeight = '50px';

        const driver = createDriver(
          <InputAreaForTesting maxHeight={maxHeight} />,
        );
        expect((await driver.getStyle()).maxHeight).toEqual(maxHeight);
      });
    });

    describe('maxLength attribute', () => {
      it('should pass down to the wrapped input - with max length', async () => {
        const maxLength = 5;

        const driver = createDriver(
          <InputAreaForTesting maxLength={maxLength} />,
        );
        expect(await driver.getMaxLength()).toEqual(maxLength);
      });
    });

    describe('counter', () => {
      it('should show correct value when hasCounter and maxLength present', async () => {
        const driver = createDriver(
          <InputAreaForTesting hasCounter maxLength={30} value={'abc'} />,
        );
        expect(await driver.getCounterValue()).toEqual('3/30');
      });

      it('should not show counter when hasCounter is not present', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getHasCounter()).toBe(false);
      });
    });

    describe('resizable attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting resizable />);
        expect(await driver.getResizable()).toBe(true);
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getResizable()).toBe(false);
      });
    });

    describe('disabled attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting disabled />);
        expect(await driver.getDisabled()).toBe(true);
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getDisabled()).toBe(false);
      });

      it('depreacted - should not display an error icon even if the error is true', async () => {
        const driver = createDriver(<InputAreaForTesting disabled error />);
        expect(await driver.hasExclamation()).toBe(false);
      });

      it('should not display a status icon even if status="error"', async () => {
        const driver = createDriver(
          <InputAreaForTesting disabled status="error" />,
        );
        expect(await driver.hasExclamation()).toBe(false);
      });

      it('should not display a status icon even if status="warning"', async () => {
        const driver = createDriver(
          <InputAreaForTesting disabled status="warning" />,
        );
        expect(await driver.hasExclamation()).toBe(false);
      });

      it('should not be resizable', async () => {
        const driver = createDriver(<InputAreaForTesting disabled />);
        expect(await driver.getResizable()).toBe(false);
      });
    });

    describe('rows attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const rows = 5;

        const driver = createDriver(<InputAreaForTesting rows={rows} />);
        expect(await driver.getRowsCount()).toEqual(rows);
      });
    });

    describe('tabIndex attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const tabIndex = 1;

        const driver = createDriver(
          <InputAreaForTesting tabIndex={tabIndex} />,
        );
        expect(await driver.getTabIndex()).toEqual(tabIndex);
      });
    });

    describe('name attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const name = 'someName';

        const driver = createDriver(<InputAreaForTesting name={name} />);
        expect(await driver.getName()).toEqual(name);
      });
    });

    describe('size attribute', () => {
      it('should pass down small size', async () => {
        const driver = createDriver(<InputAreaForTesting size="small" />);
        expect(await driver.isSizeSmall()).toBe(true);
      });
    });

    describe('readOnly attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const driver = createDriver(<InputAreaForTesting readOnly />);
        expect(await driver.getReadOnly()).toBe(true);
      });

      it('should pass down to the wrapped input with default false value', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getReadOnly()).toBe(false);
      });
    });

    describe('status attribute', () => {
      [
        { status: 'error', message: 'Error Message' },
        { status: 'warning', message: 'Warning Message' },
        { status: 'loading', message: 'Loading Message' },
      ].forEach(test => {
        it(`should display a status icon when status="${test.status}"`, async () => {
          const driver = createDriver(
            <InputAreaForTesting
              status={test.status}
              statusMessage={test.message}
            />,
          );

          expect(await driver.hasStatus()).toBe(true);
          expect(await driver.getStatus()).toBe(test.status);
          expect(await driver.hasStatusMessage()).toBe(true);
          expect(await driver.getStatusMessage()).toBe(test.message);
        });
      });
    });

    describe('onChange attribute', () => {
      it('should be called when text is entered to the input', async () => {
        const onChange = jest.fn();

        const driver = createDriver(
          <InputAreaForTesting onChange={onChange} />,
        );

        await driver.enterText('world');

        expect(onChange).toBeCalled();
      });
    });

    describe('onKeyUp attribute', () => {
      it('should be called after keyboard key got pressed and then released', async () => {
        const onKeyUp = jest.fn();
        const event = { target: { value: 'world' } };

        const driver = createDriver(<InputAreaForTesting onKeyUp={onKeyUp} />);

        await driver.trigger('keyUp', event);

        expect(onKeyUp).toBeCalled();
      });
    });

    describe('onFocus attribute', () => {
      it('should be called when the input gets focused', async () => {
        const onFocus = jest.fn();
        const driver = createDriver(<InputAreaForTesting onFocus={onFocus} />);

        await driver.trigger('focus');

        expect(onFocus).toBeCalled();
      });
    });

    describe('onBlur attribute', () => {
      it('should be called when the input gets blured', async () => {
        const onBlur = jest.fn();
        const driver = createDriver(<InputAreaForTesting onBlur={onBlur} />);

        await driver.trigger('blur');

        expect(onBlur).toBeCalled();
      });
    });

    describe('onKeyDown attribute', () => {
      it('should be called when text is entered to the wrapped input', async () => {
        const onKeyDown = jest.fn();
        const event = { keyCode: 40 };

        const driver = createDriver(
          <InputAreaForTesting onKeyDown={onKeyDown} />,
        );

        await driver.trigger('keyDown', event);

        expect(onKeyDown).toBeCalled();
      });
    });

    describe('onEnter attribute', () => {
      it('should be called when text is entered to the wrapped input', async () => {
        const onEnterPressed = jest.fn();
        const event = { key: 'Enter', keyCode: 13, which: 13 };

        const driver = createDriver(
          <InputAreaForTesting onEnterPressed={onEnterPressed} />,
        );

        await driver.trigger('keyDown', event);

        expect(onEnterPressed).toBeCalled();
      });
    });

    describe('forceFocus attribute', () => {
      it('should have focus class on input if forceFocus is true', async () => {
        const driver = createDriver(<InputAreaForTesting forceFocus />);
        expect(await driver.isFocusedStyle()).toBe(true);
      });
    });

    describe('forceHover attribute', () => {
      it('should have hover class on input if forceHover is true', async () => {
        const driver = createDriver(<InputAreaForTesting forceHover />);
        expect(await driver.isHoveredStyle()).toBe(true);
      });

      it('should be hovered if forceFocus is false and forceHover is true', async () => {
        const driver = createDriver(
          <InputAreaForTesting forceHover forceFocus={false} />,
        );
        expect(await driver.isHoveredStyle()).toBe(true);
      });
    });

    describe('autoFocus attribute', () => {
      it('Mounting an input element with autoFocus=false, should give it the focus', async () => {
        const { driver, rerender } = render(
          <InputAreaForTesting autoFocus={false} />,
        );
        expect(await driver.isFocus()).toBe(false);
        rerender(<InputAreaForTesting autoFocus />);
        expect(await driver.isFocus()).toBe(false);
      });

      it('Mounting an input element with autoFocus=true, gives it the focus', async () => {
        const driver = createDriver(<InputAreaForTesting autoFocus />);
        expect(await driver.isFocus()).toBe(true);
      });
    });

    describe('focus function', () => {
      it('calling focus should give focus to the input', async () => {
        const driver = createDriver(<InputAreaForTesting autoFocus={false} />);
        expect(await driver.isFocus()).toBe(false);
        await driver.focus();
        expect(await driver.isFocus()).toBe(true);
      });
    });

    describe('aria attributes', () => {
      it('should allow adding a custom aria-label', async () => {
        const driver = createDriver(<InputAreaForTesting ariaLabel="hello" />);
        expect(await driver.getAriaLabel()).toBe('hello');
      });

      it('should not have any aria label buy default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaLabel()).toBeNull;
      });

      it('should allow adding aria-controls', async () => {
        const driver = createDriver(<InputAreaForTesting ariaControls="id" />);
        expect(await driver.getAriaControls()).toBe('id');
      });

      it('should not have any aria controls by default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaControls()).toBeNull;
      });

      it('should allow adding aria-describedby', async () => {
        const driver = createDriver(
          <InputAreaForTesting ariaDescribedby="blabla" />,
        );
        expect(await driver.getAriaDescribedby()).toBe('blabla');
      });

      it('should not have any aria-describedby by default', async () => {
        const driver = createDriver(<InputAreaForTesting />);
        expect(await driver.getAriaDescribedby()).toBeNull;
      });
    });
  }
});
