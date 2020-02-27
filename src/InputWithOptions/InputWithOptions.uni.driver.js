import { testkit as inputUniDriverFactory } from '../Input/Input.uni.driver';
import { dropdownLayoutDriverFactory } from '../DropdownLayout/DropdownLayout.uni.driver';
import popoverDriverFactory from '../Popover/Popover.uni.driver';
import { CommonDriver } from 'wix-ui-core/dist/src/components/popover/Popover.common.uni.driver';
import { ReactBase } from '../../test/utils/unidriver';
import { dropdownLayoutDriverProxy } from './InputWithOptions.proxy.driver';

export const inputWithOptionsUniDriverFactory = (base, body) => {
  const inputWrapperSelector = '[data-input-parent]';
  const dropdownLayoutSelector = `[data-hook="inputwithoptions-dropdownlayout"]`;

  const inputWrapper = base.$(inputWrapperSelector);
  const popoverTestkit = () => popoverDriverFactory(base, body);
  const popoverCommonTestkit = () => CommonDriver(base, body);
  const dropdownLayoutTestkit = async () => {
    const content = await popoverCommonTestkit().getContentElement();
    return dropdownLayoutDriverFactory(content.$(dropdownLayoutSelector));
  };

  const inputTestkit = inputUniDriverFactory(
    base.$(`${inputWrapperSelector} > *:first-child `),
    body,
  );

  const driver = {
    exists: () => base.exists(),
    /** Select an option by id. (If dropdown options is not opened yet, this will open it and click on the option) */
    selectOptionById: async id => {
      const nativeSelect = await base.$('[data-hook=native-select]');

      if (await nativeSelect.exists()) {
        const dataHookPrefix = `native-option-${id}`;
        const option = await base.$(`[data-hook*=${dataHookPrefix}]`);
        const selectedIndex = await option.attr('data-index');

        return await ReactBase(nativeSelect).select(selectedIndex);
      }

      const isPopoverShown = await popoverTestkit().isContentElementExists();
      if (!isPopoverShown) {
        await inputTestkit.click();
      }

      await (await (await dropdownLayoutTestkit()).optionById(id)).click();
    },
    isReadOnly: async () => await inputTestkit.getReadOnly(),
    isEditable: async () =>
      !(await inputTestkit.getReadOnly()) &&
      !(await inputTestkit.getDisabled()),
    isDisabled: () => inputTestkit.getDisabled(),
    /** @deprecated  Should be private */
    inputWrapper: () => inputWrapper.getNative(), // eslint-disable-line no-restricted-properties
    focus: () => inputTestkit.focus(),
    blur: async () => await (await dropdownLayoutTestkit()).mouseClickOutside(),
    // TODO: use pressKey instead of keyDown
    pressKey: async key => await inputTestkit.keyDown({ key }),
    outsideClick: async () => await popoverTestkit().clickOutside(),
    isOptionWrappedToHighlighter: async optionId => {
      await driver.pressKey('ArrowDown');
      const { element: optionElm } = await (
        await dropdownLayoutTestkit()
      ).optionById(optionId);
      return (
        (await optionElm().exists()) &&
        (await optionElm()
          .$(`[data-hook=highlighter-${optionId}]`)
          .exists())
      );
    },
  };

  const dropdownLayoutDummy = () => dropdownLayoutDriverFactory(base);
  const dropdownLayoutDriver = dropdownLayoutDriverProxy(
    dropdownLayoutDummy,
    dropdownLayoutTestkit,
    popoverTestkit,
    inputTestkit,
  );
  return {
    exists: () => driver.exists(),
    driver,
    inputDriver: inputTestkit,
    dropdownLayoutDriver,
  };
};
