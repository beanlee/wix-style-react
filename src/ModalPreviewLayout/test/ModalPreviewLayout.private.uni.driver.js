import { modalPreviewLayoutDriverFactory as publicDriverFactory } from '../ModalPreviewLayout.uni.driver';
import { dataHooks } from '../constants';
import { tooltipDriverFactory } from '../../Tooltip/Tooltip.uni.driver';

export const modalPreviewLayoutPrivateDriverFactory = (base, body) => {
  const rightArrow = base.$(
    `[data-hook="${dataHooks.modalPreviewRightArrow}"]`,
  );
  const leftArrow = base.$(`[data-hook="${dataHooks.modalPreviewLeftArrow}"]`);

  const getTooltipDriver = dataHook => {
    const element = base.$(`[data-hook="${dataHook}"]`);
    return tooltipDriverFactory(element, body);
  };

  const nextTooltipDriver = getTooltipDriver(
    dataHooks.nextNavigationButtonTooltip,
  );

  const prevTooltipDriver = getTooltipDriver(
    dataHooks.prevNavigationButtonTooltip,
  );
  const closeButtonTooltipDriver = getTooltipDriver(
    dataHooks.closeButtonTooltip,
  );

  return {
    ...publicDriverFactory(base),

    clickRightNavigationButton: () => rightArrow.click(),

    clickLeftNavigationButton: () => leftArrow.click(),

    hoverCloseButton: () => closeButtonTooltipDriver.mouseEnter(),

    hoverRightNavigationButton: () => nextTooltipDriver.mouseEnter(),

    hoverLeftNavigationButton: () => prevTooltipDriver.mouseEnter(),

    getCloseButtonTooltipText: () => closeButtonTooltipDriver.getTooltipText(),

    getRightNavigationButtonTooltipText: () =>
      nextTooltipDriver.getTooltipText(),

    getLeftNavigationButtonTooltipText: () =>
      prevTooltipDriver.getTooltipText(),
  };
};
