import { UniDriver } from '@unidriver/core';
import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface PopoverMenuUniDriver extends BaseUniDriver {
  exists(): Promise<boolean>;
  getTriggerElement(dataHook: string): UniDriver;
  clickAtChild: (index: number) => Promise<void>;
  clickAtChildByDataHook: (dataHook: string) => Promise<void>;
  isMenuOpen(): Promise<boolean>;
  childrenCount(): Promise<number>;
}
