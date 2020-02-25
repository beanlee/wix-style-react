import { BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { PopoverMenuDriver } from '../PopoverMenu/PopoverMenu.driver';
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
  getHiddenActionsPopoverMenuDriver: () => PopoverMenuDriver;
  clickVisibleAction: (actionIndex: number) => void;
  clickVisibleActionByDataHook: (actionDataHook: string) => void;
  clickPopoverMenu: () => void;
  clickHiddenAction: (actionIndex: number) => void;
  clickHiddenActionByDataHook: (actionDataHook: string) => void;
}
