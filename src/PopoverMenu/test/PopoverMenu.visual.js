/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import More from 'wix-ui-icons-common/More';
import Add from 'wix-ui-icons-common/Add';
import Edit from 'wix-ui-icons-common/Edit';
import Delete from 'wix-ui-icons-common/Delete';

import PopoverMenu from '../PopoverMenu';
import IconButton from '../../IconButton';
import TextButton from '../../TextButton';
import { popoverMenuTestkitFactory } from '../../../testkit';

const interactiveDataHook = 'interactive-popover-menu';

const menuItems = [
  <PopoverMenu.MenuItem text="option 1" onClick={e => console.log(e)} />,
  <PopoverMenu.MenuItem text="option 2" onClick={e => console.log(e)} />,
  <PopoverMenu.MenuItem text="option 3" onClick={e => console.log(e)} />,
];

const longTextMenuItems = [
  <PopoverMenu.MenuItem
    text="very long message very long message"
    onClick={e => console.log(e)}
  />,
  <PopoverMenu.MenuItem
    text="very long message very long message"
    onClick={e => console.log(e)}
  />,
  <PopoverMenu.MenuItem
    text="very long message very long message"
    onClick={e => console.log(e)}
  />,
];

const menuButtonDataHook = 'menubutton';

const createDriver = dataHook =>
  popoverMenuTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

class InteractiveEyeTest extends React.Component {
  async componentDidMount() {
    this.props.componentDidMount();
  }

  render() {
    const { componentDidMount, children, ...rest } = this.props;

    return (
      <div style={{ marginLeft: '300px', marginTop: '200px' }}>
        <PopoverMenu
          dataHook={interactiveDataHook}
          triggerElement={({ toggle }) => (
            <IconButton dataHook={menuButtonDataHook} onClick={toggle}>
              <More />
            </IconButton>
          )}
          {...rest}
        >
          {children}
        </PopoverMenu>
      </div>
    );
  }
}

const tests = [
  {
    describe: 'menu button',
    its: [
      {
        it: 'icon button',
        props: {
          triggerElement: (
            <IconButton priority="secondary">
              <More />
            </IconButton>
          ),
          children: menuItems,
        },
      },
      {
        it: 'text button',
        props: {
          triggerElement: <TextButton priority="secondary">Actions</TextButton>,
          children: menuItems,
        },
      },
    ],
  },
];

const interactiveTests = [
  {
    describe: 'menu items',
    its: [
      {
        it: 'basic items',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
        },
      },
      {
        it: 'small items',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          textSize: 'small',
        },
      },
      {
        it: 'items with icons',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: [
            <PopoverMenu.MenuItem
              text="Add"
              onClick={e => console.log(e)}
              prefixIcon={<Add />}
            />,
            <PopoverMenu.MenuItem
              text="Edit"
              onClick={e => console.log(e)}
              prefixIcon={<Edit />}
            />,
            <PopoverMenu.MenuItem
              text="Delete"
              onClick={e => console.log(e)}
              prefixIcon={<Delete />}
            />,
          ],
        },
      },
      {
        it: 'disabled items',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: [
            <PopoverMenu.MenuItem
              text="Add"
              onClick={e => console.log(e)}
              disabled
            />,
            <PopoverMenu.MenuItem
              text="Delete"
              onClick={e => console.log(e)}
              disabled
            />,
          ],
        },
      },
      {
        it: 'with  divider',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: [
            <PopoverMenu.MenuItem
              text="Option 1"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 2"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 3"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.Divider />,
            <PopoverMenu.MenuItem
              text="Option 4"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 5"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 6"
              onClick={e => console.log(e)}
            />,
          ],
        },
      },
      {
        it: 'with  divider & small text',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: [
            <PopoverMenu.MenuItem
              text="Option 1"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 2"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 3"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.Divider />,
            <PopoverMenu.MenuItem
              text="Option 4"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 5"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Option 6"
              onClick={e => console.log(e)}
            />,
          ],
          textSize: 'small',
        },
      },
      {
        it: 'different skins',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: [
            <PopoverMenu.MenuItem
              text="Normal"
              onClick={e => console.log(e)}
            />,
            <PopoverMenu.MenuItem
              text="Destructive"
              onClick={e => console.log(e)}
              skin={'destructive'}
            />,
          ],
        },
      },
    ],
  },
  {
    describe: 'arrow',
    its: [
      {
        it: 'with arrow',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
        },
      },
      {
        it: 'without arrow',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          showArrow: false,
          triggerElement: ({ toggle }) => (
            <TextButton
              priority="secondary"
              dataHook={menuButtonDataHook}
              onClick={toggle}
            >
              Actions
            </TextButton>
          ),
        },
      },
    ],
  },
  {
    describe: 'placements',
    its: [
      {
        it: 'top',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'top',
        },
      },
      {
        it: 'top-start',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'top-start',
        },
      },
      {
        it: 'top-end',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'top-end',
        },
      },
      {
        it: 'right',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'right',
        },
      },
      {
        it: 'right-start',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'right-start',
        },
      },
      {
        it: 'right-end',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'right-end',
        },
      },
      {
        it: 'bottom',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'bottom',
        },
      },
      {
        it: 'bottom-start',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'bottom-start',
        },
      },
      {
        it: 'bottom-end',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'bottom-end',
        },
      },
      {
        it: 'left',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'left',
        },
      },
      {
        it: 'left-start',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'left-start',
        },
      },
      {
        it: 'left-end',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'left-end',
        },
      },
    ],
  },
  {
    describe: 'placements without arrow',
    its: [
      {
        it: 'top',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'top',
          showArrow: false,
        },
      },
      {
        it: 'right',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'right',
          showArrow: false,
        },
      },
      {
        it: 'bottom',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'bottom',
          showArrow: false,
        },
      },
      {
        it: 'left',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: menuItems,
          placement: 'left',
          showArrow: false,
        },
      },
    ],
  },
  {
    describe: 'text wrap',
    its: [
      {
        it: 'false',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: longTextMenuItems,
        },
      },
      {
        it: 'true',
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          const iconButton = await driver.getTriggerElement(menuButtonDataHook);
          await iconButton.click();
        },
        props: {
          children: longTextMenuItems,
          wrapText: true,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`PopoverMenu${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <div style={{ marginLeft: '300px', marginTop: '200px' }}>
          <PopoverMenu {...props} />
        </div>
      ),
    );
  });
});

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(`PopoverMenu${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <InteractiveEyeTest {...props} componentDidMount={componentDidMount} />
      ),
    );
  });
});
