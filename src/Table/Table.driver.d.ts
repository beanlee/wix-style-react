import { DataTableDriver } from './DataTable/DataTable.driver';
import { CheckboxDriver } from '../Checkbox/Checkbox.driver';

export interface TableDriver<T> extends DataTableDriver {
  element: T;
  getRowCheckboxDriver: (index: number) => CheckboxDriver;
  getBulkSelectionCheckboxDriver: () => CheckboxDriver;
  isBulkSelectionDisabled: () => boolean;
  isRowSelectionDisabled: (index: number) => boolean;
  /**
   * @deprecated
   */
  clickRowChecbox: (index: number) => void;
  clickRowCheckbox: (index: number) => void;
  clickBulkSelectionCheckbox: () => void;
  isRowSelected: (index: number) => boolean;
  getBulkSelectionState: () => 'ALL' | 'SOME' | 'NONE';
  getTitlebar: () => HTMLElement;
}
