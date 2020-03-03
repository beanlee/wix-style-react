import React from 'react';
import { consoleErrors } from 'wix-ui-test-utils/dist/src/jest-setup';
import DropdownLayout, { DIVIDER_OPTION_VALUE } from '../DropdownLayout';
import dropdownLayoutDriverFactory from '../DropdownLayout.driver';
import { dropdownLayoutDriverFactory as dropdownLayoutUniDriverFactory } from '../DropdownLayout.uni.driver';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
  render as rawRender,
} from '../../../test/utils/react';
import { mount } from 'enzyme';
import { dropdownLayoutTestkitFactory } from '../../../testkit/enzyme';

describe('DropdownLayout', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(dropdownLayoutDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(dropdownLayoutUniDriverFactory), true);
  });

  afterEach(() => {
    cleanup();
  });

  const options = [
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3', disabled: true },
    { id: 3, value: 'Option 4' },
    { id: 'divider1', value: '-' },
    { id: 'element1', value: <span style={{ color: 'brown' }}>Option 4</span> },
    { value: '-' },
  ];

  function runTests(render, isAsync) {
    afterEach(() => {
      cleanup();
    });

    const createDriver = jsx => render(jsx).driver;

    it('should have be invisible and drop down by default', async () => {
      const driver = createDriver(<DropdownLayout options={options} />);
      expect(await driver.isShown()).toBe(false);
      expect(await driver.isDown()).toBe(true);
    });

    it('should find an option by text', async () => {
      const driver = createDriver(<DropdownLayout options={options} />);
      expect(await driver.isOptionExists('Option 1')).toBe(true);
    });

    it('should not find an option by text', async () => {
      const driver = createDriver(<DropdownLayout options={options} />);
      expect(await driver.isOptionExists('Option 111')).toBe(false);
    });

    it('should throw an error when trying to click on a non exists option', async () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      if (isAsync) {
        await expect(driver.clickAtOption(20)).rejects.toThrow();
      } else {
        expect(() => driver.clickAtOption(20)).toThrow();
      }
    });

    it('should focus on selected option', async () => {
      const driver = createDriver(
        <DropdownLayout
          focusOnSelectedOption
          visible
          options={options}
          selectedId={3}
        />,
      );
      expect(await driver.optionsScrollTop()).toBe(0);
    });

    it('should be visible and drop down', async () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(await driver.isShown()).toBe(true);
      expect(await driver.isDown()).toBe(true);
      expect(await driver.isUp()).toBe(false);
    });

    it('should be visible and drop up', async () => {
      const driver = createDriver(
        <DropdownLayout visible options={options} dropDirectionUp />,
      );
      expect(await driver.isShown()).toBe(true);
      expect(await driver.isDown()).toBe(false);
      expect(await driver.isUp()).toBe(true);
    });

    it('should have all options values in dropdown list', async () => {
      const _options = [
        { id: 0, value: 'Option 1' },
        { id: 1, value: 'Option 2' },
        { id: 2, value: 'Option 3' },
      ];
      const optionsContent = _options.map(option => option.value);
      const driver = createDriver(<DropdownLayout options={_options} />);
      expect(await driver.optionsContent()).toEqual(optionsContent);
    });

    it('should hide dropdown on outside click', async () => {
      const { driver, rerender } = render(
        <DropdownLayout
          onClickOutside={() =>
            rerender(<DropdownLayout visible={false} options={options} />)
          }
          visible
          options={options}
        />,
      );

      expect(await driver.isShown()).toBe(true);
      await driver.mouseClickOutside();
      expect(await driver.isShown()).toBe(false);
    });

    it('should have a default tab index', async () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(await driver.tabIndex()).toBe(0);
    });

    it('should have options', async () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(await driver.optionsLength()).toBe(7);
      expect(await driver.optionContentAt(0)).toBe('Option 1');
      expect(await driver.isOptionADivider(4)).toBe(true);
      expect(
        await (
          await driver.optionByHook('dropdown-divider-divider1')
        ).isDivider(),
      ).toBe(true);
      expect(await driver.optionContentAt(5)).toBe('Option 4');

      expect(await driver.isOptionADivider(6)).toBe(true);
      expect(
        await (await driver.optionByHook('dropdown-divider-6')).isDivider(),
      ).toBe(true);
    });

    it('should call onClose when esc key is pressed', async () => {
      const onClose = jest.fn();
      const driver = createDriver(
        <DropdownLayout visible options={options} onClose={onClose} />,
      );
      await driver.mouseEnterAtOption(0);
      await driver.pressEscKey();
      expect(onClose).toBeCalled();
    });

    it('should click an option by value', async () => {
      const onSelect = jest.fn();
      const driver = createDriver(
        <DropdownLayout visible options={options} onSelect={onSelect} />,
      );
      await driver.clickAtOptionWithValue('Option 4');
      expect(onSelect).toBeCalledWith(options[3], false);
    });

    describe('onSelect', () => {
      describe('with infiniteScroll', () => {
        it('should call onSelect with true value when clicking on a selected option if infinite scroll enabled', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout
              visible
              infiniteScroll
              loadMore={() => {}}
              options={options}
              onSelect={onSelect}
              selectedId={0}
            />,
          );
          await driver.clickAtOption(0);
          expect(onSelect).toBeCalledWith(options[0], true);
        });
      });

      describe('with selectedId', () => {
        it('should call onSelect with true value when clicking on a selected option', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout
              visible
              options={options}
              onSelect={onSelect}
              selectedId={0}
            />,
          );
          await driver.clickAtOption(0);
          expect(onSelect).toBeCalledWith(options[0], true);
        });

        it('should call onSelect with false value when clicking on a selected option by hook', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout
              visible
              options={options}
              onSelect={onSelect}
              selectedId={0}
            />,
          );
          await (await driver.optionByHook('dropdown-item-3')).click();
          expect(onSelect).toBeCalledWith(options[3], false);
        });
      });

      describe('without selectedId', () => {
        it('should notify a new option was selected for first selection', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.clickAtOption(0);
          expect(onSelect).toBeCalledWith(options[0], false);
        });

        it('should notify a new option was selected after a value was previously selected', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.clickAtOption(0);
          await driver.clickAtOption(1);
          expect(onSelect).toHaveBeenLastCalledWith(options[1], false);
        });

        it('should notify the same option was selected', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.clickAtOption(0);
          await driver.clickAtOption(0);
          expect(onSelect).toHaveBeenLastCalledWith(options[0], true);
        });
      });

      describe('keyboard events', () => {
        it('should call onSelect when enter key is pressed', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.pressDownKey();
          await driver.pressEnterKey();
          expect(onSelect).toBeCalled();
        });

        it('should call onSelect when space key is pressed', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.pressDownKey();
          await driver.pressSpaceKey();
          expect(onSelect).toBeCalled();
        });

        it('should call onSelect when tab key is pressed', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.pressDownKey();
          await driver.pressTabKey();
          expect(onSelect).toBeCalled();
        });

        it('should not call onSelect when composing text via external means', async () => {
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={onSelect} />,
          );
          await driver.pressEnterKey();
          expect(onSelect).not.toBeCalled();
        });
      });
    });

    it('should render a function option with the rendered item props', async () => {
      const selectedId = 0;
      const unSelectedId = 1;

      const optionsWithFuncValues = [
        {
          id: 0,
          value: ({ selected }) => (
            <div>option {selected ? 'selected' : 'not selected'}</div>
          ),
        },
        {
          id: 1,
          value: ({ selected }) => (
            <div>option {selected ? 'selected' : 'not selected'}</div>
          ),
        },
      ];

      const driver = createDriver(
        <DropdownLayout
          visible
          options={optionsWithFuncValues}
          selectedId={selectedId}
        />,
      );

      expect(await driver.optionContentAt(selectedId)).toEqual(
        'option selected',
      );
      expect(await driver.optionContentAt(unSelectedId)).toEqual(
        'option not selected',
      );
    });

    it('should select the chosen value', async () => {
      const selectedId = 0;
      const driver = createDriver(
        <DropdownLayout visible options={options} selectedId={selectedId} />,
      );
      expect(await driver.isOptionSelected(0)).toBe(true);
      expect(
        await (await driver.optionByHook('dropdown-item-0')).isSelected(),
      ).toBe(true);
    });

    it('should remember the selected option when getting re-opened after got closed', async () => {
      const selectedId = 1;
      const props = { visible: true, options, selectedId };
      const { driver, rerender } = render(<DropdownLayout {...props} />);
      expect(await driver.isOptionSelected(selectedId)).toBe(true);
      rerender(<DropdownLayout {...props} visible={false} />);
      rerender(<DropdownLayout {...props} visible />);
      expect(await driver.isOptionSelected(selectedId)).toBe(true);
    });

    it('should select the chosen value when overrideStyle is true', async () => {
      const selectedId = 0;
      const _options = [{ id: 0, value: 'Option 1', overrideStyle: true }];
      const driver = createDriver(
        <DropdownLayout visible options={_options} selectedId={selectedId} />,
      );

      expect(await driver.isOptionSelectedWithGlobalClassName(0)).toBe(true);
      expect(
        await (
          await driver.optionByHook('dropdown-item-0')
        ).isSelectedWithGlobalClassName(),
      ).toBe(true);
    });

    it('should not contain pointer arrow without the withArrow property', async () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(await driver.hasTopArrow()).toBe(false);
    });

    it('should contain pointer arrow when withArrow property is true', async () => {
      const driver = createDriver(
        <DropdownLayout visible withArrow options={options} />,
      );
      expect(await driver.hasTopArrow()).toBe(true);
    });

    it('should support mouse events', async () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      const driver = createDriver(
        <DropdownLayout
          visible
          options={options}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />,
      );
      await driver.mouseEnter();
      expect(onMouseEnter).toBeCalled();
      expect(onMouseLeave).not.toBeCalled();

      await driver.mouseLeave();
      expect(onMouseLeave).toBeCalled();
    });

    describe('itemHeight prop', () => {
      it('should be small by default', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        expect(await driver.isOptionHeightSmall(0)).toBe(true);
      });

      it('should be small', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} itemHeight="small" />,
        );
        expect(await driver.isOptionHeightSmall(0)).toBe(true);
      });

      it('should be big', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} itemHeight="big" />,
        );
        expect(await driver.isOptionHeightBig(0)).toBe(true);
      });
    });

    describe('selectedHighlight prop', () => {
      const selectedId = 0;

      it('should be true by default', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} selectedId={selectedId} />,
        );
        const option = await driver.optionById(selectedId);
        expect(await option.isSelected()).toBe(true);
      });

      describe('when true', () => {
        it('should give the option a selected classname', async () => {
          const driver = createDriver(
            <DropdownLayout
              selectedHighlight
              visible
              options={options}
              selectedId={selectedId}
            />,
          );
          const option = await driver.optionById(selectedId);
          expect(await option.isSelected()).toBe(true);
        });
      });

      describe('when false', () => {
        it('should not give the option a selected classname', async () => {
          const driver = createDriver(
            <DropdownLayout
              selectedHighlight={false}
              visible
              options={options}
              selectedId={selectedId}
            />,
          );
          const option = await driver.optionById(selectedId);
          expect(await option.isSelected()).toBe(false);
        });
      });
    });

    describe('options that are links', () => {
      it('should not be link by default', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        expect(await driver.isLinkOption(0)).toBe(false);
      });

      it('should be a link option', async () => {
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options.map(opt => ({ ...opt, linkTo: 'http://wix.com' }))}
          />,
        );
        expect(await driver.isLinkOption(0)).toBe(true);
      });
    });

    describe('onOptionMarked', () => {
      it('should call onOptionMarked when option is hovered', async () => {
        const onOptionMarked = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.mouseEnterAtOption(1);
        expect(onOptionMarked).toBeCalledWith(options[1]);
      });

      it('should call onOptionMarked with null when mouse leaves a hovered option', async () => {
        const onOptionMarked = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.mouseEnterAtOption(1);
        await driver.mouseLeaveAtOption(1);
        expect(onOptionMarked).toBeCalledWith(null);
        expect(onOptionMarked).toHaveBeenCalledTimes(2);
      });

      it('should call onOptionMarked when down key is pressed', async () => {
        const onOptionMarked = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.pressDownKey();
        await driver.pressDownKey();
        expect(onOptionMarked).toHaveBeenCalledTimes(2);
        expect(onOptionMarked.mock.calls[0]).toEqual([options[0]]);
        expect(onOptionMarked.mock.calls[1]).toEqual([options[1]]);
      });

      it('should call onOptionMarked with undefined when an option is selected', async () => {
        const onOptionMarked = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.mouseEnterAtOption(1);
        expect(onOptionMarked.mock.calls[0]).toEqual([options[1]]);
        await driver.clickAtOption(1);
        expect(onOptionMarked.mock.calls[1]).toBeUndefined();
      });

      it('should call onOptionMarked with null when options are closed', async () => {
        const onOptionMarked = jest.fn();
        const { driver, rerender } = render(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.mouseEnterAtOption(1);
        expect(onOptionMarked.mock.calls[0]).toEqual([options[1]]);
        rerender(
          <DropdownLayout
            visible={false}
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        expect(onOptionMarked.mock.calls[1]).toEqual([null]);
      });

      it('should call onOptionMarked with undefined when options change and the marked option is removed', async () => {
        const onOptionMarked = jest.fn();
        const { driver, rerender } = render(
          <DropdownLayout
            visible
            options={options}
            onOptionMarked={onOptionMarked}
          />,
        );
        await driver.mouseEnterAtOption(1);
        expect(onOptionMarked.mock.calls[0]).toEqual([options[1]]);
        rerender(
          <DropdownLayout
            visible
            options={options.slice(2)}
            onOptionMarked={onOptionMarked}
          />,
        );
        expect(onOptionMarked.mock.calls[1]).toEqual([null]);
      });
    });

    describe('controlled and uncontrolled logic', () => {
      describe('controlled', () => {
        it('should work as a controlled component when selectedId an onSelect are given', async () => {
          //give selectedId and onSelect
          const onSelect = jest.fn();
          const driver = createDriver(
            <DropdownLayout
              visible
              options={options}
              onSelect={onSelect}
              selectedId={0}
            />,
          );
          //select item
          await driver.clickAtOption(1);
          //expect internal state to not change
          expect(await driver.isOptionSelected(0)).toBe(true);
        });
      });

      describe('uncontrolled', () => {
        it('should work as an uncontrolled component when only selectedId is supplied', async () => {
          //give selectedId
          const driver = createDriver(
            <DropdownLayout visible options={options} selectedId={0} />,
          );
          //select item
          await driver.clickAtOption(1);
          //expect internal state to change
          expect(await driver.isOptionSelected(1)).toBe(true);
        });

        it('should work as an uncontrolled component when only onSelect is supplied', async () => {
          //give onSelect
          const driver = createDriver(
            <DropdownLayout visible options={options} onSelect={jest.fn()} />,
          );
          //select item
          await driver.clickAtOption(1);
          //expect internal state to change
          expect(await driver.isOptionSelected(1)).toBe(true);
        });
      });
    });

    describe('hover logic', () => {
      it('should not hover any option by default', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        expect(
          await Promise.all(
            options.map((option, index) => driver.isOptionHovered(index)),
          ),
        ).not.toContain(true);
      });

      it('should hover starting from the top', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(0)).toBe(true);
      });

      it('should hover starting from the selected item', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.clickAtOption(0);
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(1)).toBe(true);
      });

      it('should hover when mouse enter and unhover when mouse leave', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.mouseEnterAtOption(0);
        expect(await driver.isOptionHovered(0)).toBe(true);
        await driver.mouseLeaveAtOption(0);
        expect(await driver.isOptionHovered(0)).toBe(false);
      });

      it('should hover when mouse enter and unhover when mouse leave by data hook', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        const option = await driver.optionByHook('dropdown-item-0');
        await option.mouseEnter();
        expect(await option.isHovered()).toBe(true);
        await option.mouseLeave();
        expect(await option.isHovered()).toBe(false);
      });

      it('should hover when mouse enter and unhover when mouse leave when overrideStyle is true', async () => {
        const _options = [{ id: 0, value: 'Option 1', overrideStyle: true }];

        const driver = createDriver(
          <DropdownLayout visible options={_options} />,
        );

        await driver.mouseEnterAtOption(0);
        expect(await driver.isOptionHoveredWithGlobalClassName(0)).toBe(true);
        expect(
          await (
            await driver.optionByHook('dropdown-item-0')
          ).isHoveredWithGlobalClassName(),
        ).toBe(true);
        await driver.mouseLeaveAtOption(0);
        expect(await driver.isOptionHoveredWithGlobalClassName(0)).toBe(false);
        expect(
          await (
            await driver.optionByHook('dropdown-item-0')
          ).isHoveredWithGlobalClassName(),
        ).toBe(false);
      });

      it('should not hover divider or a disabled item when mouse enter', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.mouseEnterAtOption(2);
        expect(await driver.isOptionHovered(2)).toBe(false);
        await driver.mouseLeaveAtOption(4);
        expect(await driver.isOptionHovered(4)).toBe(false);
      });

      it('should have only one hovered option', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.mouseEnterAtOption(0);
        expect(await driver.isOptionHovered(0)).toBe(true);
        await driver.mouseEnterAtOption(1);
        expect(await driver.isOptionHovered(0)).toBe(false);
        expect(await driver.isOptionHovered(1)).toBe(true);
      });

      it('should hovered items cyclic and skipping divider or disabled items on down key', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.pressDownKey();
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(1)).toBe(true);
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(3)).toBe(true);
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(5)).toBe(true);
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(0)).toBe(true);
      });

      it('should hovered items cyclic and skipping divider or disabled on up key', async () => {
        const driver = createDriver(
          <DropdownLayout visible options={options} />,
        );
        await driver.pressUpKey();
        expect(await driver.isOptionHovered(5)).toBe(true);
        await driver.pressUpKey();
        expect(await driver.isOptionHovered(3)).toBe(true);
        await driver.pressUpKey();
        expect(await driver.isOptionHovered(1)).toBe(true);
        await driver.pressUpKey();
        expect(await driver.isOptionHovered(0)).toBe(true);
      });

      it('should hover starting from a given item', async () => {
        const _options = [
          { id: 10, value: 'Option 1' },
          { id: 20, value: 'Option 2' },
          { id: 30, value: 'Option 3' },
        ];
        const driver = createDriver(
          <DropdownLayout
            visible
            options={_options}
            selectedId={20}
            onSelect={jest.fn()}
          />,
        );
        await driver.pressDownKey();
        expect(await driver.isOptionHovered(2)).toBe(true);
      });

      it('should remember the hovered option when options change', async () => {
        const _options = [
          { id: 0, value: 'a 1' },
          { id: 1, value: 'a 2' },
          { id: 2, value: 'a 3' },
          { id: 3, value: 'a 4' },
        ];

        const { driver, rerender } = render(
          <DropdownLayout visible options={_options} />,
        );
        await driver.pressDownKey();
        await driver.pressDownKey();
        await driver.pressDownKey();
        await driver.pressDownKey();

        expect(await driver.isOptionHovered(3)).toBe(true);

        rerender(<DropdownLayout visible options={_options.slice(1)} />);

        expect(await driver.isOptionHovered(2)).toBe(true);
      });

      it('should reset the hovered option when options change and hovered option does not exist anymore', async () => {
        const initialOptions = [
          { id: 0, value: 'a 1' },
          { id: 1, value: 'a 2' },
          { id: 2, value: 'a 3' },
          { id: 3, value: 'a 4' },
        ];

        const { driver, rerender } = render(
          <DropdownLayout visible options={initialOptions} />,
        );
        await driver.pressDownKey();
        await driver.pressDownKey();

        expect(await driver.isOptionHovered(1)).toBe(true);

        rerender(<DropdownLayout visible options={initialOptions.slice(2)} />);

        expect(await driver.isOptionHovered(0)).toBe(false);
        expect(await driver.isOptionHovered(1)).toBe(false);
      });
    });

    describe('option validator', () => {
      describe('valid', () => {
        it('option', async () => {
          render(<DropdownLayout options={[{ id: '1', value: 'hello' }]} />);
          expect(consoleErrors.get()).toHaveLength(0);
        });
        it('option with function value', async () => {
          render(<DropdownLayout options={[{ id: '1', value: () => {} }]} />);
          expect(consoleErrors.get()).toHaveLength(0);
        });
        it('divider', async () => {
          render(
            <DropdownLayout options={[{ value: DIVIDER_OPTION_VALUE }]} />,
          );
          expect(consoleErrors.get()).toHaveLength(0);
        });
      });
    });

    describe('option markedOption', () => {
      const initialOptions = [
        { id: 0, value: 'a 1' },
        { id: 1, value: 'a 2' },
        { id: 2, value: 'a 3' },
        { id: 3, value: 'a 4' },
      ];

      it('should not mark any option by default', async () => {
        const { driver } = render(<DropdownLayout options={initialOptions} />);
        expect(await driver.markedOption()).toBe(null);
      });

      it('should mark first option when equals true', async () => {
        const { driver } = render(
          <DropdownLayout options={initialOptions} markedOption />,
        );
        expect(await driver.markedOption()).toBe('a 1');
      });

      it('should mark second option when providing id', async () => {
        const { driver } = render(
          <DropdownLayout options={initialOptions} markedOption={1} />,
        );
        expect(await driver.markedOption()).toBe('a 2');
      });

      it('should call onOptionMarked on default options', async () => {
        const spyOnOptionMarked = jest.fn();
        const dataHook = 'myDataHook';
        const wrapper = mount(
          <DropdownLayout
            dataHook={dataHook}
            options={[]}
            markedOption
            onOptionMarked={spyOnOptionMarked}
          />,
        );
        const dropdownLayoutTestkit = dropdownLayoutTestkitFactory({
          wrapper,
          dataHook,
        });

        wrapper.setProps({ options: initialOptions });
        expect(await dropdownLayoutTestkit.markedOption()).toBe('a 1');
        expect(spyOnOptionMarked).toHaveBeenLastCalledWith(initialOptions[0]);
      });
    });
  }

  // These tests are not driver related, so no need to test them both sync and async
  describe('invalid', () => {
    const render = rawRender;
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(jest.fn());
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it('no value', async () => {
      render(<DropdownLayout options={[{ id: '1' }]} />);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(
        expect.stringContaining('option.value'),
      );
    });

    it('no id and not divider', async () => {
      render(<DropdownLayout options={[{ value: 'aaa' }]} />);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(
        expect.stringContaining('option.id'),
      );
    });

    it('empty trimmed id', async () => {
      render(<DropdownLayout options={[{ id: '   ', value: 'hello' }]} />);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(
        expect.stringContaining('option.id'),
      );
    });

    it('empty trimmed value', async () => {
      render(<DropdownLayout options={[{ id: '1', value: '  ' }]} />);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toBeCalledWith(
        expect.stringContaining('option.value'),
      );
    });
  });
});
