import { LinearProgressBarUniDriver as CoreLinearProgressBarUniDriver } from 'wix-ui-core/drivers/unidriver';

export interface LinearProgressBarUniDriver
  extends CoreLinearProgressBarUniDriver {
  isErrorIconShown: () => Promise<boolean>;
  isSuccessIconShown: () => Promise<boolean>;
  getTooltipErrorMessage: () => Promise<string>;
}
