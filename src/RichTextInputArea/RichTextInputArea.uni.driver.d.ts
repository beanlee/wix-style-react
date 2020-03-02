import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { RichTextInputAreaStatus } from './index';

export interface RichTextInputAreaUniDriver extends BaseUniDriver {
  isDisabled: () => Promise<boolean>;
  getContent: () => Promise<string>;
  getPlaceholder: () => Promise<string | null>;
  enterText: (value: string) => Promise<void>;

  // Status
  hasStatus: () => Promise<boolean>;
  getStatus: () => Promise<RichTextInputAreaStatus>;
  hasStatusMessage: () => Promise<boolean>;
  getStatusMessage: () => Promise<string>;
}
