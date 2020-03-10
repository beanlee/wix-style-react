import { checkboxUniDriverFactory as publicUniDriverFactory } from '../Checkbox.uni.driver';
import { tooltipDriverFactory } from '../../Tooltip/Tooltip.uni.driver';
import { dataHooks } from '../constants';

export const checkboxUniDriverFactory = (base, body) => {
  return {
    ...publicUniDriverFactory(base, body),

    hoverInput: async () => {
      const tooltipDriver = await tooltipDriverFactory(
        base.$(`[data-hook="${dataHooks.boxTooltip}"]`),
        body,
      );
      return tooltipDriver.mouseEnter();
    },
  };
};
