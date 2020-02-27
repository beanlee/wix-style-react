import React from 'react';
import multiSelectDriverFactory from '../MultiSelect.driver';
import { multiselectUniDriverFactory } from '../MultiSelect.uni.driver';
import MultiSelect from '../MultiSelect';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/unit';
import eventually from '../../../test/utils/eventually';

describe('MultiSelect', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(multiSelectDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(multiselectUniDriverFactory));
  });

  function runTests(render) {
    const createDriver = jsx => render(jsx).driver;

    const expectEventTargetValue = value =>
      expect.objectContaining({
        target: expect.objectContaining({ value }),
      });

    const options = [
      { value: 'Alabama', id: 'Alabama' },
      { value: 'Alaska', id: 'Alaska' },
      { value: 'Arkansas', id: 'Arkansas' },
      { value: 'Arkansas', id: 'Arkansas' },
      { value: 'California', id: 'California' },
      { value: 'Two words', id: 'Two words' },
    ];
    const FIRST_OPTION = options[0];
    const FIRST_OPTION_ID = options[0].id;

    afterEach(() => {
      cleanup();
    });

    class ControlledMultiSelect extends React.Component {
      state = { inputValue: this.props.value || '' };

      UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ inputValue: nextProps.value });
      }

      render() {
        return (
          <MultiSelect
            {...this.props}
            onChange={e => {
              this.setState({ inputValue: e.target.value });
            }}
            value={this.state.inputValue}
          />
        );
      }
    }

    it('should NOT show dropdown when autofocus is on', async () => {
      const { inputDriver, dropdownLayoutDriver } = createDriver(
        <MultiSelect options={options} autoFocus />,
      );
      expect(await inputDriver.isFocus()).toBe(true);
      expect(await dropdownLayoutDriver.isShown()).toBe(false);
    });

    it('should remove options that were selected and became tags', async () => {
      const tags = [{ id: 'Alabama', label: 'Alabama' }];

      const { driver: multiSelectDriver, rerender } = render(
        <MultiSelect options={options} autoFocus />,
      );
      const { dropdownLayoutDriver } = multiSelectDriver;
      expect(await dropdownLayoutDriver.optionsLength()).toBe(options.length);
      expect(await dropdownLayoutDriver.isOptionExists('Alabama')).toBe(true);

      rerender(<MultiSelect options={options} tags={tags} autoFocus />);
      expect(await dropdownLayoutDriver.optionsLength()).toBe(
        options.length - tags.length,
      );
      expect(await dropdownLayoutDriver.isOptionExists('Alabama')).toBe(false);
    });

    it('should not filter anything without predicate function', async () => {
      const onSelect = jest.fn();
      const { driver, dropdownLayoutDriver } = createDriver(
        <MultiSelect options={options} onSelect={onSelect} />,
      );
      await driver.focus();
      expect(await dropdownLayoutDriver.optionsLength()).toBe(options.length);
    });

    it('should be editable', async () => {
      const { driver } = createDriver(<MultiSelect options={options} />);
      expect(await driver.isEditable()).toBe(true);
    });

    it('should NOT be editable on select mode', async () => {
      const { driver } = createDriver(
        <MultiSelect mode="select" options={options} />,
      );
      expect(await driver.isEditable()).toBe(false);
    });

    it('should render custom input as the input element', async () => {
      const { inputDriver } = createDriver(<MultiSelect options={options} />);
      expect(await inputDriver.isCustomInput()).toEqual(true);
    });

    describe('click-outside', () => {
      it('should clear input when clicked-out-side given input is non-empty', async () => {
        const onChange = jest.fn();
        const { driver, inputDriver } = createDriver(
          <MultiSelect value={''} onChange={onChange} />,
        );
        await inputDriver.focus('ArrowDown');
        await inputDriver.enterText('foo');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(expectEventTargetValue('foo'));
        onChange.mockReset();

        await driver.outsideClick();
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(expectEventTargetValue(''));
      });

      it('should not clear input when clicked-out-side if clearOnBlur is set to false', async () => {
        const onChange = jest.fn();
        const { driver, inputDriver } = createDriver(
          <MultiSelect value={''} onChange={onChange} clearOnBlur={false} />,
        );
        await inputDriver.focus('ArrowDown');
        await inputDriver.enterText('foo');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(expectEventTargetValue('foo'));
        onChange.mockReset();

        await driver.outsideClick();
        expect(onChange).toHaveBeenCalledTimes(0);
      });

      it('should NOT select option when clicked-out-side given option is marked', async () => {
        const onSelect = jest.fn();

        const { driver, dropdownLayoutDriver } = createDriver(
          <ControlledMultiSelect options={options} onSelect={onSelect} />,
        );
        await driver.pressKey('ArrowDown');
        await driver.pressKey('ArrowDown');
        expect(await dropdownLayoutDriver.isOptionHovered(0)).toBe(true);
        await driver.outsideClick();
        expect(onSelect).toHaveBeenCalledTimes(0);
      });
    });

    describe('with status', () => {
      [
        { status: 'error', statusMessage: 'Error Message' },
        { status: 'warning', statusMessage: 'Warning Message' },
        { status: 'loading', statusMessage: 'Loading Message' },
      ].forEach(test => {
        it(`should display a status icon when status="${test.status}"`, async () => {
          const { inputDriver } = createDriver(
            <MultiSelect {...test} options={options} />,
          );

          expect(await inputDriver.hasStatus()).toBe(true);
          expect(await inputDriver.getStatus()).toBe(test.status);
          expect(await inputDriver.hasStatusMessage()).toBe(true);
          expect(await inputDriver.getStatusMessage()).toBe(test.statusMessage);
        });
      });
    });

    describe('Tag Input', () => {
      it('should render readonly input on select mode', async () => {
        const { inputDriver } = createDriver(
          <MultiSelect options={options} mode="select" />,
        );
        expect(await inputDriver.getReadOnly()).toBe(true);
      });

      it('should render arrow on select mode', async () => {
        const { inputDriver } = createDriver(
          <MultiSelect options={options} mode="select" />,
        );
        expect(await inputDriver.hasMenuArrow()).toBe(true);
      });

      it('should have disabled attribute on input if disabled', async () => {
        const { driver } = createDriver(
          <MultiSelect disabled options={options} />,
        );
        expect(await driver.isDisabled()).toBe(true);
        expect(await driver.inputWrapperIsDisabled()).toBe(true);
      });

      describe('Placeholder', () => {
        it('should display a placeholder if there are no tags', async () => {
          const placeholder = 'myPlaceholder';
          const { inputDriver } = createDriver(
            <MultiSelect options={options} placeholder={placeholder} />,
          );
          expect(await inputDriver.getPlaceholder()).toBe(placeholder);
        });

        it('should not display a placeholder if there are any tags', async () => {
          const tags = [{ id: 'Alabama', label: 'Alabama' }];
          const placeholder = 'myPlaceholder';
          const { inputDriver } = createDriver(
            <MultiSelect
              options={options}
              tags={tags}
              placeholder={placeholder}
            />,
          );
          expect(await inputDriver.getPlaceholder()).toBe('');
        });
      });

      it('should focus the input when clicking on the input wrapper', async () => {
        const { driver, inputDriver } = createDriver(
          <MultiSelect options={options} />,
        );
        expect(await inputDriver.isFocus()).toBe(false);
        await driver.clickOnInputWrapper();
        expect(await inputDriver.isFocus()).toBe(true);
      });

      it('should check that wrapper has focus when the input element does', async () => {
        const { driver, inputDriver } = createDriver(
          <MultiSelect options={options} />,
        );
        await driver.clickOnInputWrapper();
        expect(await inputDriver.isFocus()).toBe(true);
        expect(await driver.inputWrapperHasFocus()).toBe(true);
      });

      it('should contain specific tags', async () => {
        const tags = [
          { id: 'Alabama', label: 'Alabama' },
          { id: 'Alaska', label: 'Alaska' },
        ];

        const { driver } = createDriver(
          <MultiSelect options={options} tags={tags} />,
        );
        expect(await driver.numberOfTags()).toBe(tags.length);
        expect(await driver.getTagLabelAt(0)).toBe('Alabama');
        expect(await driver.getTagLabelAt(1)).toBe('Alaska');
      });

      describe('Submit (Add Tag)', () => {
        describe('input is empty', () => {
          it('should NOT submit when Enter is pressed', async () => {
            const onManuallyInput = jest.fn();
            const { driver } = createDriver(
              <ControlledMultiSelect
                options={options}
                onManuallyInput={onManuallyInput}
              />,
            );

            await driver.focus();
            await driver.pressKey('Enter');

            expect(onManuallyInput).toHaveBeenCalledTimes(0);
          });
        });

        describe('input is not empty', () => {
          async function testCase({
            props,
            keyPressed,
            enteredText,
            Component = MultiSelect,
            expectSubmit,
          }) {
            const onSelect = jest.fn();
            const onManuallyInput = jest.fn();
            const { driver, inputDriver } = createDriver(
              <Component
                onManuallyInput={onManuallyInput}
                onSelect={onSelect}
                {...props}
              />,
            );

            await driver.focus();
            inputDriver.enterText(enteredText);
            await driver.pressKey(keyPressed);

            expect(onSelect).toHaveBeenCalledTimes(0);
            expect(onManuallyInput).toHaveBeenCalledTimes(expectSubmit ? 1 : 0);
            expectSubmit &&
              expect(onManuallyInput).toBeCalledWith([enteredText]);
          }

          describe('Controlled', () => {
            it('should submit when text entered and Enter is pressed', async () => {
              await testCase({
                Component: ControlledMultiSelect,
                props: { options },
                enteredText: 'custom value',
                keyPressed: 'Enter',
                expectSubmit: true,
              });
            });

            it('should submit when Enter pressed given initial value', async () => {
              const onSelect = jest.fn();
              const onManuallyInput = jest.fn();
              const { driver } = createDriver(
                <ControlledMultiSelect
                  onManuallyInput={onManuallyInput}
                  onSelect={onSelect}
                  value="foo"
                />,
              );

              await driver.focus();
              await driver.pressKey('Enter');

              expect(onSelect).toHaveBeenCalledTimes(0);
              expect(onManuallyInput).toHaveBeenCalledTimes(1);
              expect(onManuallyInput).toBeCalledWith(['foo']);
            });

            it('should submit when Enter pressed given value updated', async () => {
              const onSelect = jest.fn();
              const onManuallyInput = jest.fn();
              const { driver: _driver, rerender } = render(
                <ControlledMultiSelect
                  onManuallyInput={onManuallyInput}
                  onSelect={onSelect}
                  value="foo"
                />,
              );
              const { driver } = _driver;
              rerender(
                <ControlledMultiSelect
                  onManuallyInput={onManuallyInput}
                  onSelect={onSelect}
                  value="foo2"
                />,
              );
              await driver.focus();
              await driver.pressKey('Enter');

              expect(onSelect).toHaveBeenCalledTimes(0);
              expect(onManuallyInput).toHaveBeenCalledTimes(1);
              expect(onManuallyInput).toBeCalledWith(['foo2']);
            });
          });

          describe('Uncontrolled', () => {
            it('should submit when text entered and Enter is pressed', async () => {
              await testCase({
                props: { options },
                enteredText: 'custom value',
                keyPressed: 'Enter',
                expectSubmit: true,
              });
            });

            it('should submit when text entered and delimiter is pressed', async () => {
              await testCase({
                props: { options },
                enteredText: 'custom value',
                keyPressed: ',',
                expectSubmit: true,
              });
            });

            it('should NOT submit when spaces-only text is entered and Enter pressed', async () => {
              await testCase({
                props: { options },
                enteredText: '   ',
                keyPressed: 'Enter',
                expectSubmit: false,
              });
            });

            it('should NOT submit when delimited-spaces text is entered and Enter pressed', async () => {
              await testCase({
                props: { options },
                enteredText: ' ,  ',
                keyPressed: 'Enter',
                expectSubmit: false,
              });
            });
          });
        });
      });

      describe.skip('Paste', () => {
        async function testCase({
          props,
          pasteValue,
          expectedonManuallyInputArg,
        }) {
          const onSelect = jest.fn();
          const onManuallyInput = jest.fn();
          const { driver: _driver } = render(
            <MultiSelect
              options={options}
              onSelect={onSelect}
              onManuallyInput={onManuallyInput}
              {...props}
            />,
          );
          const { driver, inputDriver } = _driver;
          await driver.focus();
          await inputDriver.trigger('paste');
          await inputDriver.enterText(pasteValue);

          expect(onSelect).toHaveBeenCalledTimes(0);
          expect(onManuallyInput).toHaveBeenCalledTimes(1);
          expect(onManuallyInput).toBeCalledWith(expectedonManuallyInputArg);
        }

        it('should submit with single value when pasting a single custom value', async () => {
          await testCase({
            pasteValue: 'custom value',
            expectedonManuallyInputArg: ['custom value'],
          });
        });

        it('should submit with multiple values with pasting comma-delimited value (default delimiter)', async () => {
          await testCase({
            pasteValue: 'value1,value2',
            expectedonManuallyInputArg: ['value1', 'value2'],
          });
        });

        it('should submit with multiple values with pasting colon-delimited value (custom delimiter)', async () => {
          await testCase({
            props: { delimiters: [':'] },
            pasteValue: 'value1:value2',
            expectedonManuallyInputArg: ['value1', 'value2'],
          });
        });

        it('should submit with multiple values with pasting mixed delimited value (custom delimiters)', async () => {
          await testCase({
            props: { delimiters: [':', ';'] },
            pasteValue: 'value1:value2;value3',
            expectedonManuallyInputArg: ['value1', 'value2', 'value3'],
          });
        });

        it('should submit with trimmed values', async () => {
          await testCase({
            pasteValue: ' value1 , value2 ',
            expectedonManuallyInputArg: ['value1', 'value2'],
          });
        });
      });

      it('should call onRemoveTag when removing a tag', async () => {
        const tagId = 'SweetHome';
        const tags = [{ id: tagId, label: 'Alabama' }];
        const onRemoveTag = jest.fn();
        const { driver } = createDriver(
          <MultiSelect autoFocus tags={tags} onRemoveTag={onRemoveTag} />,
        );

        const tagDriver = await driver.getTagDriverByTagId(tagId);
        await tagDriver.removeTag();

        expect(onRemoveTag).toHaveBeenCalledWith(tagId);
      });
    });

    describe('Select Option', () => {
      it('should call onSelect when option clicked', async () => {
        const onSelect = jest.fn();

        const { driver } = createDriver(
          <MultiSelect options={options} onSelect={onSelect} />,
        );
        await driver.selectOptionById(FIRST_OPTION_ID);

        expect(onSelect).toHaveBeenCalledTimes(1);
      });

      it('should call onSelect with selected option given highlight enabled', async () => {
        // This is a regression test for old bug , when highlight enabled the value would be a <Highlight> element
        const onSelect = jest.fn();
        const { driver } = createDriver(
          <MultiSelect options={options} onSelect={onSelect} />,
        );
        await driver.selectOptionById(FIRST_OPTION_ID);

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toBeCalledWith(FIRST_OPTION);
      });

      it('should call onSelect with selected option given highlight disabled', async () => {
        const onSelect = jest.fn();
        const { driver } = createDriver(
          <MultiSelect
            options={options}
            onSelect={onSelect}
            highlight={false}
          />,
        );
        await driver.selectOptionById(FIRST_OPTION_ID);
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toBeCalledWith(FIRST_OPTION);
      });

      it('should call onSelect with selected option when selected by keyboard', async () => {
        const onSelect = jest.fn();

        const { driver } = createDriver(
          <MultiSelect options={options} onSelect={onSelect} />,
        );
        await driver.pressKey('ArrowDown');
        await driver.pressKey('ArrowDown');
        await driver.pressKey('Enter');

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toBeCalledWith(options[0]);
      });

      it('should NOT display dropdown options when MultiSelect is disabled (keyboard)', async () => {
        const onSelect = jest.fn();

        const { driver, dropdownLayoutDriver } = createDriver(
          <MultiSelect disabled options={options} onSelect={onSelect} />,
        );
        await driver.pressKey('ArrowDown');
        expect(await dropdownLayoutDriver.isShown()).toBe(false);
      });

      it('should NOT display dropdown options when MultiSelect is disabled (mouse click)', async () => {
        const onSelect = jest.fn();

        const { driver, dropdownLayoutDriver } = createDriver(
          <MultiSelect disabled options={options} onSelect={onSelect} />,
        );

        await driver.clickOnInputWrapper();

        expect(await dropdownLayoutDriver.isShown()).toBe(false);
      });

      // TODO: Disabled since in order to support this in new API, we better add ability for DropdownLayout to accept custom "select" keys.
      // We can also consider removing this feature (Ben?)
      /* eslint-disable-next-line jest/no-disabled-tests */
      xdescribe('Select with delimiter', () => {
        it('should select option when comma press', async () => {
          const onSelect = jest.fn();
          const onChange = jest.fn();
          const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
            <MultiSelect
              value={options[0].value}
              options={options}
              delimiters={[',']}
              onSelect={onSelect}
              onChange={onChange}
            />,
          );
          await driver.pressKey('ArrowDown');
          inputDriver.trigger('keyDown', { key: ',' });
          expect(onSelect).toHaveBeenCalledTimes(1);
          expect(onChange).toBeCalledWith({ target: { value: '' } });
          expect(await dropdownLayoutDriver.isShown()).toBe(true);
          expect(inputDriver.isFocus()).toBe(true);
        });

        it('should select option when custom delimiters pressed', async () => {
          const onSelect = jest.fn();
          const onChange = jest.fn();
          const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
            <MultiSelect
              value={options[0].value}
              options={options}
              delimiters={[';']}
              onSelect={onSelect}
              onChange={onChange}
            />,
          );
          await driver.pressKey('ArrowDown');
          inputDriver.trigger('keyDown', { key: ';' });
          expect(onSelect).toHaveBeenCalledTimes(1);
          expect(onSelect).toBeCalledWith(options[0]);
          expect(onChange).toBeCalledWith({ target: { value: '' } });
          expect(await dropdownLayoutDriver.isShown()).toBe(true);
          expect(inputDriver.isFocus()).toBe(true);
        });
      });

      describe('Keep Options Open', () => {
        it('should not lose Focus or close the options when options selected by mouse click', async () => {
          const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
            <MultiSelect options={options} />,
          );
          await driver.selectOptionById(FIRST_OPTION_ID);
          expect(await dropdownLayoutDriver.isShown()).toBe(true);
          expect(await inputDriver.isFocus()).toBe(true);
        });

        it('should not lose Focus or close the options when options selected by pressing Enter', async () => {
          const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
            <MultiSelect options={options} />,
          );
          await driver.focus();
          await driver.pressKey('ArrowDown');
          await driver.pressKey('Enter');
          expect(await dropdownLayoutDriver.isShown()).toBe(true);
          expect(await inputDriver.isFocus()).toBe(true);
        });

        it.skip('should not lose Focus or close the options when options selected by pressing Tab', async () => {
          const onSelect = jest.fn();
          const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
            <MultiSelect options={options} onSelect={onSelect} />,
          );
          await driver.pressKey('ArrowDown');
          await driver.pressKey('ArrowDown');
          await driver.pressKey('Tab');
          expect(onSelect).toHaveBeenCalledTimes(1);
          expect(await dropdownLayoutDriver.isShown()).toBe(true);
          await eventually(async () =>
            expect(await inputDriver.isFocus()).toBe(true),
          ); // Limitation - covered with e2e test
        });
      });
    });

    describe('onKeyDown', () => {
      it('should call onKeyDown once when character key pressed', async () => {
        const onKeyDown = jest.fn();
        const { driver, inputDriver } = createDriver(
          <MultiSelect options={options} onKeyDown={onKeyDown} />,
        );

        await driver.focus();
        await inputDriver.keyDown('a');
        expect(onKeyDown.mock.calls).toHaveLength(1);
      });
    });

    describe('custom node suffix', () => {
      it('should have custom node suffix when prop is passed', async () => {
        const { driver } = createDriver(
          <MultiSelect customSuffix={<div />} options={options} />,
        );

        expect(await driver.customSuffixExists()).toBe(true);
      });

      it('should not have custom node suffix when prop is not passed', async () => {
        const { driver } = createDriver(<MultiSelect options={options} />);

        expect(await driver.customSuffixExists()).toBe(false);
      });
    });

    describe('maxHeight', () => {
      it('should set maxHeight to initial when no height limit introduced', async () => {
        const { driver } = createDriver(<MultiSelect options={options} />);

        expect(await driver.getMaxHeight()).toBe('initial');
      });

      it('should set maxHeight when maxNumRows defined', async () => {
        const { driver } = createDriver(
          <MultiSelect maxNumRows={2} options={options} />,
        );

        expect(await driver.getMaxHeight()).toBe('70px');
      });

      it('should set maxHeight when maxNumRows defined (large tags)', async () => {
        const _options = [
          { value: 'Alaska', id: 'Alaska', label: 'Alaska', size: 'large' },
        ];

        const { driver } = createDriver(
          <MultiSelect maxNumRows={2} tags={_options} options={_options} />,
        );

        expect(await driver.getMaxHeight()).toBe('94px');
      });
    });

    // TODO: dnd testkit is missing - once it's available, this test has to be completed and run
    // eslint-disable-next-line jest/no-disabled-tests
    xdescribe('Drag & Drop', () => {
      it('should allow reordering the tags', async () => {
        const tags = [
          { label: 'Alabama', id: 'Alabama' },
          { label: 'California2', id: 'California2' },
          { label: 'California3', id: 'California3' },
          { label: 'California4', id: 'California4' },
        ];
        const onReorder = jest.fn();
        const {
          driver: { getTagLabelAt, getTagDriverByTagId },
        } = createDriver(
          <MultiSelect
            draggable
            options={options}
            tags={tags}
            onReorder={onReorder}
            autoFocus
          />,
        );
        getTagDriverByTagId('Alabama').dragTo(
          getTagDriverByTagId('California3').element,
        );
        expect(onReorder).toBeCalledWith({ removedIndex: 0, addedIndex: 2 });

        expect(getTagLabelAt(0)).toBe('California3');
        expect(getTagLabelAt(2)).toBe('Alabama');
      });
    });
  }
});
