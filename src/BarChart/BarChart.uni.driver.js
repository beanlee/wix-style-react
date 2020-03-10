import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import DataHooks from './dataHooks';
import { findBaseByHook } from '../../test/utils';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { adaptiveHeadingDriverFactory } from '../utils/AdaptiveHeading/AdaptiveHeading.uni.driver';

const barChartDriverFactory = (base, body) => {
  const getHookSelector = hook => `[data-hook="${hook}"]`;

  const getItem = async index =>
    base.$$(getHookSelector(DataHooks.bar)).get(index);

  const getTooltipDriver = async index => {
    const item = await getItem(index);

    const tooltip = await item.$(getHookSelector(DataHooks.tooltip));

    return tooltipDriverFactory(tooltip, body);
  };

  const getAdaptiveHeadingDriver = async index => {
    const item = await getItem(index);
    const heading = await item.$(getHookSelector(DataHooks.value));

    return adaptiveHeadingDriverFactory(heading);
  };

  return {
    ...baseUniDriverFactory(base),
    /** Get number of items */
    getItemsCount: async () =>
      await base.$$(getHookSelector(DataHooks.bar)).count(),

    /** Get text of the value */
    getValue: async index => {
      const heading = await getAdaptiveHeadingDriver(index);

      return heading.getText();
    },

    /** Get text of the short value */
    getValueInShort: async index => {
      const heading = await getAdaptiveHeadingDriver(index);

      return heading.getShortText();
    },

    /** Get the text of the description */
    getDescription: async index =>
      findBaseByHook(await getItem(index), DataHooks.description).text(),

    /** Get the text of the info tooltip */
    getDescriptionInfo: async index => {
      const tooltip = await getTooltipDriver(index);

      if (!(await tooltip.exists())) {
        return null;
      }

      await tooltip.mouseEnter();

      const text = await tooltip.getTooltipText();

      await tooltip.mouseLeave();

      return text;
    },
  };
};

export default barChartDriverFactory;
