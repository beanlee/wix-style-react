import { baseUniDriverFactory, ReactBase } from '../../test/utils/unidriver';
import * as DataAttr from './DataAttr';

export const dropdownLayoutDriverFactory = base => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);
  const reactBase = ReactBase(base);
  const contentContainer = async () => byDataHook('content-container');
  const optionsDataHook = DataAttr.DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS;
  const infiniteScrollContainerDataHook =
    DataAttr.DATA_HOOKS.INFINITE_SCROLL_CONTAINER;
  const infiniteScrollContainer = byDataHook(infiniteScrollContainerDataHook);
  const optionsElement = byDataHook(optionsDataHook);
  const optionElementAt = async position =>
    await base.$(
      `[data-hook=${
        (await infiniteScrollContainer.exists())
          ? infiniteScrollContainerDataHook
          : optionsDataHook
      }] > *:nth-child(${position + 1})`,
    );
  const optionElementByDataHook = async dataHook =>
    await base.$(
      `[data-hook=${
        (await infiniteScrollContainer.exists())
          ? infiniteScrollContainerDataHook
          : optionsDataHook
      }] [data-hook="${dataHook}"]`,
    );
  const options = () =>
    base.$$(`[data-hook=${optionsDataHook}] > *`).map(i => i);
  const optionsLength = async () => (await options()).length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, async () =>
      createOptionDriver(await optionElementAt(position)),
    );
  return {
    ...baseUniDriverFactory(base),
    /** @deprecated should be private */
    classes: () => optionsElement._prop('className'),
    clickAtOption: async index => (await optionElementAt(index)).click(),
    clickAtOptionByDataHook: async dataHook =>
      (await optionElementByDataHook(dataHook)).click(),
    clickAtOptionWithValue: async value => {
      for (const _option of await options()) {
        if ((await _option._prop('innerHTML')) === value) {
          return _option.click();
        }
      }
    },
    hasTopArrow: () => base.$('.arrow').exists(),
    isDown: async () => (await contentContainer()).hasClass('down'),
    isLinkOption: async position => {
      const option = await optionElementAt(position);
      return (await option._prop('tagName')).toLowerCase() === 'a';
    },
    isOptionADivider: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hasClass('divider'),
      ),
    isOptionExists: async optionText => {
      for (const _option of await options()) {
        if ((await _option.text()) === optionText) {
          return true;
        }
      }
      return false;
    },
    isOptionHovered: async index => {
      const option = await optionElementAt(index);
      return await option.hasClass('hovered');
    },
    isOptionSelected: async index => {
      const option = await optionElementAt(index);
      return await option.hasClass('selected');
    },
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hasClass('wixstylereactSelected'),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hasClass('wixstylereactHovered'),
      ),
    isOptionHeightSmall: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hasClass('smallHeight'),
      ),
    isOptionHeightBig: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hasClass('bigHeight'),
      ),
    isShown: async () =>
      (await (await contentContainer()).attr(DataAttr.DATA_SHOWN)) === 'true',
    isUp: async () => (await contentContainer()).hasClass('up'),
    mouseEnter: () => base.hover(),
    mouseEnterAtOption: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hover(),
      ),
    mouseLeave: () => reactBase.mouseLeave(),
    mouseClickOutside: () => ReactBase.clickBody(),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, async () =>
        ReactBase(await optionElementAt(position)).mouseLeave(),
      ),
    /** @deprecated Use optionDriver*/
    optionAt: () => optionElementAt.getNative(), // eslint-disable-line no-restricted-properties
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: async hook => {
      const option = optionsElement.$(`[data-hook=${hook}]`);
      if (!(await option.exists())) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }

      return createOptionDriver(option);
    },
    /**
     * Get Option by id
     * @returns {Promise<any>}
     */
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    optionContentAt: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).text(),
      ),
    optionDriver: createOptionDriver,
    options: async () => {
      const drivers = [];
      for (let position = 0; position < (await optionsLength()); position++) {
        drivers.push(await getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: async () => {
      const textArray = [];
      for (const option of await options()) {
        textArray.push(await option.text());
      }
      return textArray;
    },
    markedOption: async () => {
      const allOptions = await options();
      const optionsWithHovered = await Promise.all(
        allOptions.map(async option => ({
          option,
          hovered: await option.hasClass('hovered'),
        })),
      );
      const hoveredOptions = optionsWithHovered
        .filter(option => option.hovered)
        .map(option => option.option);
      return (
        (hoveredOptions.length &&
          createOptionDriver(hoveredOptions[0]).content()) ||
        null
      );
    },
    optionsLength,
    /** @deprecated should be private */
    optionsScrollTop: () => optionsElement._prop('scrollTop'),
    pressDownKey: () => base.pressKey('ArrowDown'),
    pressUpKey: () => base.pressKey('ArrowUp'),
    pressEnterKey: () => base.pressKey('Enter'),
    pressSpaceKey: () => base.pressKey(' '),
    pressTabKey: () => base.pressKey('Tab'),
    pressEscKey: () => base.pressKey('Escape'),
    tabIndex: () => base._prop('tabIndex'),
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => option.hover(),
  mouseLeave: () => ReactBase(option).mouseLeave(),
  isHovered: () => option.hasClass('hovered'),
  isSelected: () => option.hasClass('selected'),
  isHoveredWithGlobalClassName: () => option.hasClass('wixstylereactHovered'),
  isSelectedWithGlobalClassName: () => option.hasClass('wixstylereactSelected'),
  content: () => option.text(),
  click: () => option.click(),
  isDivider: () => option.hasClass('divider'),
  isDisabled: () => option.hasClass('disabled'),
});
