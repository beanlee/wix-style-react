import { mouseEnter } from 'wix-ui-test-utils/protractor';
import dataTableDriverFactory from './DataTable/DataTable.protractor.driver';
import { INTERNAL_DRIVER_SYMBOL } from '../../test/utils/private-drivers';

const rowByIndex = (component, index) => component.$$('tbody tr').get(index);

const tableDriverFactory = component => ({
  ...dataTableDriverFactory(component),
  element: component,

  /** Hover a specific row with the mouse */
  hoverRow: index => mouseEnter(rowByIndex(component, index)),

  /** Private driver */
  [INTERNAL_DRIVER_SYMBOL]: {
    /** Get a row element */
    getRow: index => rowByIndex(component, index),
  },
});

export default tableDriverFactory;
