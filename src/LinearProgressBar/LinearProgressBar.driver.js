import { linearProgressBarDriverFactory as coreLinearProgressBarDriverFactory } from 'wix-ui-core/drivers/vanilla';
import { dataHooks } from './constants';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';

const linearProgressBarDriverFactory = ({ element, eventTrigger, wrapper }) => {
  const coreProgressBarDriver = coreLinearProgressBarDriverFactory({
    element,
    wrapper,
    eventTrigger,
  });

  const tooltipDriver = tooltipDriverFactory({
    element: element.querySelector(`[data-hook='status-indicator-tooltip']`),
    wrapper,
    eventTrigger,
  });

  return {
    ...coreProgressBarDriver,
    isErrorIconShown: () =>
      !!element.querySelector(`[data-hook='${dataHooks.errorIcon}']`),
    isSuccessIconShown: () =>
      !!element.querySelector(`[data-hook='${dataHooks.successIcon}']`),
    getTooltipErrorMessage: () => {
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().textContent;
    },
    getSkin: () => element.getAttribute('data-skin'),
  };
};

export default linearProgressBarDriverFactory;
