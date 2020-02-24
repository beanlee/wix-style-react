import * as React from 'react';
import { CalendarProps } from '../Calendar';
import { PopoverCommonProps } from '../common';

export type DatePickerStatus = 'error' | 'warning' | 'loading';
export interface DatePickerProps extends CalendarProps {
  customInput?: React.ReactNode;
  inputProps?: {};
  dateFormat?: string | Function;
  locale?: string | { distanceInWords?: {}; format?: {} };
  disabled?: boolean;
  inputDataHook?: string;
  calendarDataHook?: string;
  placeholderText?: string;
  rtl?: boolean;
  value?: {};
  initialOpen?: boolean;
  status?: DatePickerStatus;
  statusMessage?: React.ReactNode;
  width?: number | string;
  zIndex?: number;
  popoverProps?: PopoverCommonProps;
}

export default class DatePicker extends React.PureComponent<DatePickerProps> {}
