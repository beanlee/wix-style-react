import * as React from 'react';
import {WixComponentClickOutsideEventHandler} from '../common';
import WixComponent, {WixComponentProps} from '../BaseComponents/WixComponent';

export interface DropdownLayoutProps extends WixComponentProps {
  dropDirectionUp?: boolean;
  focusOnSelectedOption?: boolean;
  onClose?: () => void;
  onSelect?: (
    option: DropdownLayoutValueOption,
    sameOptionWasPicked: boolean,
  ) => void;
  onOptionMarked?: (option: DropdownLayoutValueOption | null) => void;
  visible?: boolean;
  options?: DropdownLayoutOption[];
  selectedId?: string | number;
  tabIndex?: number;
  onClickOutside?: WixComponentClickOutsideEventHandler;
  fixedHeader?: React.ReactNode;
  fixedFooter?: React.ReactNode;
  maxHeightPixels?: string | number;
  minWidthPixels?: string | number;
  withArrow?: boolean;
  closeOnSelect?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  itemHeight?: DropdownLayoutItemHeight;
  selectedHighlight?: boolean;
  inContainer?: boolean;
  infiniteScroll?: boolean;
  loadMore?: (page: number) => void;
  hasMore?: boolean;
  markedOption?: boolean | string | number;
  overflow?: Overflow;
}

export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';

export default class DropdownLayout extends WixComponent<DropdownLayoutProps> {
  static NONE_SELECTED_ID: NoneSelectedId;
}

type NoneSelectedId = -1;

export type DropdownLayoutOption =
  | DropdownLayoutValueOption
  | DropdownLayoutDividerOption;

export type DropdownLayoutValueOption = {
  id: string | number;
  value: React.ReactNode | string | RenderOptionFn;
  disabled?: boolean;
  title?: boolean;
  linkTo?: string;
  overrideStyle?: boolean;
};

export type RenderOptionFn = (options: {
  selected: boolean;
  hovered: boolean;
  disabled: boolean;
}) => JSX.Element;

export type DropdownLayoutDividerOption = {
  value: '-';
  id?: string | number;
};

export type DropdownLayoutItemHeight = 'small' | 'big';
