import * as React from 'react';
import { PopoverProps } from '../Popover';
import { OmitPolyfill } from '../common';
import { InputProps, InputStatus } from '../Input';

export type ColorInputStatus = InputStatus;

export type ColorInputProps = OmitPolyfill<InputProps, 'onChange'> & {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  status?: ColorInputStatus;
  statusMessage?: React.ReactNode;
  size?: ColorInputSize;
  popoverPlacement?: PopoverProps['placement'];
  popoverAppendTo?: 'window' | 'scrollParent' | 'viewport' | 'parent';
  onConfirm?: (color: string | object) => void;
  onCancel?: (color: string | object) => void;
  onChange?: (color: string | object) => void;
  colorPickerChildren?: React.ReactNode;
  onAddColor?: (color: string | object) => void;
  addTooltipContent?: React.ReactNode;
  popoverProps?: OmitPolyfill<
    PopoverProps,
    | 'showArrow'
    | 'fixed'
    | 'dataHook'
    | 'shown'
    | 'placement'
    | 'appendTo'
    | 'onClickOutside'
  >;
};

export type ColorInputSize = 'small' | 'medium' | 'large';

export default class ColorInput extends React.Component<ColorInputProps> {}
