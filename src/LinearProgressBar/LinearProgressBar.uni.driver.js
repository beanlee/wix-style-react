import { dataHooks } from './constants';
import { linearProgressBarUniDriverFactory as coreLinearProgressBarUniDriverFactory } from 'wix-ui-core/drivers/unidriver';
import { statusIndicatorDriverFactory } from '../StatusIndicator/StatusIndicator.uni.driver';

export const linearProgressBarDriverFactory = (base, body) => {
  const statusIndicatorTestkit = () =>
    statusIndicatorDriverFactory(
      base.$(`[data-hook="${dataHooks.errorIcon}"]`),
      body,
    );

  const coreProgressBarDriver = coreLinearProgressBarUniDriverFactory(base);

  return {
    ...coreProgressBarDriver,

    /** Checks whether error icon is shown */
    isErrorIconShown: () =>
      base.$(`[data-hook=${dataHooks.errorIcon}]`).exists(),

    /** Checks whether success icon is shown */
    isSuccessIconShown: () =>
      base.$(`[data-hook=${dataHooks.successIcon}]`).exists(),

    /** Returns the tooltip error message */
    getTooltipErrorMessage: statusIndicatorTestkit().getMessage,

    /** Returns the linear progress bar skin */
    getSkin: () => base.attr('data-skin'),
  };
};
