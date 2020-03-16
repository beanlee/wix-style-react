import * as React from 'react';
import DatePicker from '../../src/DatePicker';
import { datePickerTestkitFactory } from '../../dist/testkit';
import { datePickerTestkitFactory as datePickerEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import * as enzyme from 'enzyme';

function datePickerWithMandatoryProps() {
  return <DatePicker onChange={() => {}} />;
}

function datePickerWithAllProps() {
  return (
    <DatePicker
      customInput="customInput"
      inputProps="{}"
      dateFormat="string | Function"
      locale="en"
      disabled
      inputDataHook="string"
      calendarDataHook="string"
      placeholderText="string"
      rtl
      value="{}"
      initialOpen
      status="error"
      statusMessage="message"
      width="number | string"
      zIndex={1}
      onChange={() => {}}
      popoverProps={{
        dynamicWidth: true,
        flip: true,
        hideDelay: 500,
        maxWidth: '100',
        minWidth: '100',
        moveArrowTo: 5,
        moveBy: { x: 1, y: 1 },
        showDelay: 500,
        timeout: 100,
        zIndex: 1,
        width: 100,
      }}
    />
  );
}

async function testkits() {
  const testkit = datePickerTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = datePickerEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });
}
