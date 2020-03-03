import * as React from 'react';
import { OmitPolyfill } from '../common';
import { InputProps, InputStatus } from '../Input';
import { GoogleMapsClient } from '../clients';

export type GoogleAddressInputStatus = InputStatus;

export interface GoogleAddressInputProps
  extends OmitPolyfill<
    InputProps,
    'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'onKeyUp' | 'onPaste'
  > {
  placeholder?: string;
  valuePrefix?: string;
  countryCode?: string;
  value?: string;
  status?: GoogleAddressInputStatus;
  statusMessage?: React.ReactNode;
  onChange?: React.MouseEventHandler<HTMLButtonElement>;
  onBlur?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onSet?: Function;
  magnifyingGlass?: boolean;
  readOnly?: boolean;
  autoSelect?: boolean;
  clearSuggestionsOnBlur?: boolean;
  fallbackToManual?: boolean;
  poweredByGoogle?: boolean;
  footer?: string;
  types?: Array<any>;
  filterTypes?: Array<any>;
  placeDetailsFields?: Array<any>;
  footerOptions?: object;
  handler?: 'geocode' | 'places';
  Client?: GoogleMapsClient;
}

export default class GoogleAddressInput extends React.Component<
  GoogleAddressInputProps
> {
  select: () => void;
  focus: () => void;
}
