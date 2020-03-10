import { ElementHandle } from 'puppeteer';

export interface FormFieldPuppeteerDriver {
  element: () => ElementHandle;
  getLabelValue: () => Promise<string>;
  isRequired: () => Promise<boolean>;
}
