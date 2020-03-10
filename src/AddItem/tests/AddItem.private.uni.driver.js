import { addItemUniDriverFactory as publicDriverFactory } from '../AddItem.uni.driver';
import { tooltipDriverFactory } from '../../Tooltip/Tooltip.uni.driver';
import { dataHooks } from '../constants';

export const addItemPrivateUniDriverFactory = base => {
  const tooltipSelector = `[data-hook*="${dataHooks.itemTooltip}"]`;
  const tooltipDriver = tooltipDriverFactory(base.$(tooltipSelector));
  return {
    ...publicDriverFactory(base),
    tooltipElementExists: () => tooltipDriver.exists(),
    mouseEnter: () => tooltipDriver.mouseEnter(),
    getTooltipText: () => tooltipDriver.getTooltipText(),
  };
};
