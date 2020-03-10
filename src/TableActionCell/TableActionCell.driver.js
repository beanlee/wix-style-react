import ReactTestUtils from 'react-dom/test-utils';
import { INTERNAL_DRIVER_SYMBOL } from '../../test/utils/private-drivers';
import { popoverMenuTestkitFactory } from '../../testkit';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';
import { dataHooks } from './constants';

const buttonDriverFactory = ({ element }) => {
  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.click(element),
    focus: () => ReactTestUtils.Simulate.focus(element),
    blur: () => ReactTestUtils.Simulate.blur(element),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    getButtonTextContent: () => element.textContent,
    isButtonDisabled: () => element.getAttribute('disabled') === '',
    isPrefixIconExists: () => element.innerHTML.indexOf('prefix') !== -1,
    isSuffixIconExists: () => element.innerHTML.indexOf('suffix') !== -1,
  };
};

const tableActionCellDriverFactory = ({ element, wrapper, eventTrigger }) => {
  const getPrimaryActionPlaceholder = () =>
    element.querySelector('[data-hook="table-action-cell-placeholder"]');
  const getVisibleActionsWrapper = () =>
    element.querySelector('[data-hook="table-action-cell-visible-actions"]');

  const getPrimaryActionButtonDriver = () =>
    buttonDriverFactory({
      element: element.querySelector(
        '[data-hook="table-action-cell-primary-action"] button',
      ),
    });

  const getVisibleActionTooltipDriver = actionIndex =>
    tooltipDriverFactory({
      element: getVisibleActionsWrapper().querySelectorAll(
        '[data-hook="table-action-cell-visible-action-tooltip"]',
      )[actionIndex],
      eventTrigger,
    });

  const getVisibleActionByDataHookTooltipDriver = dataHook =>
    tooltipDriverFactory({
      element: getVisibleActionsWrapper().querySelector(
        `[data-hook="${dataHook}"]`,
      ),
      eventTrigger,
    });

  const getVisibleActionButtonDriver = actionIndex =>
    buttonDriverFactory({
      element: getVisibleActionsWrapper().querySelectorAll('button')[
        actionIndex
      ],
    });

  const getVisibleActionByDataHookButtonDriver = dataHook =>
    buttonDriverFactory({
      element: getVisibleActionsWrapper().querySelector(
        `[data-hook="${dataHook}"]`,
      ),
    });

  const getHiddenActionsPopoverMenuDriver = () =>
    popoverMenuTestkitFactory({
      wrapper,
      dataHook: 'table-action-cell-popover-menu',
    });

  return {
    /** Get the element */
    element: () => element,
    /** Whether the element exists */
    exists: () => !!element,
    /** Get the driver of the primary action <Button/> from the action column */
    getPrimaryActionButtonDriver,
    /** Click the primary action button from the action column */
    clickPrimaryActionButton: () => getPrimaryActionButtonDriver().click(),
    /** Get whether the primary action button is disabled */
    getIsPrimaryActionButtonDisabled: () =>
      getPrimaryActionButtonDriver().isButtonDisabled(),
    /** Get the number of the visible secondary actions */
    getVisibleActionsCount: () => {
      const wrapper = getVisibleActionsWrapper();
      return wrapper ? wrapper.childElementCount : 0;
    },
    /** Get the number of hidden secondary actions (in the <PopoverMenu/>, requires it to be open) */
    getHiddenActionsCount: () =>
      getHiddenActionsPopoverMenuDriver().childrenCount(),
    /** Get the driver of a specific visible secondary action <Tooltip/> */
    getVisibleActionTooltipDriver,
    /** Get the driver of a specific visible secondary action <Tooltip/> by its specified dataHook */
    getVisibleActionByDataHookTooltipDriver,
    /** Get the driver of a specific visible secondary action <Button/> */
    getVisibleActionButtonDriver,
    /** Get the driver of a specific visible secondary action <Button/> by its specified dataHook */
    getVisibleActionByDataHookButtonDriver,
    /** Get the driver of the hidden secondary action <PopoverMenu/> */
    getHiddenActionsPopoverMenuDriver,
    /** Click an a visible secondary action */
    clickVisibleAction: actionIndex =>
      getVisibleActionButtonDriver(actionIndex).click(),
    /** Click an a visible secondary action by its specified dataHook  */
    clickVisibleActionByDataHook: actionDataHook =>
      getVisibleActionByDataHookButtonDriver(actionDataHook).click(),
    /** Click on the hidden secondary actions <PopoverMenu/> */
    clickPopoverMenu: () =>
      getHiddenActionsPopoverMenuDriver()
        .getTriggerElement(dataHooks.triggerElement)
        .click(),
    /** Click on a hidden secondary action (requires the <PopoverMenu/> to be open) */
    clickHiddenAction: actionIndex =>
      getHiddenActionsPopoverMenuDriver().clickAtChild(actionIndex),
    clickHiddenActionByDataHook: actionDataHook =>
      getHiddenActionsPopoverMenuDriver().clickAtChildByDataHook(
        actionDataHook,
      ),

    /* Private driver */
    [INTERNAL_DRIVER_SYMBOL]: {
      /** Whether the primary action placeholder exists */
      primaryActionPlaceholderExists: () => !!getPrimaryActionPlaceholder(),
    },
  };
};

export default tableActionCellDriverFactory;
