import React from 'react';
import { mount } from 'enzyme';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import { enzymeUniTestkitFactoryCreator } from 'wix-ui-test-utils/enzyme';

import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';
import DropdownBase from '../DropdownBase';
import IconButton from '../../IconButton';
import { dropdownBasePrivateDriverFactory } from '../DropdownBase.private.uni.driver';

describe('DropdownBase', () => {
  const render = createRendererWithUniDriver(dropdownBasePrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  const createDriver = jsx => render(jsx).driver;

  const dropdownBaseEnzymeDriver = enzymeUniTestkitFactoryCreator(
    dropdownBasePrivateDriverFactory,
  );

  const defaultProps = {
    options: [
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option' },
      { id: 3, value: 'Fourth option' },
    ],
  };

  const createUncontrolledDriver = (renderProp, initialProps) => {
    let args;

    const driver = createDriver(
      <DropdownBase {...defaultProps} {...initialProps}>
        {_args => {
          args = _args;
          return renderProp ? renderProp(_args) : <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    return {
      args,
      driver,
    };
  };

  const createControlledDriver = (renderProp, initialProps) => {
    let args;

    const dataHook = 'dropdown-base-0';
    const wrapper = mount(
      <DropdownBase
        {...defaultProps}
        dataHook={dataHook}
        open={false}
        {...initialProps}
      >
        {_args => {
          args = _args;
          return renderProp ? renderProp(_args) : <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    const driver = dropdownBaseEnzymeDriver({
      wrapper,
      dataHook,
    });

    return {
      args,
      driver,
      wrapper,
    };
  };

  it('should accept a node as a children', async () => {
    const driver = createDriver(
      <DropdownBase {...defaultProps}>
        <div>Hello</div>
      </DropdownBase>,
    );

    const targetElement = await driver.getTargetElement();
    expect(targetElement.innerHTML).toContain('Hello');
  });

  it('should accept a function as a children and pass it the required arguments', async () => {
    const driver = createDriver(
      <DropdownBase {...defaultProps}>
        {({ open, close, toggle, delegateKeyDown, selectedOption }) => {
          expect(typeof open).toBe('function');
          expect(typeof close).toBe('function');
          expect(typeof toggle).toBe('function');
          expect(typeof delegateKeyDown).toBe('function');

          expect(selectedOption).toEqual(undefined);

          return <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    const targetElement = await driver.getTargetElement();
    expect(targetElement.innerHTML).toContain('Hello again');
  });

  it('should call onSelect when an option was selected', async () => {
    const onSelectFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} open onSelect={onSelectFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.selectOption(0);

    expect(onSelectFn).toHaveBeenCalledWith({ id: 0, value: 'First option' });
  });

  it('should call onClickOutside', async () => {
    const onClickOutsideFn = jest.fn();

    const { args, driver } = createUncontrolledDriver(null, {
      onClickOutside: onClickOutsideFn,
    });

    await driver.clickOutside();
    expect(onClickOutsideFn).toHaveBeenCalledTimes(0);

    args.open();
    expect(await driver.isDropdownShown()).toBe(true);

    await driver.clickOutside();
    expect(await driver.isDropdownShown()).toBe(false);
    expect(onClickOutsideFn).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseEnter', async () => {
    const onMouseEnterFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseEnter={onMouseEnterFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.mouseEnter();
    expect(onMouseEnterFn).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave', async () => {
    const onMouseLeaveFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseLeave={onMouseLeaveFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.mouseLeave();
    expect(onMouseLeaveFn).toHaveBeenCalledTimes(1);
  });

  it('should show drop down when clicking on target element', async () => {
    const onMouseLeaveFn = jest.fn();

    const targetDataHook = 'myOpenButton';
    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseLeave={onMouseLeaveFn}>
        {({ open }) => {
          return (
            <IconButton
              skin="inverted"
              dataHook={targetDataHook}
              onClick={open}
            >
              <ChevronDown />
            </IconButton>
          );
        }}
      </DropdownBase>,
    );

    await driver.clickTargetElement(targetDataHook);
    expect(await driver.isDropdownShown()).toEqual(true);
  });

  it('should show drop down when hover on target element', async () => {
    const onMouseLeaveFn = jest.fn();

    const targetDataHook = 'myOpenButton';
    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseLeave={onMouseLeaveFn}>
        {({ open }) => {
          return (
            <IconButton
              skin="inverted"
              dataHook={targetDataHook}
              onMouseEnter={open}
            >
              <ChevronDown />
            </IconButton>
          );
        }}
      </DropdownBase>,
    );

    await driver.hoverTargetElement(targetDataHook);
    expect(await driver.isDropdownShown()).toEqual(true);
  });

  it('should return number of options according to given options', async () => {
    const onMouseLeaveFn = jest.fn();

    const targetDataHook = 'myOpenButton';
    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseLeave={onMouseLeaveFn}>
        {({ open }) => {
          return (
            <IconButton
              skin="inverted"
              dataHook={targetDataHook}
              onClick={open}
            >
              <ChevronDown />
            </IconButton>
          );
        }}
      </DropdownBase>,
    );

    await driver.clickTargetElement(targetDataHook);
    expect(await driver.optionsCount()).toEqual(defaultProps.options.length);
  });

  describe('uncontrolled open behaviour', () => {
    it('should allow controlling the behaviour using a render prop', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBe(true);

      args.close();
      expect(await driver.isDropdownShown()).toBe(false);

      args.toggle();
      expect(await driver.isDropdownShown()).toBe(true);

      args.toggle();
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should close on click outside', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBe(true);

      await driver.clickOutside();
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should close when selecting an option', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBe(true);

      await driver.selectOption(0);
      expect(await driver.isDropdownShown()).toBe(false);
    });

    describe('keyDown handling', () => {
      it('should delegate the event to the DropdownLayout', async () => {
        const { args, driver } = createUncontrolledDriver();

        // We'll press the ArrowDown key to highlight the next option, and then select it with the
        // Enter key.

        args.open();

        await driver.keyDown('ArrowDown');
        expect(await driver.isOptionHovered(0)).toBe(true);

        await driver.keyDown('Enter');
        args.open();
        expect(await driver.isOptionSelected(0)).toBe(true);
      });

      it.each([['Enter', 'Spacebar', 'ArrowDown']])(
        'should open the DropdownLayout when the %s key is pressed',
        async expectedKey => {
          const { driver } = createUncontrolledDriver();

          expect(await driver.isDropdownShown()).toBe(false);

          await driver.keyDown(expectedKey);
          expect(await driver.isDropdownShown()).toBe(true);
        },
      );
    });

    describe('mouseLeave handling', () => {
      it('should not close the popover when leaving the target element', async () => {
        // This test handles a special case when the `close` function triggers directly on the
        // `mouseleave` event of the target element. Normally, The `mouseleave` event will trigger
        // when the user moves the cursor from the target element to the DropdownLayout, thus the
        // DropdownLayout will be closed.
        // This is not the desired behaviour. As a result, the DropdownBase handle this specific
        // case.

        // We'll use a custom render function
        const { driver } = createUncontrolledDriver(({ open, close }) => {
          return (
            <div onMouseEnter={open} onMouseLeave={close}>
              Hover me!
            </div>
          );
        });

        await driver.mouseEnterTarget();
        expect(await driver.isDropdownShown()).toBe(true);

        // Dropdown should still be shown when a mouseLeave happens on the target
        await driver.mouseLeaveTarget();
        expect(await driver.isDropdownShown()).toBe(true);

        // Dropdown should be hidden when a mouseLeave happens on the DropdownLayout
        await driver.mouseLeave();
        expect(await driver.isDropdownShown()).toBe(false);
      });
    });
  });

  describe('controlled open behaviour', () => {
    it('should allow controlling the behaviour using the `open` prop', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBe(true);

      wrapper.setProps({ open: false });
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should not allow controlling the behaviour using a render prop', async () => {
      const { args, driver } = createControlledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBe(false);

      args.close();
      expect(await driver.isDropdownShown()).toBe(false);

      args.toggle();
      expect(await driver.isDropdownShown()).toBe(false);
    });

    it('should not close on click outside', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBe(true);

      await driver.clickOutside();
      expect(await driver.isDropdownShown()).toBe(true);
    });

    it('should not close when selecting an option', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBe(true);

      await driver.selectOption(0);
      expect(await driver.isDropdownShown()).toBe(true);
    });

    describe('keyDown handling', () => {
      it('should not delegate the event to the DropdownLayout by default', async () => {
        const { driver, wrapper } = createControlledDriver();

        wrapper.setProps({ open: true });

        await driver.keyDown('ArrowDown');
        expect(await driver.isOptionHovered(0)).toBe(false);

        await driver.keyDown('Enter');
        expect(await driver.isDropdownShown()).toBe(true);
      });
    });
  });

  describe('uncontrolled selection behaviour', () => {
    it('should accept an initialSelectedId and use it', async () => {
      const driver = createDriver(
        <DropdownBase {...defaultProps} open initialSelectedId={2}>
          <div>Hello</div>
        </DropdownBase>,
      );

      expect(await driver.isOptionSelected(2)).toBe(true);
    });

    it('should store the selection after user interaction', async () => {
      const driver = createDriver(
        <DropdownBase {...defaultProps} open>
          <div>Hello</div>
        </DropdownBase>,
      );

      await driver.selectOption(0);
      expect(await driver.isOptionSelected(0)).toBe(true);

      await driver.selectOption(2);
      expect(await driver.isOptionSelected(2)).toBe(true);
    });
  });

  describe('controlled selection behaviour', () => {
    it('should accept an initialSelectedId and use it', async () => {
      const { driver } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 0,
        initialSelectedId: 2,
      });

      expect(await driver.isOptionSelected(2)).toBe(true);
    });

    it('should update according to the selectedId', async () => {
      const { driver, wrapper } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 1,
      });

      expect(await driver.isOptionSelected(1)).toBe(true);

      wrapper.setProps({ selectedId: 2 });
      expect(await driver.isOptionSelected(2)).toBe(true);
    });

    it('should not store the selection after user interaction', async () => {
      const { driver } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 1,
      });

      await driver.selectOption(0);
      expect(await driver.isOptionSelected(0)).toBe(false);
      expect(await driver.isOptionSelected(1)).toBe(true);

      await driver.selectOption(2);
      expect(await driver.isOptionSelected(2)).toBe(false);
      expect(await driver.isOptionSelected(1)).toBe(true);
    });
  });
});
