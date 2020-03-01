import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import ReactTestUtils from 'react-dom/test-utils';

import { statusIndicatorDriverFactory } from '../StatusIndicator/StatusIndicator.uni.driver';

export const getContent = base => base.$('.public-DraftEditor-content');
export const getPlaceholder = base =>
  base.$('.public-DraftEditorPlaceholder-root');

export default (base, body) => {
  const statusIndicatorDriver = statusIndicatorDriverFactory(
    base.$(`[data-hook="richtextarea-error-indicator"]`),
    body,
  );

  return {
    ...baseUniDriverFactory(base, body),
    isDisabled: async () =>
      Boolean(await getContent(base).attr('contenteditable')),
    hasError: statusIndicatorDriver.exists,
    getContent: () => getContent(base).text(),
    getPlaceholder: () => getPlaceholder(base).text(),
    getErrorMessage: statusIndicatorDriver.getMessage,
    enterText: async text => {
      const contentElement = await getContent(base).getNative(); // eslint-disable-line no-restricted-properties

      // TODO: implement for puppeteer. Throw error if type is not handled
      if (base.type === 'react') {
        ReactTestUtils.Simulate.beforeInput(contentElement, { data: text });
      } else if (base.type === 'protractor') {
        contentElement.sendKeys(text);
      }
    },
  };
};
