import * as React from 'react';
import { mount } from 'enzyme';
import PopoverMenu from '../../src/PopoverMenu';

import { popoverMenuTestkitFactory } from '../../testkit';
import { popoverMenuTestkitFactory as popoverMenuEnzymeTestkitFactory } from '../../testkit/enzyme';

async function testkits() {
  const vanilla = popoverMenuTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  await vanilla.exists();
  await vanilla.isMenuOpen();

  const enzyme = popoverMenuEnzymeTestkitFactory({
    dataHook: 'shbem',
    wrapper: mount(<div />),
  });

  await enzyme.exists();
  await enzyme.isMenuOpen();
}

function PopoverMenuWithMandatoryProps() {
  return <PopoverMenu triggerElement={<div />} />;
}

function PopoverMenuWithAllProps() {
  return (
    <PopoverMenu
      maxWidth={3}
      minWidth={4}
      zIndex={3}
      moveBy={{ x: 3, y: 4 }}
      triggerElement={<div />}
      placement="left"
      textSize="small"
      wrapText={true}
      appendTo="parent"
      flip={true}
      fixed={true}
      showArrow={true}
    >
      <PopoverMenu.MenuItem
        text="SOMETHING"
        skin="dark"
        prefixIcon={<div>hello</div>}
        disabled
      />
      <PopoverMenu.Divider />
    </PopoverMenu>
  );
}
