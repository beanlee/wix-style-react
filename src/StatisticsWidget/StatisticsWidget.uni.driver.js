import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { findBaseByHook } from '../../test/utils';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { adaptiveHeadingDriverFactory } from '../utils/AdaptiveHeading/AdaptiveHeading.uni.driver';

import DataHooks from './dataHooks';
import DataAttrs from './dataAttrs';

const statisticsWidgetDriverFactory = (base, body) => {
  const getHookSelector = hook => `[data-hook="${hook}"]`;
  const getStatsItem = async index =>
    base.$$(getHookSelector(DataHooks.stat)).get(index);

  const getTooltipDriver = async index => {
    const item = await getStatsItem(index);
    const tooltip = await item.$(getHookSelector(DataHooks.tooltip));

    return tooltipDriverFactory(tooltip, body);
  };

  const getAdaptiveHeadingDriver = async index => {
    const item = await getStatsItem(index);
    const heading = await item.$(getHookSelector(DataHooks.value));

    return adaptiveHeadingDriverFactory(heading);
  };

  const getStatsPartText = async (index, hook) => {
    const node = findBaseByHook(await getStatsItem(index), hook);

    if (!(await node.exists())) {
      return null;
    }

    return await node.text();
  };

  return {
    ...baseUniDriverFactory(base),
    /** Get number of items */
    getItemsCount: async () =>
      await base.$$(getHookSelector(DataHooks.stat)).count(),

    /** Click on the statistic with index */
    clickStatistics: async index => {
      const item = await getStatsItem(index);

      return item.click();
    },

    /** Get value of the statistic with index */
    getValue: async index => {
      const heading = await getAdaptiveHeadingDriver(index);

      return heading.getText();
    },

    /** Get short value of the stat with index */
    getValueInShort: async index => {
      const heading = await getAdaptiveHeadingDriver(index);

      return heading.getShortText();
    },

    /** Get description of the statistic with index */
    getDescription: async index =>
      getStatsPartText(index, DataHooks.description),

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

    /** Get children in section by hook */
    getChildren: async (index, hook) => {
      return findBaseByHook(await getStatsItem(index), hook);
    },

    /** Get percentage of the statistic with index */
    getPercentage: async index => {
      const percents = await getStatsPartText(index, DataHooks.percentage);

      return percents ? Number(percents.split('%')[0]) : percents;
    },

    /** Returns true if invertedPercentage set to true */
    isPercentageInverted: async index => {
      const item = await getStatsItem(index);
      const percentage = await item
        .$(getHookSelector(DataHooks.percentage))
        .attr(DataAttrs.invertedPercentage);

      // Quick way to parse text to boolean
      return JSON.parse(percentage);
    },
  };
};

export default statisticsWidgetDriverFactory;
