import * as React from 'react';
import { TooltipProps } from '../Tooltip';
import { OmitPolyfill } from '../common';

export interface FormFieldProps {
  children?:
    | React.ReactNode
    | ((data: { setCharactersLeft: CharactersLeftFn }) => React.ReactNode);
  charCount?: number;
  stretchContent?: boolean;
  label?: React.ReactNode;
  labelSize?: LabelPlacement;
  labelAlignment?: LabelAlignment;
  labelPlacement?: FormFieldLabelPlacement;
  required?: boolean;
  infoContent?: React.ReactNode;
  infoTooltipProps?: OmitPolyfill<TooltipProps, 'content' | 'dataHook'>;
  suffix?: React.ReactNode;
  id?: string;
  dataHook?: string;
}

export default class FormField extends React.Component<FormFieldProps> {}

export type FormFieldLabelPlacement = 'top' | 'right' | 'left';
export type LabelPlacement = 'small' | 'medium';
export type LabelAlignment = 'middle' | 'top';
type CharactersLeftFn = (lengthLeft: number) => void;
