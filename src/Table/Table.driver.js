import dataTableDriverFactory from './DataTable/DataTable.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';

const tableDriverFactory = ({ element, eventTrigger }) => {
  const dataTableDriver = dataTableDriverFactory({
    element,
  });
  const getTitlebar = () =>
    element.querySelector('[data-hook="table-title-bar"]');
  const getRowCheckbox = index =>
    dataTableDriver.getCell(index, 0).querySelector('[data-hook="row-select"]');
  const getRowCheckboxDriver = index =>
    checkboxDriverFactory({
      element: getRowCheckbox(index),
      eventTrigger,
    });
  const getBulkSelectionCheckboxDriver = () =>
    checkboxDriverFactory({
      element: dataTableDriver
        .getHeaderCell(0)
        .querySelector('[data-hook="table-select"]'),
      eventTrigger,
    });

  const isBulkSelectionChecked = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
  };
  const isBulkSelectionIndeterminate = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return !checkboxDriver.isChecked() && checkboxDriver.isIndeterminate();
  };
  const isBulkSelectionUnchecked = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return !checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
  };

  const isBulkSelectionDisabled = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return checkboxDriver.isDisabled();
  };

  const isRowSelectionDisabled = index => {
    const checkboxDriver = getRowCheckboxDriver(index);
    return checkboxDriver.isDisabled();
  };

  return {
    ...dataTableDriver,
    element,
    /** Get driver of row selection checkbox by row index */
    getRowCheckboxDriver,
    /** Get driver of row bulk-selection checkbox */
    getBulkSelectionCheckboxDriver,
    /** Whether bulk selection checkbox is disabled */
    isBulkSelectionDisabled,
    /** Whether specific row selection checkbox is disabled */
    isRowSelectionDisabled,
    /** Click the row selection checkbox */
    clickRowCheckbox: index => eventTrigger.click(getRowCheckbox(index)),
    /** Click the bulk-selection checkbox */
    clickBulkSelectionCheckbox: () => getBulkSelectionCheckboxDriver().click(),
    /** Is row selected by index */
    isRowSelected: index => getRowCheckboxDriver(index).isChecked(),
    /** Get bulk selection state. Possible value 'ALL', 'SOME', 'NONE. */
    getBulkSelectionState: () => {
      if (isBulkSelectionChecked()) {
        return 'ALL';
      }
      if (isBulkSelectionIndeterminate()) {
        return 'SOME';
      }
      if (isBulkSelectionUnchecked()) {
        return 'NONE';
      }
    },
    /** Get title-bar (column titles) */
    getTitlebar,
  };
};

export default tableDriverFactory;
