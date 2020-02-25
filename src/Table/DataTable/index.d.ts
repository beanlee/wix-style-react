import * as React from 'react';
import { OmitPolyfill } from '../../common';
import { TooltipNewProps } from '../../Tooltip';

export interface DataTableProps {
  dataHook?: string;
  id?: string;
  data?: object[];
  columns: DataTableColumn[];
  showHeaderWhenEmpty?: boolean;
  rowDataHook?: string | DataTableRowDataHookFn;
  rowClass?: string;
  dynamicRowClass?: (rowData: any, rowNum: number) => string;
  isRowSelected?: (rowData: any, rowNum: number) => boolean;
  isRowHighlight?: (rowData: any, rowNum: number) => boolean;
  onRowClick?: (rowData: any, rowNum: number) => void;
  onMouseEnterRow?: (rowData: any, rowNum: number) => void;
  onMouseLeaveRow?: (rowData: any, rowNum: number) => void;
  onSortClick?: (column: DataTableColumn, colNum: number) => void;
  infiniteScroll?: boolean;
  itemsPerPage?: number;
  width?: string;
  skin?: DataTableSkin;
  loadMore?: () => void;
  hasMore?: boolean;
  loader?: React.ReactNode;
  useWindow?: boolean;
  scrollElement?: HTMLElement;
  rowVerticalPadding?: DataTableRowVerticalPadding;
  rowDetails?: (rowData: any, rowNum: number) => React.ReactNode;
  allowMultiDetailsExpansion?: boolean;
  hideHeader?: boolean;
  showLastRowDivider?: boolean;
  virtualized?: boolean;
  virtualizedTableHeight?: number;
  virtualizedLineHeight?: number;
  virtualizedListRef?: React.LegacyRef<any>;
  selectedRowsIds?: (string | number)[];
}

export default class DataTable extends React.Component<DataTableProps> {}

export type DataTableColumnAlign = 'start' | 'center' | 'end';
export type DataTableRowDataHookFn = (rowData: any, rowNum: number) => string;
export type DataTableSkin = 'standard' | 'neutral';
export type DataTableRowVerticalPadding = 'medium' | 'large';
export type DataTableColumn = {
  title: React.ReactNode;
  render: (row: any, rowNum: number) => React.ReactNode;
  width?: string;
  important?: boolean;
  sortable?: boolean;
  sortDescending?: boolean;
  style?: React.CSSProperties;
  infoTooltipProps?: OmitPolyfill<
    Partial<TooltipNewProps>,
    'dataHook' | 'moveBy' | 'upgrade'
  >;
  align?: DataTableColumnAlign;
};
