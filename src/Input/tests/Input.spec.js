import React from 'react';
import sinon from 'sinon';
import Search from 'wix-ui-icons-common/Search';
import { mount } from 'enzyme';

import Input from '..';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/unit';
import inputDriverFactory from '../Input.driver';
import { testkit } from '../Input.private.uni.driver';

describe('Input', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(inputDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(testkit));
  });

  function runTests(render) {
    afterEach(() => {
      cleanup();
    });

    describe('enterText driver method', () => {
      it('passes the name and value attribute', async () => {
        const onChange = jest.fn();
        const props = {
          type: 'text',
          name: 'gal',
          onChange,
        };
        const { driver } = render(<Input {...props} />);
        await driver.enterText('some text');
        expect(onChange).toHaveBeenCalledTimes(1);
        const eventTarget = onChange.mock.calls[0][0].target;
        expect(eventTarget.name).toEqual('gal');
        expect(eventTarget.type).toEqual('text');
        expect(eventTarget.value).toEqual('some text');
      });
    });

    describe('name attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          name: 'hello',
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getName()).toEqual(props.name);
      });
    });

    describe('maxLength attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          maxLength: 100,
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getMaxLength()).toEqual('' + props.maxLength);
      });
    });

    describe('type attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          type: 'number',
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getType()).toEqual(props.type);
      });
    });

    describe('value attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          value: 'hello',
          onChange: () => {},
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getValue()).toEqual(props.value);
        expect(await driver.getText()).toEqual(props.value);
      });
    });

    describe('pattern attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const props = {
          pattern: '[pattern]',
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getPattern()).toEqual(props.pattern);
      });
    });

    describe('required attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const { driver } = render(<Input required />);
        expect(await driver.getRequired()).toBe(true);
      });
    });

    describe('autocomplete attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const { driver } = render(<Input autocomplete="email" />);
        expect(await driver.getAutocomplete()).toBe('email');
      });
    });

    describe('defaultValue attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const defaultValue = 'hello';

        const { driver } = render(<Input defaultValue={defaultValue} />);
        expect(await driver.getDefaultValue()).toEqual(defaultValue);
      });
    });

    describe('tabIndex attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const tabIndex = 1;

        const { driver } = render(<Input tabIndex={tabIndex} />);
        expect(await driver.getTabIndex()).toEqual(tabIndex);
      });
    });

    describe('readOnly attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const { driver } = render(<Input readOnly />);
        expect(await driver.getReadOnly()).toBe(true);
      });

      it('should pass down to the wrapped input with default false value', async () => {
        // change
        const { driver } = render(<Input />);
        expect(await driver.getReadOnly()).toBe(false);
      });
    });

    describe('disableEditing attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const { driver } = render(<Input disableEditing />);
        expect(await driver.getReadOnly()).toBe(true);
      });
    });

    describe('textOverflow attribute', () => {
      it('should pass down to the wrapped input', async () => {
        const { driver } = render(<Input textOverflow="ellipsis" />);
        expect(await driver.getTextOverflow()).toBe('ellipsis');
      });

      it('should pass down to the wrapped input with default clip value', async () => {
        // change
        const { driver } = render(<Input />);
        expect(await driver.getTextOverflow()).toBe('clip');
      });
    });

    describe('`type` prop', () => {
      it('should set type attribute', async () => {
        // change
        const { driver } = render(<Input type="number" />);
        expect(await driver.getType()).toBe('number');
      });

      describe('when "number"', () => {
        it('should prevent onChange to be called with non numeric values', async () => {
          const onChange = jest.fn();
          const { driver } = render(
            <Input type="number" onChange={onChange} value="2" />,
          );
          driver.trigger('change', { target: { value: 'a' } });
          driver.trigger('keyPress', { target: { key: 'l' } });
          expect(await driver.getValue()).toEqual('2');
          expect(await driver.getText()).toEqual('2');
          expect(onChange).not.toHaveBeenCalled();
        });
      });
    });

    describe('status attribute', () => {
      it('should display a loader icon if status is loading', async () => {
        // change
        const { driver } = render(<Input status={'loading'} />);

        expect(await driver.hasLoader()).toBeTruthy();
      });

      it('should display a warning icon if status is warning', async () => {
        const { driver } = render(<Input status={'warning'} />);

        expect(await driver.hasWarning()).toBe(true);
      });
    });

    describe('hideStatusSuffix attribute', () => {
      it('should display suffix if hideStatusSuffix is falsy', async () => {
        const { driver } = render(
          <Input status="error" hideStatusSuffix={false} />,
        );

        expect(await driver.hasSuffix()).toBe(true);
      });

      it('should hide suffix if hideStatusSuffix is true', async () => {
        const { driver } = render(<Input status="error" hideStatusSuffix />);

        expect(await driver.hasSuffix()).toBe(false);
      });
    });

    describe('menuArrow attribute', () => {
      it('should display a menu arrow icon if menuArrow is true', async () => {
        const { driver } = render(<Input menuArrow />);
        expect(await driver.hasMenuArrow()).toBe(true);
      });

      it('should not display a menu arrow icon if menuArrow is false', async () => {
        const { driver } = render(<Input menuArrow={false} />);
        expect(await driver.hasMenuArrow()).toBe(false);
      });

      it('should invoke onInputClicked while click on menu arrow icon', async () => {
        const onInputClicked = jest.fn();
        const { driver } = render(
          <Input menuArrow onInputClicked={onInputClicked} />,
        );
        await driver.clickMenuArrow();
        expect(onInputClicked).toBeCalled();
      });

      it('should not fail while click on menu arrow icon without passing onInputClicked', async () => {
        const { driver } = render(<Input menuArrow />);
        expect(async () => {
          await driver.clickMenuArrow();
        }).not.toThrowError(/onInputClicked is not a function/);
      });
    });

    describe('rtl attribute', () => {
      it('should have rtl if rtl prop is true', async () => {
        const { driver } = render(<Input rtl />);
        expect(await driver.isRTL()).toBe(true);
      });

      it('should not have rtl if rtl prop is false', async () => {
        const { driver } = render(<Input rtl={false} />);
        expect(await driver.isRTL()).toBe(false);
      });
    });

    describe('onChange attribute', () => {
      it('should be called when text is entered to the input', async () => {
        const onChange = jest.fn();
        const event = { target: { value: 'world' } };

        const { driver } = render(<Input onChange={onChange} />);

        await driver.trigger('change', event);

        expect(onChange).toBeCalled();
      });
    });

    describe('onKeyUp attribute', () => {
      it('should be called after keyboard key got pressed and then released', async () => {
        const onKeyUp = jest.fn();
        const event = { target: { value: 'world' } };

        const { driver } = render(<Input onKeyUp={onKeyUp} />);

        await driver.trigger('keyUp', event);

        expect(onKeyUp).toBeCalled();
      });
    });

    describe('onFocus attribute', () => {
      it('should be called when the input gets focused', async () => {
        const onFocus = jest.fn();
        const { driver } = render(<Input onFocus={onFocus} />);

        await driver.trigger('focus');

        expect(onFocus).toBeCalled();
      });
    });

    describe('onBlur attribute', () => {
      it('should be called when the input gets blured', async () => {
        const onBlur = jest.fn();
        const { driver } = render(<Input onBlur={onBlur} />);

        await driver.trigger('blur');

        expect(onBlur).toBeCalled();
      });
    });

    describe('onKeyDown attribute', () => {
      it('should be called when text is entered to the wrapped input', async () => {
        const onKeyDown = jest.fn();
        const event = { keyCode: 40 };

        const { driver } = render(<Input onKeyDown={onKeyDown} />);

        await driver.trigger('keyDown', event);

        expect(onKeyDown).toBeCalled();
      });
    });

    describe('onPaste attribute', () => {
      it('should be called when pasting text to the input', async () => {
        const onPaste = jest.fn();

        const { driver } = render(<Input onPaste={onPaste} />);

        await driver.trigger('paste');

        expect(onPaste).toBeCalled();
      });
    });

    describe('forceFocus attribute', () => {
      it('should have focus class on input if forceFocus is true', async () => {
        const { driver } = render(<Input forceFocus />);
        expect(await driver.isFocusedStyle()).toBe(true);
      });
    });

    describe('forceHover attribute', () => {
      it('should have hover class on input if forceHover is true', async () => {
        const { driver } = render(<Input forceHover />);
        expect(await driver.isHoveredStyle()).toBe(true);
      });

      it('should be hovered if forceFocus is false and forceHover is true', async () => {
        const { driver } = render(<Input forceHover forceFocus={false} />);
        expect(await driver.isHoveredStyle()).toBe(true);
      });
    });

    describe('disable attribute', () => {
      it('should have disabled class on input if disabled is true', async () => {
        const { driver } = render(<Input disabled />);
        expect(await driver.isDisabled()).toBe(true);
      });
    });

    describe('autoFocus attribute', () => {
      it('Mounting an input element with autoFocus=false, should give it the focus', async () => {
        const { driver, rerender } = render(<Input autoFocus={false} />);
        expect(await driver.isFocus()).toBe(false);

        rerender(<Input autoFocus />);
        expect(await driver.isFocus()).toBe(false);
      });
      //
      // it('Mounting an input element with autoFocus=true, gives it the focus', async () => {
      //   const { driver } = render(<Input autoFocus />);
      //   expect(await driver.isFocus()).toBe(true);
      // });

      describe('with value attribute', () => {
        const value = 'this is a string';

        it('Should focus with cursor located at the end of the value', async () => {
          const { driver } = render(<Input autoFocus value={value} />);
          expect(await driver.getCursorLocation()).toEqual(value.length);
        });
      });
    });

    describe('driver.focus', () => {
      it('calling driver.focus (without enzyme) should give focus to the input', async () => {
        const { driver } = render(<Input autoFocus={false} />);
        expect(await driver.isFocus()).toBe(false);
        await driver.focus();
        expect(await driver.isFocus()).toBe(true);
      });
    });

    describe('Input.focus', () => {
      it('calling driver.focus (with enzyme) with options, should call the Input instance focus method and pass options', async () => {
        const wrapper = mount(<Input autoFocus={false} dataHook="test" />);
        const focusMock = jest.fn();
        wrapper.instance().input.focus = focusMock;
        wrapper.instance().focus({ preventScroll: true });
        expect(focusMock).toHaveBeenCalledWith({ preventScroll: true });
      });
    });

    describe('theme attribute', () => {
      it('should set the theme by default to "normal"', async () => {
        const { driver } = render(<Input />);
        expect(await driver.isOfStyle('normal')).toBe(true);
      });

      it('should allowing setting the theme to "paneltitle"', async () => {
        const { driver } = render(<Input theme="paneltitle" />);
        expect(await driver.isOfStyle('paneltitle')).toBe(true);
      });

      it('should allow setting the theme to "material"', async () => {
        const { driver } = render(<Input theme="material" />);
        expect(await driver.isOfStyle('material')).toBe(true);
      });

      it('should allow setting the theme to "flat"', async () => {
        const { driver } = render(<Input theme="flat" />);
        expect(await driver.isOfStyle('flat')).toBe(true);
      });

      it('should allow setting the theme to "flatdark"', async () => {
        const { driver } = render(<Input theme="flatdark" />);
        expect(await driver.isOfStyle('flatdark')).toBe(true);
      });
    });

    describe('clearButton attribute', () => {
      it('should be displayed when input text is not empty', async () => {
        const { driver } = render(<Input value="some value" clearButton />);
        expect(await driver.hasClearButton()).toBe(true);
      });

      it('should not be displayed when input text is empty', async () => {
        const { driver } = render(<Input value="" clearButton />);
        expect(await driver.hasClearButton()).toBe(false);
      });

      it('should focus on the Input', async () => {
        const { driver } = render(<Input clearButton value="some value" />);
        await driver.clickClear();
        expect(await driver.isFocus()).toBe(true);
      });

      it('should trigger onChange on clearing as if input just emptied', async () => {
        const onChange = jest.fn();
        const { driver } = render(
          <Input onChange={onChange} value="some value" clearButton />,
        );
        await driver.clickClear();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target.value).toBe('');
      });

      it('should trigger onClear when clicking the clear button', async () => {
        const onClear = jest.fn();
        const { driver } = render(
          <Input onClear={onClear} value="some value" />,
        );
        await driver.clickClear();
        expect(onClear).toHaveBeenCalledTimes(1);
        expect(onClear.mock.calls[0][0].target.value).toBe('');
      });

      describe('clear method', () => {
        it('should call onChange with empty value after calling clear', async () => {
          const spy = jest.fn();
          const wrapper = mount(<Input value="foo" onChange={spy} />);
          wrapper.instance().clear();
          expect(spy.mock.calls[0][0].target.value).toBe('');
        });

        it('should NOT call onChange if the input was already empty', async () => {
          const spy = jest.fn();
          const wrapper = mount(<Input value="" onChange={spy} />);
          wrapper.instance().clear();
          expect(spy.mock.calls.length).toBe(0);
        });
      });

      describe('updateControlledOnClear is true', () => {
        it('should NOT trigger onChange on clearing', async () => {
          const onChange = jest.fn();
          const { driver } = render(
            <Input
              onChange={onChange}
              value="some value"
              clearButton
              updateControlledOnClear
            />,
          );
          await driver.clickClear();
          expect(onChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger onClear on clearing', async () => {
          const onClear = jest.fn();
          const { driver } = render(
            <Input
              onClear={onClear}
              value="some value"
              clearButton
              updateControlledOnClear
            />,
          );
          await driver.clickClear();
          expect(onClear).toHaveBeenCalledTimes(1);
          expect(onClear.mock.calls[0][0]).toBeTruthy();
        });
      });

      describe.skip('Uncontrolled', () => {
        // TODO
        it('should be displayed when using uncontrolled component with defaultValue', async () => {
          const { driver } = render(
            <Input defaultValue="some value" clearButton />,
          );
          expect(await driver.hasClearButton()).toBe(true);
        });

        // TODO
        it('should be displayed after entering text into empty uncontrolled input', async () => {
          const { driver } = render(<Input clearButton />);
          await driver.enterText('some value');
          expect(await driver.hasClearButton()).toBe(true);
        });

        // TODO
        it('should clear input when using uncontrolled component', async () => {
          const { driver } = render(<Input clearButton />);
          await driver.enterText('some value');
          await driver.clickClear();
          expect(await driver.getValue()).toBe('');
          expect(await driver.getText()).toBe('');
          expect(await driver.isFocus()).toBe(true);
        });

        // TODO
        it('should be hidden after default value was overridden with some input', async () => {
          const { driver } = render(
            <Input defaultValue="some default value" clearButton />,
          );
          expect(await driver.hasClearButton()).toBe(true);
          await driver.clearText();
          await driver.enterText('new value');
          expect(await driver.hasClearButton()).toBe(false);
        });
      });
    });

    describe('onClear attribute', () => {
      it('should display clear-button when input text is not empty', async () => {
        const { driver } = render(
          <Input value="some value" onClear={() => null} />,
        );
        expect(await driver.hasClearButton()).toBe(true);
      });

      it('should invoke callback', async () => {
        const onClear = sinon.spy();
        const { driver } = render(
          <Input onClear={onClear} value="some value" />,
        );
        expect(await driver.hasClearButton()).toBe(true);
        await driver.clickClear();
        expect(onClear.calledOnce).toBe(true);
      });
    });

    describe('prefix attribute', () => {
      it('should allow adding a custom prefix component', async () => {
        const { driver } = render(
          <Input prefix={<div className="my-button" />} />,
        );
        expect(await driver.hasPrefix()).toBe(true);
        expect(await driver.prefixComponentExists('.my-button')).toBe(true);
      });

      it('should add `withPrefix` classname to input', async () => {
        const { driver } = render(<Input prefix="hello" />);
        expect(await driver.hasPrefixClass()).toBe(true);
      });

      it('should invoke onInputClicked while click on custom affix', async () => {
        const onInputClicked = jest.fn();
        const { driver } = render(
          <Input
            prefix={<Input.Affix>$</Input.Affix>}
            onInputClicked={onInputClicked}
          />,
        );
        await driver.clickCustomAffix();
        expect(onInputClicked).toBeCalled();
      });

      it('should not fail while click on custom affix without passing onInputClicked', async () => {
        const { driver } = render(
          <Input prefix={<Input.Affix>$</Input.Affix>} />,
        );
        expect(() => {
          driver.clickCustomAffix();
        }).not.toThrowError(/onInputClicked is not a function/);
      });
      it('should invoke onInputClicked while click on icon affix', async () => {
        const onInputClicked = jest.fn();
        const { driver } = render(
          <Input
            prefix={
              <Input.IconAffix dataHook="icon-affix">
                <Search />
              </Input.IconAffix>
            }
            onInputClicked={onInputClicked}
          />,
        );
        await driver.clickIconAffix();
        expect(onInputClicked).toBeCalled();
      });

      it('should not fail while click on icon affix without passing onInputClicked', async () => {
        const { driver } = render(
          <Input
            prefix={
              <Input.IconAffix dataHook="icon-affix">
                <Search />
              </Input.IconAffix>
            }
          />,
        );
        expect(() => {
          driver.clickIconAffix();
        }).not.toThrowError(/onInputClicked is not a function/);
      });
    });

    describe('suffix attribute', () => {
      it('should allow adding a custom suffix component', async () => {
        const { driver } = render(
          <Input suffix={<div className="my-button" />} />,
        );
        expect(await driver.hasSuffix()).toBe(true);
        expect(await driver.suffixComponentExists('.my-button')).toEqual(true);
      });

      it('should add `withSuffix` classname to input', async () => {
        const { driver } = render(<Input suffix="hello" />);
        expect(await driver.hasSuffixClass()).toBe(true);
      });

      it('should add `withSuffixes` classname to input when more than 1 suffix applied', async () => {
        const { driver } = render(<Input suffix="hello" status="error" />);
        expect(await driver.hasSuffixesClass()).toBe(true);
      });

      it('should render menu arrow as the last suffix', async () => {
        const { driver } = render(<Input suffix="hello" menuArrow />);
        expect(await driver.isMenuArrowLast()).toBe(true);
      });

      it('should invoke onInputClicked while click on custom affix', async () => {
        const onInputClicked = jest.fn();
        const { driver } = render(
          <Input
            suffix={<Input.Affix>$</Input.Affix>}
            onInputClicked={onInputClicked}
          />,
        );
        await driver.clickCustomAffix();
        expect(onInputClicked).toBeCalled();
      });

      it('should not fail while click on custom affix without passing onInputClicked', async () => {
        const { driver } = render(
          <Input suffix={<Input.Affix>$</Input.Affix>} />,
        );
        expect(() => {
          driver.clickCustomAffix();
        }).not.toThrowError(/onInputClicked is not a function/);
      });

      it('should invoke onInputClicked while click on icon affix', async () => {
        const onInputClicked = jest.fn();
        const { driver } = render(
          <Input
            suffix={
              <Input.IconAffix dataHook="icon-affix">
                <Search />
              </Input.IconAffix>
            }
            onInputClicked={onInputClicked}
          />,
        );
        await driver.clickIconAffix();
        expect(onInputClicked).toBeCalled();
      });

      it('should not fail while click on icon affix without passing onInputClicked', async () => {
        const { driver } = render(
          <Input
            suffix={
              <Input.IconAffix dataHook="icon-affix">
                <Search />
              </Input.IconAffix>
            }
          />,
        );
        expect(() => {
          driver.clickIconAffix();
        }).not.toThrowError(/onInputClicked is not a function/);
      });
    });

    describe('aria attributes', () => {
      it('should allow adding a custom aria-label', async () => {
        const { driver } = render(<Input ariaLabel="hello" />);
        expect(await driver.getAriaLabel()).toBe('hello');
      });

      it('should not have any aria label buy default', async () => {
        const { driver } = render(<Input />);
        expect(await driver.getAriaLabel()).toBeNull;
      });

      it('should allow adding aria-controls', async () => {
        const { driver } = render(<Input ariaControls="id" />);
        expect(await driver.getAriaControls()).toBe('id');
      });

      it('should not have any aria controls by default', async () => {
        const { driver } = render(<Input />);
        expect(await driver.getAriaControls()).toBeNull;
      });

      it('should allow adding aria-describedby', async () => {
        const { driver } = render(<Input ariaDescribedby="blabla" />);
        expect(await driver.getAriaDescribedby()).toBe('blabla');
      });

      it('should not have any aria-describedby buy default', async () => {
        const { driver } = render(<Input />);
        expect(await driver.getAriaDescribedby()).toBeNull();
      });
    });

    describe('className prop', () => {
      it('should set className on root element', async () => {
        const className = 'foo';
        const { driver } = render(<Input className={className} />);
        const classes = await driver.getRootElementClasses();
        expect(classes.contains(className)).toEqual(true);
      });

      it('should NOT affect the native input classes when className passed', async () => {
        const className = 'foo';
        const { driver } = render(
          <Input
            className={className}
            suffix={<div className="my-button" />}
          />,
        );
        const classes = await driver.getInputElementClasses();
        expect(classes.contains(className)).toEqual(false);
        expect(await driver.suffixComponentExists('.my-button')).toBe(true);
      });
    });

    describe('input render', () => {
      it('should render customized input', async () => {
        const className = 'foo';
        const customInput = props => {
          return <input {...props} className={className} />;
        };
        const customInputWithRef = () =>
          React.forwardRef((props, ref) => customInput({ ...props, ref }));
        const { driver } = render(<Input customInput={customInputWithRef()} />);
        expect(await driver.isCustomInput()).toEqual(true);
      });

      it('should render input html by default', async () => {
        const { driver } = render(<Input />);
        expect(await driver.isCustomInput()).toEqual(false);
      });
    });

    describe(`'size' prop`, () => {
      it('should be equal to given', async () => {
        const props = {
          size: 'large',
        };

        const { driver } = render(<Input {...props} />);
        expect(await driver.getSize()).toEqual('' + props.size);
      });
    });
  }
});
