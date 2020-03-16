import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';

export interface TimeInputUniDriver extends BaseUniDriver {
  getValue: () => Promise<string>;
  isDisabled: () => Promise<boolean>;
  clickTickerUp: () => Promise<void>;
  clickTickerDown: () => Promise<void>;
  isAmPmIndicatorExist: () => Promise<boolean>;
  toggleAmPmIndicator: () => Promise<void>;
  getAmPmIndicatorText: () => Promise<string>;
  getCustomSuffix: () => Promise<string>;
  isRtl: () => Promise<boolean>;
  setValue: (text: string) => Promise<void>;
  blur: () => Promise<void>;
}
