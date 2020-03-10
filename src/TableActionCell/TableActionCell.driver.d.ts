import { BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { PopoverMenuUniDriver } from '../PopoverMenu/PopoverMenu.uni.driver';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';

export interface TableActionCellDriver<T> extends BaseDriver {
  element: () => T;
  exists: () => boolean;
  clickPrimaryActionButton: () => void;
  getIsPrimaryActionButtonDisabled: () => boolean;
  getVisibleActionsCount: () => number;
  getHiddenActionsCount: () => number;
  getVisibleActionTooltipDriver: (action: number) => ReturnType<typeof tooltipDriverFactory>;
  getVisibleActionByDataHookTooltipDriver: (dataHook: string) => ReturnType<typeof tooltipDriverFactory>;
  getHiddenActionsPopoverMenuDriver: () => PopoverMenuUniDriver;
  clickVisibleAction: (actionIndex: number) => void;
  clickVisibleActionByDataHook: (actionDataHook: string) => void;
  clickPopoverMenu: () => void;
  clickHiddenAction: (actionIndex: number) => void;
  clickHiddenActionByDataHook: (actionDataHook: string) => void;
}
