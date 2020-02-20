import { protractorTestkitFactoryCreator } from 'wix-ui-test-utils/protractor';
import focusableDriverFactory from '../common/Focusable/Focusable.protractor.driver';

import { mergeDrivers } from '../../test/utils/private-drivers';
import { hasAttribute } from '../../test/utils/protractor-helpers';
import loaderDriverFactory from '../Loader/Loader.protractor.driver';
import textDriverFactory from '../Text/Text.protractor.driver';
import searchDriverFactory from '../Search/Search.protractor.driver';
import { dataHooks } from './ModalSelectorLayout.helpers';

const buttonDriverFactory = element => {
  const focusableDriver = focusableDriverFactory({
    rootElement: element,
    nativeFocusableElement: element,
    clickableElements: [element],
  });

  const publicDriver = {
    click: () => element.click(),
    getButtonTextContent: () => element.getText(),
    isButtonDisabled: () => hasAttribute(element, 'disabled'),
    isPrefixIconExists: () => element.$('[data-hook="btn-prefix"]').isPresent(),
    isSuffixIconExists: () => element.$('[data-hook="btn-suffix"]').isPresent(),
    element: () => element,
  };

  return mergeDrivers(publicDriver, focusableDriver);
};

const loaderTestkitFactory = protractorTestkitFactoryCreator(
  loaderDriverFactory,
);
const buttonTestkitFactory = protractorTestkitFactoryCreator(
  buttonDriverFactory,
);
const textTestkitFactory = protractorTestkitFactoryCreator(textDriverFactory);
const searchTestkitFactory = protractorTestkitFactoryCreator(
  searchDriverFactory,
);

const modalSelectorLayoutDriverFactory = component => {
  const findByDataHook = dataHook => component.$(`[data-hook="${dataHook}"]`);
  const findAllByDataHook = dataHook =>
    component.$$(`[data-hook="${dataHook}"]`);
  const mainLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.mainLoader });
  const nextPageLoaderDriver = () =>
    loaderTestkitFactory({ dataHook: dataHooks.nextPageLoader });
  const cancelButtonDriver = () =>
    buttonTestkitFactory({ dataHook: 'cancellation-button' });
  const okButtonDriver = () =>
    buttonTestkitFactory({ dataHook: 'confirmation-button' });
  const subtitleTextDriver = () =>
    textTestkitFactory({ dataHook: dataHooks.subtitle });
  const searchDriver = () =>
    searchTestkitFactory({ dataHook: dataHooks.search });

  return {
    element: () => component,
    mainLoaderDriver,
    nextPageLoaderDriver,
    cancelButtonDriver,
    okButtonDriver,
    searchDriver,
    subtitleTextDriver,
    getTitle: () => findByDataHook('header-layout-title').getText(),
    clickOnClose: () => findByDataHook('header-close-button').click(),
    getEmptyState: () => findByDataHook(dataHooks.emptyState),
    getNoResultsFoundState: () => findByDataHook(dataHooks.noResultsFoundState),
    listExists: () => findByDataHook(dataHooks.list).isPresent(),
    numberOfItemsInList: () => findAllByDataHook(dataHooks.selector).count(),
  };
};

export default modalSelectorLayoutDriverFactory;
