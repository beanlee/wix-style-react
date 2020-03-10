import * as React from 'react';
import { TooltipProps } from '../Tooltip';

export type InfoIconSize = 'small' | 'medium';

export interface InfoIconProps {
  content: React.ReactNode;
  size?: InfoIconSize;
  dataHook?: string;
  tooltipProps?: Partial<TooltipProps>;
}

declare const InfoIcon: React.FC<InfoIconProps>;

export default InfoIcon;
