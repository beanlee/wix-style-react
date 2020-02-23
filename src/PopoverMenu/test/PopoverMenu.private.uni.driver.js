import { PopoverMenuDriver as publicDriverFactory } from '../PopoverMenu.uni.driver';
import { dropdownBasePrivateDriverFactory } from '../../DropdownBase/DropdownBase.private.uni.driver';

import popoverCommonDriverFactory from '../../Popover/Popover.common.uni.driver';

export const PopoverMenuPrivateDriver = (base, body) => {
  const { keyDown } = dropdownBasePrivateDriverFactory(base);
  const getContent = async () =>
    popoverCommonDriverFactory(base, body).getContentElement();

  const getOption = async (option, dataHook) =>
    (await getContent()).$(
      dataHook
        ? `[data-hook="${dataHook}"]`
        : `[data-hook="popover-menu-${option}"]`,
    );

  return {
    ...publicDriverFactory(base, body),
    keyDownTrigger: key => keyDown(key),
    keyDownOption: async (option, key) =>
      await (await getOption(option)).pressKey(key),
    getDivider: async dataHook =>
      await (await getOption('', dataHook)).getNative(),
    getMenuItem: async (option, dataHook) =>
      await (await getOption(option, dataHook)).getNative(),
    getZIndex: async () => {
      const style = await (await getContent())._prop('style');
      return style['z-index'];
    },
  };
};
