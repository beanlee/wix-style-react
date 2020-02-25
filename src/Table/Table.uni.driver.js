import { baseUniDriverFactory, getElement } from '../../test/utils/unidriver';
import { dataTablePrivateUniDriverFactory } from './DataTable/DataTable.private.uni.driver';
import { checkboxUniDriverFactory } from '../Checkbox/Checkbox.uni.driver';

export const tableUniDriverFactory = base => {
  const dataTableDriver = dataTablePrivateUniDriverFactory(base);
  const getRowCheckbox = async index =>
    (await dataTableDriver.getCell(index, 0)).$('[data-hook="row-select"]');
  const getRowCheckboxDriver = async index =>
    checkboxUniDriverFactory(await getRowCheckbox(index));
  const getBulkSelectionCheckboxDriver = async () => {
    const cell = await dataTableDriver.getHeaderCell(0);
    return checkboxUniDriverFactory(await cell.$('[data-hook="table-select"]'));
  };
  const isBulkSelectionChecked = async () => {
    const checkboxDriver = await getBulkSelectionCheckboxDriver();
    return (
      (await checkboxDriver.isChecked()) &&
      !(await checkboxDriver.isIndeterminate())
    );
  };
  const isBulkSelectionIndeterminate = async () => {
    const checkboxDriver = await getBulkSelectionCheckboxDriver();
    return (
      !(await checkboxDriver.isChecked()) &&
      (await checkboxDriver.isIndeterminate())
    );
  };
  const isBulkSelectionUnchecked = async () => {
    const checkboxDriver = await getBulkSelectionCheckboxDriver();
    return (
      !(await checkboxDriver.isChecked()) &&
      !(await checkboxDriver.isIndeterminate())
    );
  };

  return {
    ...baseUniDriverFactory(base),
    ...dataTableDriver,
    /** Get driver of row selection checkbox by row index */
    getRowCheckboxDriver,
    /** Get driver of row bulk-selection checkbox */
    getBulkSelectionCheckboxDriver,
    /** Whether bulk selection checkbox is disabled */
    isBulkSelectionDisabled: async () =>
      (await getBulkSelectionCheckboxDriver()).isDisabled(),
    /** Whether specific row selection checkbox is disabled */
    isRowSelectionDisabled: async index =>
      (await getRowCheckboxDriver(index)).isDisabled(),
    /** Click the row selection checkbox */
    clickRowCheckbox: async index => (await getRowCheckbox(index)).click(),
    /** Click the bulk-selection checkbox */
    clickBulkSelectionCheckbox: async () =>
      (await getBulkSelectionCheckboxDriver()).click(),
    /** Is row selected by index */
    isRowSelected: async index =>
      (await getRowCheckboxDriver(index)).isChecked(),
    getBulkSelectionState: async () => {
      if (await isBulkSelectionChecked()) {
        return 'ALL';
      }
      if (await isBulkSelectionIndeterminate()) {
        return 'SOME';
      }
      if (await isBulkSelectionUnchecked()) {
        return 'NONE';
      }
    },
    /** Get title-bar (column titles) */
    getTitlebar: () => getElement(base.$('[data-hook="table-title-bar"]')),
  };
};
