import { CircularProgressBarDriver as CircularProgressBarDriverCore } from 'wix-ui-core/drivers/vanilla';
import { CircularProgressBarSize } from './index';

export interface CircularProgressBarDriver
  extends CircularProgressBarDriverCore {
  isErrorIconShown: () => boolean;
  isSuccessIconShown: () => boolean;
  getSize: () => CircularProgressBarSize;
  getTooltipErrorMessage: () => string;
}
