import * as React from 'react';

export interface LinearProgressBarProps {
  error?: boolean;
  errorMessage?: string;
  light?: boolean;
  showProgressIndication?: boolean;
  value?: number | string;
  skin?: 'standard' | 'success';
  dataHook?: string;
}

export default class LinearProgressBar extends React.PureComponent<
  LinearProgressBarProps
> {}
