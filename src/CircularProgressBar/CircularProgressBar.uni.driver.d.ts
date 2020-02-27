import { CircularProgressBarUniDriver as CircularProgressBarUniDriverCore } from 'wix-ui-core/drivers/unidriver';
import { CircularProgressBarSize } from './index';

export interface CircularProgressBarUniDriver
  extends CircularProgressBarUniDriverCore {
  isErrorIconShown: () => Promise<boolean>;
  isSuccessIconShown: () => Promise<boolean>;
  getSize: () => Promise<CircularProgressBarSize>;
  getTooltipErrorMessage: () => Promise<any>;
}
