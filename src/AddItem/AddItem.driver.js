import textDriverFactory from '../Text/Text.driver';
import { tooltipTestkitFactory } from 'wix-ui-core/dist/src/testkit';
import { dataHooks } from './constants';

const addItemDriverFactory = ({ element, eventTrigger }) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  const tooltipTestkit = tooltipTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.itemTooltip,
  });
  const textDriver = () =>
    textDriverFactory({ element: byHook(dataHooks.itemText) });

  return {
    /** returns true if element in the DOM */
    exists: () => !!element,

    /** returns the driver element */
    element: () => element,

    /** returns value of action text */
    getText: () => textDriver().getText(),

    /** true if passed children in string exists */
    textExists: () => textDriver().exists(),

    /** returns value of tooltip content */
    getTooltipContent: () => {
      tooltipTestkit.mouseEnter();
      const text = tooltipTestkit.getContentElement().textContent;
      tooltipTestkit.mouseLeave();
      return text;
    },
    /** clicks on element */
    click: () => eventTrigger.click(element),
  };
};

export default addItemDriverFactory;
