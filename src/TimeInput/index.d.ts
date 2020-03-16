import * as React from 'react';

export interface TimeInputProps {
  dashesWhenDisabled?: boolean;
  dataHook?: string;
  defaultValue?: import('moment').Moment;
  disableAmPm?: boolean;
  disabled?: boolean;
  onChange?: (time: import('moment').Moment) => void;
  rtl?: boolean;
  style?: object;
  minutesStep?: number;
  customSuffix: React.ReactNode;
}

export default class TimeInput extends React.PureComponent<TimeInputProps> {}
