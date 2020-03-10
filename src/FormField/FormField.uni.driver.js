import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.uni.driver';
import { dataHooks } from './constants';

export const formFieldUniDriverFactory = (base, body, { dataHook }) => {
  const charactersCounter = () => base.$('[data-hook*="formfield-counter"]');

  return {
    ...baseUniDriverFactory(base),
    getChildren: async () => {
      const baseUniDriverElement = base.$('[data-hook*="formfield-children"]');
      return (await baseUniDriverElement.exists())
        ? baseUniDriverElement.getNative() // eslint-disable-line no-restricted-properties
        : null;
    },
    getLabel: async () => {
      const baseUniDriverElement = base.$('[data-hook*="formfield-label"]');
      return (await baseUniDriverElement.exists())
        ? baseUniDriverElement.getNative() // eslint-disable-line no-restricted-properties
        : null;
    },
    isRequired: async () =>
      base.$('[data-hook*="formfield-asterisk"]').exists(),
    getLengthLeft: async () => {
      const counter = charactersCounter();
      return (await counter.exists())
        ? parseInt(await counter._prop('innerHTML'), 10)
        : null;
    },
    isLengthExceeded: async () => {
      const counter = charactersCounter();
      if (await counter.exists()) {
        const length = parseInt(await counter._prop('innerHTML'), 10);
        return length < 0;
      }
      return false;
    },
    hasTooltip: async () => {
      const testkit = tooltipDriverFactory(
        base.$(`[data-hook="${dataHook}-formfield-infoicon-tooltip"]`),
        body,
      );
      return await testkit.exists();
    },
    getInfoContent: async () => {
      const testkit = tooltipDriverFactory(
        base.$(`[data-hook="${dataHook}-formfield-infoicon-tooltip"]`),
        body,
      );
      return await testkit.getTooltipText();
    },
    getSuffix: async () => {
      const suffixElement = base.$(`[data-hook="${dataHooks.suffix}"]`);

      return (await suffixElement.exists())
        ? suffixElement.getNative() // eslint-disable-line no-restricted-properties
        : null;
    },
  };
};
