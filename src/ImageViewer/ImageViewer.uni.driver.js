import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { iconButtonDriverFactory } from '../IconButton/IconButton.uni.driver';
import { addItemUniDriverFactory } from '../AddItem/AddItem.uni.driver';
import { tooltipDriverFactory } from '../Tooltip/TooltipNext/Tooltip.uni.driver';
import { dataAttributes, dataHooks } from './constants';
import { statusIndicatorDriverFactory } from '../StatusIndicator/StatusIndicator.uni.driver';

export const imageViewerUniDriverFactory = (base, body) => {
  const find = dataHook => base.$(`[data-hook="${dataHook}"]`);
  const hasDataAttribute = async (dataAttr, el) =>
    (await el.attr(dataAttr)) === 'true';

  const hoverElement = () => base.hover();
  const showButtons = hoverElement;
  const isImagesContainerElementVisible = () =>
    hasDataAttribute(
      dataAttributes.containerVisible,
      find(dataHooks.imagesContainer),
    );
  const isImageElementVisible = imgElement =>
    hasDataAttribute(dataAttributes.imageVisible, imgElement);

  const addItemTestkit = addItemUniDriverFactory(find(dataHooks.addItem), body);
  const tooltipTestkit = dataHook => tooltipDriverFactory(find(dataHook), body);
  const iconButtonTestkit = dataHook => iconButtonDriverFactory(find(dataHook));
  const removeIconButton = iconButtonTestkit(dataHooks.remove);
  const updateIconButton = iconButtonTestkit(dataHooks.update);
  const updateTooltip = tooltipTestkit(dataHooks.updateTooltip);
  const removeTooltip = tooltipTestkit(dataHooks.removeTooltip);

  const statusIndicatorTestkit = () =>
    statusIndicatorDriverFactory(
      base.$(`[data-hook="${dataHooks.errorTooltip}"]`),
      body,
    );

  return {
    ...baseUniDriverFactory(base),
    updateExists: () => !!find(dataHooks.update),
    updateButtonExists: () => updateIconButton.exists(),
    removeButtonExists: () => removeIconButton.exists(),
    clickAdd: () => addItemTestkit.click(),
    clickUpdate: () => showButtons().then(() => updateIconButton.click()),
    clickRemove: () => showButtons().then(() => removeIconButton.click()),
    getContainerStyles: () => base.attr('style'),
    getAddTooltipContent: () => addItemTestkit.getTooltipContent(),
    getUpdateTooltipContent: () => updateTooltip.getTooltipText(),
    getRemoveTooltipContent: () => removeTooltip.getTooltipText(),
    isDisabled: () =>
      base.attr(dataAttributes.disabled).then(x => x === 'true'),
    isAddItemVisible: () => find(dataHooks.addItem).exists(),
    isLoaderVisible: () => find(dataHooks.loader).exists(),
    isImageLoaded: () => base.$('[data-was-image-loaded]').exists(),
    isImageVisible: async () => {
      const image = find(dataHooks.image);

      return (
        (await image.exists()) &&
        !!(await image.attr('src')) &&
        (await isImageElementVisible(image)) &&
        (await isImagesContainerElementVisible())
      );
    },
    isPreviousImageVisible: async () => {
      const previousImage = find(dataHooks.previousImage);

      return (
        (await previousImage.exists()) &&
        !!(await previousImage.attr('src')) &&
        (await isImageElementVisible(previousImage)) &&
        (await isImagesContainerElementVisible())
      );
    },
    getImageUrl: async () => {
      const image = find(dataHooks.image);
      return (await image.exists()) && (await image.attr('src'));
    },
    getPreviousImageUrl: async () => {
      const previousImage = find(dataHooks.previousImage);
      return (
        (await previousImage.exists()) && (await previousImage.attr('src'))
      );
    },
    hover: hoverElement,

    // Status
    /** Return true if there's a status */
    hasStatus: () => statusIndicatorTestkit().exists(),
    /** If there's a status, returns its type */
    getStatus: () => statusIndicatorTestkit().getStatus(),
    /** Return true if there's a status message */
    hasStatusMessage: () => statusIndicatorTestkit().hasMessage(),
    /** If there's a status message, returns its text value */
    getStatusMessage: () => statusIndicatorTestkit().getMessage(),
  };
};
