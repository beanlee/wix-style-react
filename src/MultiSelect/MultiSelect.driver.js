import ReactTestUtils from 'react-dom/test-utils';
import inputWithOptionsDriverFactory from '../InputWithOptions/InputWithOptions.driver';
import tagDriverFactory from '../Tag/Tag.driver';

const multiSelectDriverFactory = ({ element, wrapper, eventTrigger }) => {
  const {
    driver,
    inputDriver,
    dropdownLayoutDriver,
  } = inputWithOptionsDriverFactory({ element, wrapper, eventTrigger });

  const inputWrapper = driver.inputWrapper();

  const tags = [...inputWrapper.querySelectorAll('[data-hook="tag"]')];

  const multiSelectDriver = Object.assign(driver, {
    /** returns the max height of the component */
    getMaxHeight: () => inputWrapper.style.maxHeight,

    /** click on the input element wrapper */
    clickOnInputWrapper: () => ReactTestUtils.Simulate.click(inputWrapper),

    /** returns true if the input is focused */
    inputWrapperHasFocus: () => inputWrapper.classList.contains('hasFocus'),

    /** returns true if the input is disabled */
    inputWrapperIsDisabled: () => inputWrapper.classList.contains('disabled'),

    /** returns the number of tags selected in the input */
    numberOfTags: () => tags.length,

    /** returns true if a custom suffix exists */
    customSuffixExists: () =>
      !!inputWrapper.querySelector('[data-hook="custom-suffix"]'),

    /** returns the label of the tag given it's index */
    getTagLabelAt: index => tags[index].textContent,

    /** press the comma key in the input field */
    pressCommaKey: () => inputDriver.keyDown(','),

    /** returns the `tagDriver` for the specified tag id */
    getTagDriverByTagId: tagId =>
      tagDriverFactory({
        element: tags.find(tag => tag.id === tagId),
      }),
  });

  return { driver: multiSelectDriver, inputDriver, dropdownLayoutDriver };
};

export default multiSelectDriverFactory;
