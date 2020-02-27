import * as React from 'react';
import ColorInput from '../../src/ColorInput';
import { colorInputTestkitFactory } from '../../dist/testkit';
import { colorInputTestkitFactory as colorInputEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import { colorInputTestkitFactory as colorInputPuppeteerTestkitFactory } from '../../dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function ColorInputWithMandatoryProps() {
  return <ColorInput value="val" />;
}

function ColorInputWithAllProps() {
  return (
    <ColorInput
      value="val"
      addTooltipContent={<div />}
      colorPickerChildren={<div />}
      disabled
      status="error"
      statusMessage="message"
      onAddColor={_color => {}}
      onCancel={_color => {}}
      onChange={_color => {}}
      onConfirm={_color => {}}
      placeholder="placeholder"
      popoverAppendTo="parent"
      popoverPlacement="auto"
      popoverProps={{}}
      size="large"
    />
  );
}

async function testkits() {
  const testkit = colorInputTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = colorInputEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await colorInputPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
