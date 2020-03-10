import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';

const getTextElement = element => element.$(`[data-hook="loader-text"]`);

export const loaderUniDriverFactory = (base, body) => {
  const tooltipSelector = '[data-hook="loader-tooltip"]';
  const tooltipTestkit = tooltipDriverFactory(base.$(tooltipSelector), body);
  return {
    ...baseUniDriverFactory(base),
    /** @deprecated Should be private */
    component: () => base.getNative(), // eslint-disable-line no-restricted-properties

    /** returns the loader color ('blue' or 'white') */
    getColor: async () => ((await base.hasClass('blue')) ? 'blue' : 'white'),

    /** returns the element text */
    getText: () => getTextElement(base).text(),
    /** true if the element has text */
    hasText: () => getTextElement(base).exists(),

    /** true when using the large loader */
    isLarge: () => base.hasClass('large'),

    /** true when using the medium loader */
    isMedium: () => base.hasClass('medium'),

    /** true when using the small loader */
    isSmall: () => base.hasClass('small'),

    /** true when using the tiny loader */
    isTiny: () => base.hasClass('tiny'),

    /** true when loader is in loading status */
    isLoading: () => base.hasClass('loading'),

    /** true when loader is in error status */
    isError: () => base.hasClass('error'),

    /** true when loader is in success status */
    isSuccess: () => base.hasClass('success'),

    /** trigger the tooltip and returns the value of the tooltip message (async function) */
    getStatusMessage: () => {
      tooltipTestkit.mouseEnter();
      return tooltipTestkit.getTooltipText();
    },
  };
};
