import { BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { PopoverMenuUniDriver } from '../PopoverMenu/PopoverMenu.uni.driver';
import { TooltipDriver } from '../Tooltip/Tooltip.driver';

export interface TableActionCellDriver<T> extends BaseDriver {
  element: () => T;
  exists: () => boolean;
  clickPrimaryActionButton: () => void;
  getIsPrimaryActionButtonDisabled: () => boolean;
  getVisibleActionsCount: () => number;
  getHiddenActionsCount: () => number;
  getVisibleActionTooltipDriver: (action: number) => TooltipDriver;
  getVisibleActionByDataHookTooltipDriver: (dataHook: string) => TooltipDriver;
  getHiddenActionsPopoverMenuDriver: () => PopoverMenuUniDriver;
  clickVisibleAction: (actionIndex: number) => void;
  clickVisibleActionByDataHook: (actionDataHook: string) => void;
  clickPopoverMenu: () => void;
  clickHiddenAction: (actionIndex: number) => void;
  clickHiddenActionByDataHook: (actionDataHook: string) => void;
}
