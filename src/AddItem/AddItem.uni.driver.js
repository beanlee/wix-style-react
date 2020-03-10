import { textUniDriverFactory } from '../Text/Text.uni.driver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/unidriver';
import { dataHooks } from './constants';

export const addItemUniDriverFactory = (base, body) => {
  const tooltipSelector = `[data-hook*="${dataHooks.itemTooltip}"]`;
  const textSelector = `[data-hook*="${dataHooks.itemText}"]`;
  const tooltipDriver = tooltipDriverFactory(base.$(tooltipSelector), body);
  const textDriver = textUniDriverFactory(base.$(textSelector));

  return {
    ...baseUniDriverFactory(base),
    /** returns value of action text */
    getText: () => textDriver.getText(),
    /** true if passed children in string exists */
    textExists: () => textDriver.exists(),
    /** returns value of tooltip content */
    getTooltipContent: () => tooltipDriver.getTooltipText(),
  };
};
