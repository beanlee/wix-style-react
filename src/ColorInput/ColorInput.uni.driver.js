import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import inputUniDriverFactory from '../Input/Input.uni.driver.js';
import { colorPickerUniDriverFactory } from '../ColorPicker/ColorPicker.uni.driver.js';
import DATA_HOOKS from './DataHooks';

export const colorInputDriverFactory = (base, body) => {
  const inputTestkit = inputUniDriverFactory(base, body);
  const colorPickerTestkit = colorPickerUniDriverFactory(
    base.$(`[data-hook="${DATA_HOOKS.COLOR_INPUT_COLOR_PICKER}"]`),
  );

  return {
    ...baseUniDriverFactory(base),

    /** Cancels color selection */
    cancel: () => colorPickerTestkit.cancel(),

    /** Confirms color selection */
    confirm: () => colorPickerTestkit.confirm(),

    /** Clicks on color viewer box */
    clickColorViewer: async () =>
      base.$(`[data-hook="${DATA_HOOKS.COLOR_INPUT_VIEWER}"]`).click(),

    /** Enters text to color input */
    enterText: async text => {
      await inputTestkit.click();
      await inputTestkit.enterText(text);
    },

    /** Returns the input value */
    getValue: () => inputTestkit.getValue(),

    /** Returns the placeholder of the input */
    getPlaceholder: () => inputTestkit.getPlaceholder(),

    /** Return whether the input size */
    getSize: () => inputTestkit.getSize(),

    /** Returns whether the input is disabled */
    isDisabled: () => inputTestkit.isDisabled(),

    /** Returns whether the color picker is visible  */
    colorPickerVisible: () => colorPickerTestkit.exists(),

    /** Clicks on input */
    click: () => inputTestkit.click(),

    // Status
    /** Return true if there's a status */
    hasStatus: inputTestkit.hasStatus,
    /** If there's a status, returns its type */
    getStatus: inputTestkit.getStatus,
    /** Return true if there's a status message */
    hasStatusMessage: inputTestkit.hasStatusMessage,
    /** If there's a status message, returns its text value */
    getStatusMessage: inputTestkit.getStatusMessage,
  };
};

export default colorInputDriverFactory;
