import * as React from 'react';
import PopoverMenu from '../../src/PopoverMenu';
import * as enzyme from 'enzyme';
import { popoverMenuTestkitFactory } from '../../dist/testkit';
import { popoverMenuTestkitFactory as popoverMenuEnzymeTestkitFactory } from '../../dist/testkit/enzyme';

function PopoverMenuItemWithMandatoryProps() {
  return (
    <PopoverMenu triggerElement={<div />}>
      <PopoverMenu.MenuItem />
    </PopoverMenu>
  );
}

function PopoverMenuItemWithAllProps() {
  return (
    <PopoverMenu triggerElement={<div />} >
      <PopoverMenu.MenuItem />
    </PopoverMenu>
  );
}

async function testkits() {
  const testkit = popoverMenuTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = popoverMenuEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });
}
