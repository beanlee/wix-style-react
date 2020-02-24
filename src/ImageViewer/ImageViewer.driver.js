import addItemDriverFactory from '../AddItem/AddItem.driver';
import { tooltipTestkitFactory } from 'wix-ui-core/dist/src/testkit';
import { dataAttributes, dataHooks } from './constants';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';

const imageViewerDriverFactory = ({ element, wrapper, eventTrigger }) => {
  const byHook = dataHook => element.querySelector(`[data-hook="${dataHook}"]`);

  const hasDataAttribute = (dataAttr, el) =>
    el.getAttribute(dataAttr) === 'true';

  const addItemDriver = addItemDriverFactory({
    element: byHook(dataHooks.addItem),
    eventTrigger,
  });

  const tooltipTestkit = dataHook =>
    tooltipTestkitFactory({
      wrapper: element,
      dataHook,
    });

  const getImageElement = () => byHook(dataHooks.image);
  const getPreviousImageElement = () => byHook(dataHooks.previousImage);

  const isImagesContainerElementVisible = () =>
    hasDataAttribute(
      dataAttributes.containerVisible,
      byHook(dataHooks.imagesContainer),
    );
  const isImageElementVisible = imgElement =>
    hasDataAttribute(dataAttributes.imageVisible, imgElement);

  const hoverElement = () => eventTrigger.mouseOver(element);
  const showButtons = hoverElement;

  return {
    exists: () => !!element,
    getElement: () => element, // for backward compatibility
    element: () => element, // same as unidriver language
    updateExists: () => !!byHook(dataHooks.update),
    updateButtonExists: () => !!byHook(dataHooks.update),
    removeButtonExists: () => !!byHook(dataHooks.remove),
    clickAdd: () => addItemDriver.click(),
    clickUpdate: () => {
      showButtons();
      eventTrigger.click(byHook(dataHooks.update));
    },
    clickRemove: () => {
      showButtons();
      eventTrigger.click(byHook(dataHooks.remove));
    },
    getContainerStyles: () => element.getAttribute('style'),
    getAddTooltipContent: () => addItemDriver.getTooltipContent(),
    getUpdateTooltipContent: () => {
      const updateTooltip = tooltipTestkit(dataHooks.updateTooltip);
      showButtons();
      updateTooltip.mouseEnter();
      return updateTooltip.getContentElement().textContent;
    },
    getRemoveTooltipContent: () => {
      const removeTooltip = tooltipTestkit(dataHooks.removeTooltip);
      showButtons();
      removeTooltip.mouseEnter();
      return removeTooltip.getContentElement().textContent;
    },
    isDisabled: () => element.getAttribute('data-disabled') === 'true',
    isAddItemVisible: () => !!byHook(dataHooks.addItem),
    isLoaderVisible: () => !!byHook(dataHooks.loader),
    isImageLoaded: () => hasDataAttribute(dataAttributes.imageLoaded, element),
    isImageVisible: () => {
      const image = getImageElement();
      return (
        !!image &&
        isImageElementVisible(image) &&
        isImagesContainerElementVisible()
      );
    },
    isPreviousImageVisible: () => {
      const previousImage = getPreviousImageElement();
      return (
        !!previousImage &&
        isImageElementVisible(previousImage) &&
        isImagesContainerElementVisible()
      );
    },
    getImageUrl: () => {
      const imageUrl = getImageElement();
      return imageUrl && imageUrl.getAttribute('src');
    },
    getPreviousImageUrl: () => {
      const previousImage = getPreviousImageElement();
      return previousImage && previousImage.getAttribute('src');
    },
    hover: () => hoverElement(),

    // Status
    /** Return true if there's a status */
    hasStatus: () =>
      !!element.querySelector(`[data-hook='${dataHooks.errorTooltip}']`),
    /** If there's a status, returns its type */
    getStatus: () =>
      element
        .querySelector(`[data-hook='${dataHooks.errorTooltip}']`)
        .getAttribute('data-status'),
    /** Return true if there's a status message */
    hasStatusMessage: () =>
      !!element.querySelector(`[data-hook='status-indicator-tooltip']`),
    /** If there's a status message, returns its text value */
    getStatusMessage: () => {
      const tooltipDriver = tooltipDriverFactory({
        element: element.querySelector(
          `[data-hook='status-indicator-tooltip']`,
        ),
        wrapper,
        eventTrigger,
      });

      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().textContent;
    },
  };
};

export default imageViewerDriverFactory;
