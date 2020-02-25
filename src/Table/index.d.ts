import * as React from 'react';

import { DataTableColumn, DataTableProps } from './DataTable';
import EmptyState from '../EmptyState';

export interface TableProps extends UsedDataTableProps {
  dataHook?: string;
  onSelectionChanged?: OnSelectionChangedFn;
  showSelection?: boolean;
  hideBulkSelectionCheckbox?: boolean;
  selectedIds?: string[] | number[];
  selectionDisabled?: boolean;
  deselectRowsByDefault?: boolean;
  withWrapper?: boolean;
  onSortClick?(colData: TableColumn, colNum: number): void;
  totalSelectableCount?: number;
  columns: TableColumn[];
}

export default class Table extends React.Component<TableProps> {
  static ToolbarContainer: typeof ToolbarContainer;
  static Titlebar: typeof Titlebar;
  static Content: typeof Content;
  static EmptyState: typeof EmptyState;
  static BulkSelectionCheckbox: typeof BulkSelectionCheckbox;

  setSelectedIds: (selectedIds: any) => void;
}

declare const ToolbarContainer: React.SFC;
declare const Titlebar: React.SFC<{ dataHook?: string }>;
declare const Content: React.SFC<{
  titleBarVisible?: boolean;
  dataHook?: string;
}>;
declare const BulkSelectionCheckbox: React.SFC<{ dataHook: string }>;

export type TableColumn = DataTableColumn;

export type OnSelectionChangedFn = (
  selectedIds: TableProps['selectedIds'] | null,
  change:
    | {
        type: 'SINGLE_TOGGLE';
        id: string;
        value: boolean;
        origin: string;
      }
    | {
        type: 'ALL' | 'NONE';
        origin: string;
      },
) => void;

export type UsedDataTableProps = Pick<
  DataTableProps,
  | 'allowMultiDetailsExpansion'
  | 'dynamicRowClass'
  | 'isRowHighlight'
  | 'hasMore'
  | 'hideHeader'
  | 'id'
  | 'infiniteScroll'
  | 'itemsPerPage'
  | 'loader'
  | 'loadMore'
  | 'onRowClick'
  | 'onMouseEnterRow'
  | 'onMouseLeaveRow'
  | 'useWindow'
  | 'scrollElement'
  | 'rowVerticalPadding'
  | 'rowDetails'
  | 'rowDataHook'
  | 'rowClass'
  | 'showHeaderWhenEmpty'
  | 'showLastRowDivider'
  | 'virtualized'
  | 'virtualizedTableHeight'
  | 'virtualizedLineHeight'
  | 'virtualizedListRef'
  | 'width'
  | 'skin'
  | 'data'
>;
