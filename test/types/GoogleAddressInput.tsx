import * as React from 'react';
import GoogleAddressInput from '../../src/GoogleAddressInput';
import clients from '../../src/clients';

function GoogleAddressInputWithMandatoryProps() {
  return <GoogleAddressInput />;
}
function GoogleAddressInputWithAllProps() {
  return (
    <GoogleAddressInput
      placeholder={'placeholder'}
      valuePrefix={'valuePrefix'}
      countryCode={'countryCode'}
      value={'value'}
      types={['type1', 'type2']}
      filterTypes={['filterType1']}
      placeDetailsFields={['place1', 'place2']}
      status="error"
      statusMessage="message"
      onChange={e => {}}
      onBlur={e => {}}
      onFocus={e => {}}
      onKeyDown={e => {}}
      onSet={() => {}}
      Client={clients.GoogleMapsClient}
      magnifyingGlass
      readOnly
      autoSelect
      footer={'footer'}
      footerOptions={{}}
      clearSuggestionsOnBlur
      fallbackToManual
      poweredByGoogle
      handler="geocode"
    />
  );
}
function testInstanceMethods() {
  const instance = new GoogleAddressInput({});
  instance.select();
  instance.focus();
}
