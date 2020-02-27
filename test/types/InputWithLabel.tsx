import * as React from 'react';
import InputWithLabel from '../../src/InputWithLabel';
import { inputWithLabelTestkitFactory } from '../../dist/testkit';
import { inputWithLabelTestkitFactory as inputWithLabelEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import { inputWithLabelTestkitFactory as inputWithLabelPuppeteerTestkitFactory } from '../../dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function InputWithLabelWithMandatoryProps() {
  return <InputWithLabel />;
}

function InputWithLabelWithAllProps() {
  return (
    <InputWithLabel
      label="label"
      suffix={[<div />]}
      value={6}
      dataHook="hook"
      status="error"
      statusMessage={<div />}
      onChange={_ev => {}}
      onFocus={_ev => {}}
      onBlur={_ev => {}}
      name="name"
      type="type"
      ariaLabel="aria"
      autoFocus
      autocomplete="autocomplete"
      disabled
      className="class"
      maxLength={100}
      placeholder="placeholder"
      customInput={<span />}
    />
  );
}

async function testkits() {
  const testkit = inputWithLabelTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = inputWithLabelEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await inputWithLabelPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
