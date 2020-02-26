import * as React from 'react';
import WixComponent, {
  WixComponentProps,
} from '../BaseComponents/WixComponent';

export interface LoaderProps extends WixComponentProps {
  size?: LoaderSize;
  color?: LoaderColor;
  text?: React.ReactNode;
  status?: LoaderStatus;
  statusMessage?: string;
}

export default class Loader extends WixComponent<LoaderProps> {}

export type LoaderSize = 'tiny' | 'small' | 'medium' | 'large';

export type LoaderColor = 'blue' | 'white';

export type LoaderStatus = 'loading' | 'success' | 'error';
