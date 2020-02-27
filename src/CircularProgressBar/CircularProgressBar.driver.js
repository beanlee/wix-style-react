import { circularProgressBarDriverFactory as coreCircularProgressBarDriverFactory } from 'wix-ui-core/drivers/vanilla';
import { tooltipDriverFactory } from 'wix-ui-backoffice/dist/src/components/Tooltip/Tooltip.driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from './CircularProgressBar.st.css';
import { dataHooks } from './constants';

export const circularProgressBarDriverFactory = ({
  element,
  eventTrigger,
  wrapper,
}) => {
  const tooltipDriver = tooltipDriverFactory({
    element: element.querySelector(`[data-hook='${dataHooks.tooltip}']`),
    wrapper,
    eventTrigger,
  });

  const coreProgressBarDriver = coreCircularProgressBarDriverFactory({
    element,
    wrapper,
    eventTrigger,
  });
  const progressBar = () =>
    element.querySelector(`[data-hook='${dataHooks.circularProgressBar}']`);
  const stylableDOMUtil = new StylableDOMUtil(style, element);

  return {
    ...coreProgressBarDriver,
    isErrorIconShown: () =>
      !!element.querySelector(`[data-hook='${dataHooks.errorIcon}']`),
    isSuccessIconShown: () =>
      !!element.querySelector(`[data-hook='${dataHooks.successIcon}']`),
    getSize: () => stylableDOMUtil.getStyleState(progressBar(), 'size'),
    getTooltipErrorMessage: () => {
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().textContent;
    },
  };
};

export default circularProgressBarDriverFactory;
