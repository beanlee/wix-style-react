import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { ReactBase } from '../../test/utils/unidriver';
import DATA_ATTR from './DataAttr';

export const testkit = base => {
  // single $ throws an exception for more than 1 match, so we use the first matching result with $$
  // to support cases of multiple inputs, e.g cases where this driver is used inside other drivers with popovers
  // which includes an input
  const input = base.$$('input').get(0);

  const reactBase = ReactBase(base);
  const reactBaseInput = ReactBase(input);

  const clearButtonNode = base.$(`[data-hook=input-clear-button]`);
  const menuArrowNode = base.$(`.menuArrow`);

  const driver = {
    ...baseUniDriverFactory(base),
    click: () => input.click(),
    getInputElementClasses: async () =>
      await reactBaseInput._DEPRECATED_getClassList(),
    suffixComponentExists: async className =>
      await base.$(`.suffix ${className}`).exists(),
    getRootElementClasses: async () =>
      await reactBase._DEPRECATED_getClassList(),
    getAriaDescribedby: async () => await input.attr('aria-describedby'),
    getAriaLabel: async () => await input.attr('aria-label'),
    getName: async () => await input.attr('name'),
    getMaxLength: async () => await input.attr('maxLength'),
    getType: async () => await input.attr('type'),
    getAriaControls: async () => await input.attr('aria-controls'),
    clickIconAffix: async () =>
      await base.$(`[data-hook="icon-affix"]`).click(),
    clickCustomAffix: async () =>
      await base.$(`[data-hook="custom-affix"]`).click(),
    isMenuArrowLast: async () => {
      const selector = `.suffixes .suffix:last-child > .menuArrow`;
      return (await base.$$(selector).count()) === 1;
    },
    hasSuffixesClass: async () =>
      (await base.$$(`.input.withSuffixes`).count()) === 1,
    hasSuffixClass: async () =>
      (await base.$$(`.input.withSuffix`).count()) === 1,
    hasSuffix: async () => await base.$(`.suffix`).exists(),
    hasPrefixClass: async () =>
      (await base.$$(`.input.withPrefix`).count()) === 1,
    prefixComponentExists: async style =>
      (await base.$$(`.prefix ${style}`).count()) === 1,
    hasPrefix: async () => (await base.$$(`.prefix`).count()) === 1,
    hasClearButton: async () => await clearButtonNode.exists(),
    clickClear: async () => await clearButtonNode.click(),
    getValue: async () => await input.value(),
    getText: async () => await input.value(),
    getPattern: async () => await input.attr('pattern'),
    getPlaceholder: async () => await input.attr('placeholder'),
    isOfStyle: async style => await base.hasClass(`theme-${style}`),
    isOfSize: async size => await base.hasClass(`size-${size}`),
    getSize: async () => await base.attr(DATA_ATTR.DATA_SIZE),
    isDisabled: async () => await base.hasClass('disabled'),
    isHoveredStyle: async () => await base.hasClass('hasHover'),
    isFocusedStyle: async () => await base.hasClass('hasFocus'),
    getRequired: async () => await input._prop('required'),
    enterText: async value => await input.enterValue(value),
    getAutocomplete: async () => await input.attr('autocomplete'),
    getDefaultValue: async () => await input._prop('defaultValue'),
    getTabIndex: async () => await input._prop('tabIndex'),
    isCustomInput: async () =>
      (await input.attr('data-hook')) === 'wsr-custom-input',
    getReadOnly: async () => await input._prop('readOnly'),
    getDisabled: async () => await input._prop('disabled'),
    getTextOverflow: async () => (await input._prop('style'))['text-overflow'],
    hasExclamation: async () => await base.$(`.exclamation`).exists(),
    hasError: async () => await base.hasClass('hasError'),
    hasWarning: async () => await base.hasClass('hasWarning'),
    hasLoader: async () => {
      // There actually should be only 1  element with `.loaderContainer`, this is a component bug that there are actually 2.
      return (await base.$$(`.loaderContainer`).count()) > 0;
    },

    focus: async () => await reactBaseInput.focus(),
    blur: async () => await reactBaseInput.blur(),
    keyUp: async () => await reactBaseInput.keyUp(),
    keyDown: async eventData => await reactBaseInput.keyDown(eventData),
    paste: async () => await reactBaseInput.paste(),
    trigger: async (value, event) => {
      if (value === 'focus') {
        return await driver.focus();
      }
      if (value === 'blur') {
        return await driver.blur();
      }
      if (value === 'keyUp') {
        return await driver.keyUp();
      }
      if (value === 'keyDown') {
        return await driver.keyDown(event);
      }
      if (value === 'paste') {
        return await driver.paste();
      }
      if (value === 'change') {
        return await driver.enterText(value);
      }
    },
    isFocus: async () => await reactBaseInput.isFocus(),
    hasHelp: async () => await base.$('.help').exists(),
    clickMenuArrow: async () => await menuArrowNode.click(),
    hasMenuArrow: async () => await menuArrowNode.exists(),
    isNarrowError: async () => await base.$(`.narrow`).exists(),
    isRTL: async () => await base.hasClass('rtl'),
    getCursorLocation: async () => await input._prop('selectionStart'),
    clearText: () => driver.enterText(''),
    clickOutside: () => ReactBase.clickDocument(),
  };

  return driver;
};

export default testkit;
