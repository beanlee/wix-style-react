import React from 'react';
import PropTypes from 'prop-types';
import defaultTo from 'lodash/defaultTo';
import classNames from 'classnames';

import style from './Table.st.css';
import DataTable from './DataTable';
import Checkbox from '../Checkbox';
import { TableContext } from './TableContext';
import { BulkSelection } from './BulkSelection';
import Tooltip from '../Tooltip/Tooltip';
import {
  TableToolbarContainer,
  TableTitleBar,
  TableContent,
  TableEmptyState,
  TableBulkSelectionCheckbox,
} from './components';

const hasUnselectablesSymbol = Symbol('hasUnselectables');

export function createColumns({ tableProps, bulkSelectionContext }) {
  const createCheckboxColumn = ({
    toggleSelectionById,
    isSelected,
    disabled,
  }) => {
    return {
      title: tableProps.hideBulkSelectionCheckbox ? (
        ''
      ) : (
        <TableBulkSelectionCheckbox dataHook="table-select" />
      ),
      onCellClick: (column, row, rowNum, event) => {
        if (row.unselectable) {
          return;
        }

        const id = defaultTo(row.id, rowNum);
        toggleSelectionById(id, 'Checkbox');
        event.preventDefault();
        event.stopPropagation();
      },
      render: (row, rowNum) => {
        const id = defaultTo(row.id, rowNum);
        return row.unselectable ? null : (
          <div>
            <Checkbox
              disabled={disabled}
              dataHook="row-select"
              checked={isSelected(id)}
            />
          </div>
        );
      },
      width: '12px',
      style: (_, row) => (row.unselectable ? undefined : { cursor: 'pointer' }),
    };
  };

  return tableProps.showSelection
    ? [createCheckboxColumn(bulkSelectionContext), ...tableProps.columns]
    : tableProps.columns;
}

export function getDataTableProps(tableProps) {
  /* eslint-disable no-unused-vars */
  const {
    showSelection,
    onSelectionChanged,
    dataHook,
    hideHeader,
    ...props
  } = tableProps;
  return {
    ...props,
    rowClass: classNames(tableProps.rowClass, style.tableRow),
  };
}

/**
 * Table is a composite component that allows adding SelectionColumn, Toolbar (on top of the TitleBar).
 * It is a context provider, and thus the Table.Consumer, Table.TitleBar and Table.Content can be rendered separately.
 */
export class Table extends React.Component {
  static ToolbarContainer = TableToolbarContainer;
  static Titlebar = TableTitleBar;
  static Content = TableContent;
  static EmptyState = TableEmptyState;
  static BulkSelectionCheckbox = TableBulkSelectionCheckbox;

  shouldComponentUpdate() {
    // Table is not really a PureComponent
    return true;
  }

  setSelectedIds(selectedIds) {
    this.bulkSelection.setSelectedIds(selectedIds);
  }

  renderChildren() {
    const { children, withWrapper, onRowClick, dataHook } = this.props;
    return withWrapper ? (
      <div
        data-hook={dataHook}
        {...style('root', { isRowClickable: !!onRowClick }, this.props)}
      >
        {children}
      </div>
    ) : (
      children
    );
  }

  render() {
    const {
      data,
      selectedIds,
      showSelection,
      deselectRowsByDefault,
      selectionDisabled,
      infiniteScroll,
      totalSelectableCount,
      onSelectionChanged,
      hasMore,
    } = this.props;
    let hasUnselectables = null;
    let allIds = data.map((rowData, rowIndex) =>
      rowData.unselectable
        ? (hasUnselectables = hasUnselectablesSymbol)
        : defaultTo(rowData.id, rowIndex),
    );

    if (hasUnselectables === hasUnselectablesSymbol) {
      allIds = allIds.filter(rowId => rowId !== hasUnselectablesSymbol);
    }

    return (
      <TableContext.Provider value={this.props}>
        {showSelection ? (
          <BulkSelection
            ref={_ref => (this.bulkSelection = _ref)}
            selectedIds={selectedIds}
            deselectRowsByDefault={deselectRowsByDefault}
            disabled={selectionDisabled}
            hasMoreInBulkSelection={
              infiniteScroll && Boolean(totalSelectableCount) && hasMore
            }
            totalCount={totalSelectableCount}
            allIds={allIds}
            onSelectionChanged={onSelectionChanged}
          >
            {this.renderChildren()}
          </BulkSelection>
        ) : (
          this.renderChildren()
        )}
      </TableContext.Provider>
    );
  }
}

Table.displayName = 'Table';

Table.defaultProps = {
  ...DataTable.defaultProps,
  showSelection: false,
  hideBulkSelectionCheckbox: false,
  children: [<Table.Content key="content" />],
  withWrapper: true,
  showLastRowDivider: false,
};

Table.propTypes = {
  /** Any wrapper element that eventually includes <Table.Content/> as a child */
  children: PropTypes.any,

  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** Called when row selection changes.
   * Receives 2 arguments: `selectedIds` array, and a `change` object ( in this order).
   * `selectedIds` is the updated selected ids.
   * The `change` object has a `type` property with the following possible values: 'ALL', 'NONE', 'SINGLE_TOGGLE'.
   * In case of 'SINGLE_TOGGLE' the `change` object will also include an `id` prop with the item's id,
   * and a `value` prop with the new boolean selection state of the item.
   * The `change` object also contains an `origin` property which indicates what initiated the selection change.
   * The `origin` property can be set when selection is updated using a `SelectionContext` method. */
  onSelectionChanged: PropTypes.func,

  /** Indicates whether to show a selection column (with checkboxes).<br>
   * To hide the selection checkbox from a specific row, set its `row.unselectable` (in the `data` prop) to `true`. */
  showSelection: PropTypes.bool,

  /** Indicates whether to hide the bulk selection ("Select All") checkbox in the table header when showing the selection column */
  hideBulkSelectionCheckbox: PropTypes.bool,

  /** Array of selected row ids.
   *  Ideally, id should be a property on the data row object.
   *  If data objects do not have id property, then the data row's index would be used as an id. */
  selectedIds: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),

  /** Is selection disabled for the table */
  selectionDisabled: PropTypes.bool,

  /** Indicates the `SelectionContext.toggleAll` behaviour when some rows are selected. `true` means SOME -> NONE, `false` means SOME -> ALL */
  deselectRowsByDefault: PropTypes.bool,

  /**
   *  When false then Table would not create a `<div/>` wrapper around it's children.
   *  Useful when using `<Table/>` to wrap a `<Page/>` component, in that case we use the `<Table/>` only as a context provider and it does not render anything to the DOM by itself.*/
  withWrapper: PropTypes.bool,

  /**
   * A callback function called on each column title click. Signature `onSortClick(colData, colNum)`
   */
  onSortClick: PropTypes.func,

  // The following props are derived directly from <DataTable/> component
  /** Allows to open multiple row details */
  allowMultiDetailsExpansion: PropTypes.bool,
  /** The data to display.<br>
   * For each `row` in `data`, If `row.id` exists then it will be used as the React `key` value for each row, otherwise, the row index will be used.<br>
   * When `showSelection` prop is set, if `row.unselectable` is truthy for a `row` in `data`, no checkbox will be displayed for the row in the selection column.  */
  data: PropTypes.array, // Not performing any shape validation to not hurt performance.
  /** Configuration of the table's columns.<br>
   *  Each column needs to specify:
   *    * `title`: a string or an element to display in the table header for this column
   *    * `render`: a function which will be called for every row in `data` to display this row's value for this column<br>
   *
   *  Each column can also specify these fields:
   *    * `onCellClick`: A callback method to be called when a cell in this column is clicked. Signature: `onCellClick(column, rowData, rowNum, event)`
   *    * `sortable`: Sets whether this field is sortable. If `true` clicking the header will call `onSortClick`
   *    * `sortDescending`: Sets what sort icon to display in the column header. `true` will show an up arrow, `false` will show a down arrow, `undefined' will show no icon
   *    * `infoTooltipProps`: Props object for column header's [tooltip](https://wix-wix-style-react.surge.sh/?selectedKind=7.%20Tooltips&selectedStory=7.1.%20Tooltip&full=0&addons=0&stories=1&panelRight=0). Note: `dataHook`, `moveBy` and `children` will not be passed to tooltip.
   *    * `style`: Can be a CSS style `object` or a function that returns a style `object` (signature: `style(column, rowData, rowNum)`). Sets the column inline style. Vertical padding cannot be set here, please use table's `rowVerticalPadding` prop
   *    * `align`: Sets the alignment of the column content
   *    * `width`: CSS value to set the width to use for this column. No value means column will try to contain its children, if possible
   *    * `important`: Sets whether font color of the column should be stronger, more dominant
   *    */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
      render: PropTypes.func.isRequired,
      onCellClick: PropTypes.func,
      sortable: PropTypes.bool,
      sortDescending: PropTypes.bool,
      infoTooltipProps: PropTypes.shape(Tooltip.propTypes),
      style: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
      align: PropTypes.oneOf(['start', 'center', 'end']),
      width: PropTypes.string,
      important: PropTypes.bool,
    }),
  ).isRequired,
  /** A func that gets row data and returns a class(es) to apply to that specific row */
  dynamicRowClass: PropTypes.func,
  /** A func that gets row data and returns boolean if row is highlighted or not */
  isRowHighlight: PropTypes.func,
  /** Whether there are more items to be loaded. Event listeners are removed if false. */
  hasMore: PropTypes.bool,
  /** Should we hide the header of the table. */
  hideHeader: PropTypes.bool,
  /** An id to pass to the table */
  id: PropTypes.string,
  /** If true, table will not render all data to begin with, but will gradually render the data as the user scrolls */
  infiniteScroll: PropTypes.bool,
  /** Indicates the total number of selectable items in the table, including those not yet loaded.
   * When `infiniteScroll` and this prop are set and the user does bulk selection ("Select All"), and there are still unloaded items (`hasMore` is 'true`),
   * the table enters an "Infinite Bulk Selection" mode, where newly loaded items get selected by default and `SelectionContext` holds the not-selected items rather than the selected items.
   * In this case, `SelectionContext.infiniteBulkSelected` is `true` and  `SelectionContext.selectedCount` is the value of `totalSelectableCount` minus the count of unselected items. */
  totalSelectableCount: PropTypes.number,
  /** If infiniteScroll is on, this prop will determine how many rows will be rendered on each load */
  itemsPerPage: PropTypes.number,
  /** The loader to show when loading more items. */
  loader: PropTypes.node,
  /** A callback when more items are requested by the user. */
  loadMore: PropTypes.func,
  /** A callback method to be called on row click. Signature: `onRowClick(rowData, rowNum)`. To enable hover effect you should set this prop.*/
  onRowClick: PropTypes.func,
  /** A callback method to be called on row mouse enter. Signature: `onMouseEnterRow(rowData, rowNum)` */
  onMouseEnterRow: PropTypes.func,
  /** A callback method to be called on row mouse leave. Signature: `onMouseLeaveRow(rowData, rowNum)` */
  onMouseLeaveRow: PropTypes.func,
  /** Add scroll listeners to the window, or else, the component's parentNode. */
  useWindow: PropTypes.bool,
  /** Add scroll listeners to specified DOM Object. */
  scrollElement: PropTypes.object,
  /** Table cell vertical padding. should be 'medium' or 'large'  */
  rowVerticalPadding: PropTypes.oneOf(['medium', 'large']),
  /** Function that returns React component that will be rendered in row details section. Example: `rowDetails={(row, rowNum) => <MyRowDetailsComponent {...row} />}` */
  rowDetails: PropTypes.func,
  /** A string data-hook to apply to all table body rows. or a func which calculates the data-hook for each row  - Signature: `(rowData, rowNum) => string` */
  rowDataHook: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** A class to apply to all table body rows */
  rowClass: PropTypes.string,
  /** Should the table show the header when data is empty */
  showHeaderWhenEmpty: PropTypes.bool,
  /** A flag specifying weather to show a divider after the last row */
  showLastRowDivider: PropTypes.bool,
  /** ++EXPERIMENTAL++ Virtualize the table scrolling for long list items */
  virtualized: PropTypes.bool,
  /** ++EXPERIMENTAL++ Set virtualized table height */
  virtualizedTableHeight: PropTypes.number,
  /** ++EXPERIMENTAL++ Set virtualized table row height */
  virtualizedLineHeight: PropTypes.number,
  /** ++EXPERIMENTAL++ Set ref on virtualized List containing table rows */
  virtualizedListRef: PropTypes.any,
  /** The width of the fixed table. Can be in percentages or pixels. */
  width: PropTypes.string,
  /** Table styling. Supports `standard` and `neutral`. */
  skin: PropTypes.oneOf(['standard', 'neutral']),
};

// export default Table;
