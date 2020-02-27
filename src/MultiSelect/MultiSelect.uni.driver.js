import { baseUniDriverFactory } from '../../test/utils/unidriver';
import ReactTestUtils from 'react-dom/test-utils';
import { inputWithOptionsUniDriverFactory } from '../InputWithOptions/InputWithOptions.uni.driver';
import { tagPrivateUniDriverFactory } from '../Tag/Tag.private.uni.driver';

export const multiselectUniDriverFactory = (base, body) => {
  const {
    driver,
    inputDriver,
    dropdownLayoutDriver,
  } = inputWithOptionsUniDriverFactory(base, body);

  const getInputWrapper = async () =>
    (await driver.inputWrapper()).childNodes[0];

  const tags = base.$$('[data-hook="tag"]');

  const multiSelectDriver = {
    ...baseUniDriverFactory(base),
    ...driver,

    /** returns the max height of the component */
    getMaxHeight: async () => (await getInputWrapper()).style.maxHeight,

    /** click on the input element wrapper */
    clickOnInputWrapper: async () =>
      ReactTestUtils.Simulate.click(await getInputWrapper()),

    /** returns true if the input is focused */
    inputWrapperHasFocus: async () =>
      (await getInputWrapper()).classList.contains('hasFocus'),

    /** returns true if the input is disabled */
    inputWrapperIsDisabled: async () =>
      (await getInputWrapper()).classList.contains('disabled'),

    /** returns the number of tags selected in the input */
    numberOfTags: () => tags.count(),

    /** returns the label of the tag given it's index */
    getTagLabelAt: index => tags.get(index).text(),

    /** press the comma key in the input field */
    pressCommaKey: () => inputDriver.pressKey(','),

    /** returns the `tagDriver` for the specified tag id */
    getTagDriverByTagId: async tagId =>
      tagPrivateUniDriverFactory(
        tags.filter(async tag => (await tag._prop('id')) === tagId).get(0),
      ),

    /** returns true if a custom suffix exists */
    customSuffixExists: async () =>
      !!(await getInputWrapper()).querySelector('[data-hook="custom-suffix"]'),
  };

  return { driver: multiSelectDriver, inputDriver, dropdownLayoutDriver };
};
