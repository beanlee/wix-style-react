import * as React from 'react';
import { OmitPolyfill } from '../common';
import { TooltipProps } from '../Tooltip';
import {InputStatus} from '../Input';

export interface ImageViewerProps {
  imageUrl?: string;
  error?: boolean;
  errorMessage?: string;
  /** Error tooltp placement
   * @deprecated
   * @see tooltipProps
   */
  tooltipPlacement?: TooltipProps['placement'];
  tooltipProps?: OmitPolyfill<TooltipProps, 'content' | 'dataHook'>;
  showUpdateButton?: boolean;
  showRemoveButton?: boolean;
  onAddImage?: React.MouseEventHandler<HTMLElement>;
  onUpdateImage?: React.MouseEventHandler<HTMLElement>;
  onRemoveImage?: React.MouseEventHandler<HTMLElement>;
  onImageLoad?: React.ReactEventHandler<HTMLImageElement>;
  addImageInfo?: string;
  updateImageInfo?: string;
  removeImageInfo?: string;
  removeRoundedBorders?: boolean;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  status?: InputStatus;
  statusMessage?: React.ReactNode;
  dataHook?: string;
  className?: string;
}

export default class ImageViewer extends React.Component<ImageViewerProps> {}
