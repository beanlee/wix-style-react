import inputDriverFactory from '../Input/Input.driver';
import DataHooks from './dataHooks';

const noBorderInputDriverFactory = ({ element, wrapper }) => {
  const inputDriver = inputDriverFactory({
    element,
    wrapper,
  });

  return {
    ...inputDriver,
    getLabel: () =>
      element &&
      element.querySelector(`[data-hook="${DataHooks.label}"]`).textContent,
    getStatusMessage: () =>
      element &&
      element.querySelector(`[data-hook="${DataHooks.statusMessage}"]`)
        .textContent,
  };
};

export default noBorderInputDriverFactory;
