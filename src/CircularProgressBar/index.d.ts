import * as React from 'react';

export interface CircularProgressBarProps {
  error?: boolean;
  errorLabel?: string;
  errorMessage?: string;
  light?: boolean;
  showProgressIndication?: boolean;
  size?: CircularProgressBarSize;
  value?: number | string;
  dataHook?: string;
}

export default class CircularProgressBar extends React.PureComponent<
  CircularProgressBarProps
> {}

export type CircularProgressBarSize = 'small' | 'medium' | 'large';
