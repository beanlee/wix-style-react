import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { SyntheticEventData, Simulate } from 'react-dom/test-utils';
import { InputAreaTheme } from './index';
import { UniDriver } from 'wix-ui-test-utils/unidriver';

export interface InputAreaUniDriver extends BaseUniDriver {
  trigger: (trigger: keyof typeof Simulate, event: SyntheticEventData) => Promise<void>;
  focus: () => Promise<void>;
  enterText: (text: string) => Promise<string>;
  getValue: () => Promise<string>;
  getName: () => Promise<string | null>;
  getPlaceholder: () => Promise<any>;
  getDefaultValue: () => Promise<any>;
  getRowsCount: () => Promise<any>;
  getMaxLength: () => Promise<any>;
  getTabIndex: () => Promise<any>;
  getReadOnly: () => Promise<any>;
  getResizable: () => Promise<boolean>;
  getDisabled: () => Promise<boolean>;
  getHasCounter: () => Promise<boolean>;
  getCounterValue: () => Promise<string>;
  hasExclamation: () => Promise<boolean>;
  hasError: () => Promise<boolean>;
  isFocusedStyle: () => Promise<boolean>;
  isSizeSmall: () => Promise<boolean>;
  isHoveredStyle: () => Promise<boolean>;
  isOfStyle: (style: InputAreaTheme) => Promise<boolean>;
  isFocus: () => Promise<boolean>;
  getStyle: () => Promise<any>;
  getAriaLabel: () => Promise<string | null>;
  getAriaControls: () => Promise<string | null>;
  getAriaDescribedby: () => Promise<string | null>;
  getTooltipDataHook: () => string;
  getTooltipElement: () => UniDriver;
  isErrorMessageShown: () => Promise<boolean>;
  getErrorMessage: () => Promise<string>;
}
