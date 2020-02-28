import * as React from 'react';
import { IconElement, OmitPolyfill } from '../common';
import { PopoverMenuProps } from '../PopoverMenu';

type CommonTableActionCellProps = {
  dataHook?: string;
  primaryAction?: TableActionCellPrimaryAction;
  secondaryActions?: TableActionCellSecondaryAction[];
  numOfVisibleSecondaryActions?: number;
  alwaysShowSecondaryActions?: boolean;
};

export type TableActionCellProps = CommonTableActionCellProps & {
  popoverMenuProps?: OmitPolyfill<PopoverMenuProps, 'triggerElement'>;
};

export const TableActionCell: React.SFC<TableActionCellProps>;
export default TableActionCell;

export type TableActionCellPrimaryAction = {
  text: string;
  onClick: () => void;
  theme?: 'whiteblue' | 'fullblue';
  disabled?: boolean;
};

export type TableActionCellSecondaryAction = {
  text: string;
  icon: IconElement;
  onClick: () => void;
  disabled?: boolean;
  dataHook?: string;
};
