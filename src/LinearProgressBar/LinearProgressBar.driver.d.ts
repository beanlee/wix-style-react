import { LinearProgressBarDriver as LinearProgressBarDriverCore } from 'wix-ui-core/drivers/vanilla';

export interface LinearProgressBarDriver extends LinearProgressBarDriverCore {
  isErrorIconShown: () => boolean;
  isSuccessIconShown: () => boolean;
  getTooltipErrorMessage: () => string;
}
