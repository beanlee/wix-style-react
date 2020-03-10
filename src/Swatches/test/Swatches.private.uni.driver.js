import { swatchesDriverFactory as publicDriverFactory } from '../Swatches.uni.driver';
import { fillButtonDriverFactory } from '../../FillButton/FillButton.uni.driver';

import { tooltipDriverFactory } from '../../Tooltip/Tooltip.uni.driver';
import testkit from '../../Popover/Popover.uni.driver';
import { CommonDriver } from 'wix-ui-core/dist/src/components/popover/Popover.common.uni.driver';
import { colorPickerUniDriverFactory } from '../../ColorPicker/ColorPicker.private.uni.driver';

import { dataHooks } from '../constants';
import { fillPreviewDriverFactory } from '../../FillPreview/FillPreview.uni.driver';

export const swatchesPrivateDriverFactory = (base, body) => {
  const byHook = dataHook => `[data-hook="${dataHook}"]`;

  const popoverTestkit = testkit(
    base.$(byHook(dataHooks.addButtonPopover)),
    body,
  );

  const commonPopoverTestkit = CommonDriver(
    base.$(byHook(dataHooks.addButtonPopover)),
    body,
  );

  const colorPickerTestkit = async () => {
    const colorPicker = (await commonPopoverTestkit.getContentElement()).$(
      byHook(dataHooks.addButtonColorPicker),
    );
    return colorPickerUniDriverFactory(colorPicker);
  };

  return {
    ...publicDriverFactory(base),
    getEmptySwatch: () =>
      fillPreviewDriverFactory(base.$(`[data-hook="${dataHooks.empty}"]`)),
    getEmptySwatchTooltip: () =>
      tooltipDriverFactory(
        base.$(`[data-hook="${dataHooks.emptyTooltip}"]`),
        body,
      ),
    getAddButton: () =>
      fillButtonDriverFactory(
        base.$(`[data-hook="${dataHooks.addButton}"]`),
        body,
      ),
    isColorPickerShown: () => popoverTestkit.isContentElementExists(),
    clickOutsideColorPicker: () => popoverTestkit.clickOutside(),
    getColorPicker: async () => colorPickerTestkit(),
  };
};
