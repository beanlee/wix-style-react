import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { tooltipDriverFactory } from '../Tooltip/TooltipNext/Tooltip.uni.driver';
import { dataHooks } from './constants';

export const statusIndicatorDriverFactory = (base, body) => {
  const tooltipDriver = tooltipDriverFactory(
    base.$(`[data-hook="${dataHooks.tooltip}"]`),
    body,
  );

  return {
    ...baseUniDriverFactory(base, body),

    /** Returns the type of the status oneOf(error, warning, loading) */
    getStatus: () => base.attr('data-status'),

    /** Returns true iff a message was provided */
    hasMessage: tooltipDriver.exists,

    /** Returns the message text */
    getMessage: async () => {
      if (await tooltipDriver.exists()) {
        await tooltipDriver.mouseEnter();
        return await tooltipDriver.getTooltipText();
      } else {
        throw new Error(`Message was not provided`);
      }
    },
  };
};
