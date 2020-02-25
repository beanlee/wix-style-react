import ReactTestUtils from 'react-dom/test-utils';
import toArray from 'lodash/toArray';
import { isClassExists } from '../../test/utils';

const radioGroupDriverFactory = ({ element }) => {
  const radios = toArray(element.children) || [];
  const radioButtons = radios.map(radio => radio.childNodes[0]);
  const labels = radios.map(radio => radio.childNodes[1]);
  const selectedRadio = () => radios.find(radio => radio.childNodes[0].checked);
  const getRadioByValue = value =>
    radioButtons.find(radioButton => radioButton.value === value.toString());

  return {
    exists: () => !!element,
    selectByValue: value =>
      ReactTestUtils.Simulate.change(getRadioByValue(value)),
    selectByIndex: index => ReactTestUtils.Simulate.change(radioButtons[index]),
    getRadioValueAt: index => radioButtons[index].value,
    getRadioAtIndex: index => radios[index],
    getSelectedValue: () =>
      selectedRadio() ? selectedRadio().childNodes[0].value : null,
    isRadioDisabled: index => radioButtons[index].disabled,
    // TODO: We should deprecate getClassOfLabelAt(). Css tests should be in e2e tests.
    getClassOfLabelAt: index => labels[index].className,
    isVerticalDisplay: () => isClassExists(element, 'vertical'),
    isHorizontalDisplay: () => isClassExists(element, 'horizontal'),
    spacing: () => radios[1].style._values['margin-top'],
    lineHeight: () => labels[0].style._values['line-height'],
    getNumberOfRadios: () => radios.length,
  };
};

export default radioGroupDriverFactory;
