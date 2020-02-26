import * as React from 'react';
import LinearProgressBar from '../../src/LinearProgressBar';
import { linearProgressBarTestkitFactory } from '../../dist/testkit';
import { linearProgressBarTestkitFactory as linearProgressBarEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import { linearProgressBarTestkitFactory as linearProgressBarPuppeteerTestkitFactory } from '../../dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function LinearProgressBarWithMandatoryProps() {
  return <LinearProgressBar />;
}

function LinearProgressBarWithAllProps() {
  return (
    <LinearProgressBar
      error
      errorMessage="msg"
      light
      showProgressIndication
      value={40}
      skin="success"
      dataHook="hook"
    />
  );
}

async function testkits() {
  const testkit = linearProgressBarTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div')
  });

  const enzymeTestkit = linearProgressBarEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />)
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await linearProgressBarPuppeteerTestkitFactory({
    dataHook: 'hook',
    page
  });
}
