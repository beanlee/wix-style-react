import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { InputSize, InputStatus } from '../Input';

export interface ColorInputUniDriver extends BaseUniDriver {
  cancel(): Promise<void>;
  confirm(): Promise<void>;
  clickColorViewer(): Promise<void>;
  enterText: (text: string) => Promise<void>;
  getValue(): Promise<string>;
  getPlaceholder(): Promise<string | null>;
  getSize(): Promise<InputSize | null>;
  isDisabled(): Promise<boolean>;
  colorPickerVisible(): Promise<boolean>;

  // Status
  hasStatus(): Promise<boolean>;
  getStatus(): Promise<InputStatus>;
  hasStatusMessage(): Promise<boolean>;
  getStatusMessage(): Promise<string>;
}
