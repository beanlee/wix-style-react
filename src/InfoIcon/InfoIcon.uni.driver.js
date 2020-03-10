import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { getTooltipDataHook } from './utils';

export const infoIconDriverFactory = (base, body, { dataHook }) => {
  const byHook = targetDataHook => base.$(`[data-hook="${targetDataHook}"]`);
  const getTooltip = () => byHook(getTooltipDataHook(dataHook));

  return {
    ...baseUniDriverFactory(base),

    /** Hover on icon. */
    hover: async () => getTooltip().hover(),

    /** Get size. */
    getSize: async () => base.attr('data-size'),

    /** Get content as a text value. */
    getContent: async () => {
      const tooltipDriver = tooltipDriverFactory(getTooltip(), body);
      return tooltipDriver.getTooltipText();
    },
  };
};
