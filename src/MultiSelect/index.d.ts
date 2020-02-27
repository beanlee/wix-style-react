import * as React from 'react';
import { OmitPolyfill } from '../common';

import InputWithOptions, {
  InputWithOptionsProps,
  OnSelectFnSignature,
} from '../InputWithOptions';
import {
  DropdownLayoutProps,
  DropdownLayoutValueOption,
} from '../DropdownLayout';
import { TagProps } from '../Tag';
import { InputStatus } from '../Input';

export type MultiSelectStatus = InputStatus;

export interface MultiSelectProps
  extends InputWithOptionsProps<(values: string[]) => void> {
  selectedId?: DropdownLayoutProps['selectedId'];
  closeOnSelect?: DropdownLayoutProps['closeOnSelect'];
  selectedHighlight?: DropdownLayoutProps['selectedHighlight'];
  predicate?: (option: DropdownLayoutValueOption) => boolean;
  tags?: MultiSelectTag[];
  maxNumRows?: number;
  delimiters?: string[];
  mode?: MultiSelectMode;
  status?: MultiSelectStatus;
  statusMessage?: React.ReactNode;
  onReorder?: OnReorderFn;
  onSelect?: (option: DropdownLayoutValueOption) => void;
  customInput?: React.ReactNode | Function;
  customSuffix?: React.ReactNode;
  disabled?: boolean;
  onRemoveTag?: (tagId: TagProps['id']) => void;
  clearOnBlur?: boolean;
}

export default class MultiSelect extends InputWithOptions<
  (values: string[]) => void,
  OnSelectFnSignature,
  MultiSelectProps
> {}

export type MultiSelectMode = 'select';
export type OnReorderFn = (data: {
  addedIndex: number;
  removedIndex: number;
}) => void;

export type MultiSelectTag = OmitPolyfill<TagProps, 'children'> & {
  label: string;
};
