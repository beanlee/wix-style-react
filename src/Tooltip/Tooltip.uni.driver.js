import { tooltipDriverFactory as tooltipDriverFactoryCore } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.uni.driver';
import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const tooltipDriverFactory = (base, body) => {
  const coreTooltipDriver = tooltipDriverFactoryCore(base, body);
  return {
    ...baseUniDriverFactory(base),

    /** returns true if trigger element exists on the DOM */
    exists: coreTooltipDriver.exists,

    /** returns true if tooltip element exists on the DOM */
    tooltipExists: coreTooltipDriver.tooltipExists,

    /** mouse over the target element */
    mouseEnter: coreTooltipDriver.mouseEnter,

    /** mouse leaves the target element */
    mouseLeave: coreTooltipDriver.mouseLeave,

    /** returns tooltips content value in string */
    getTooltipText: coreTooltipDriver.getTooltipText,

    /** Clicks outside the tooltip element in order to dismiss it */
    clickOutside: coreTooltipDriver.clickOutside,
  };
};
