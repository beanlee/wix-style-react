import * as React from 'react';
import { OmitPolyfill } from '../common';
import { TooltipProps } from '../Tooltip';

export interface FillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  iconSize?: FillButtonIconSize;
  disabled?: boolean;
  fill?: string;
  tooltipProps?: OmitPolyfill<TooltipProps, 'dataHook' | 'size'>;
  dataHook?: string;
}

export default class FillButton extends React.PureComponent<FillButtonProps> {}
export type FillButtonIconSize = 'small' | 'medium';
