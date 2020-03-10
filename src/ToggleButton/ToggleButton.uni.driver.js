import { buttonNextDriverFactory } from 'wix-ui-core/drivers/unidriver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';

export const toggleButtonDriverFactory = (base, body) => {
  const tooltipDriver = tooltipDriverFactory(base, body);

  const buttonBaseElement = base.$('[data-hook="togglebutton-trigger"]');
  const buttonDriver = buttonNextDriverFactory(buttonBaseElement);

  // Not using Omit so that AutoDocs will generate properly
  return {
    /** returns true if component exists */
    exists: buttonDriver.exists,
    /** returns the component element */
    element: buttonDriver.element,
    /** click on the element */
    click: buttonDriver.click,
    /** returns true if button is disabled */
    isButtonDisabled: buttonDriver.isButtonDisabled,
    /** returns skin value, applied to a button */
    getSkin: async () => await buttonBaseElement.attr('data-skin'),
    /** returns true if button is selected */
    isButtonSelected: async () =>
      (await buttonBaseElement.attr('data-selected')) === 'true',
    getTooltipText: async () => tooltipDriver.getTooltipText(),
  };
};
