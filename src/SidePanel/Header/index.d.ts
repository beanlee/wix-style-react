import * as React from 'react';
import { TooltipProps } from '../../Tooltip';

export interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  infoTooltipProps?: Partial<TooltipProps>;
  infoTooltipContent?: string;
  showDivider?: boolean;
}
export default class Header extends React.PureComponent<HeaderProps> {}
