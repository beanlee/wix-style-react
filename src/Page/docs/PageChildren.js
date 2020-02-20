import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Box from 'wix-style-react/Box';
import IconButton from 'wix-style-react/IconButton';
import PopoverMenu from 'wix-style-react/beta/PopoverMenu';
import More from 'wix-ui-icons-common/More';

import SomeContentComponent from './SomeContentComponent';
import SomeTailComponent from './SomeTailComponent';
import Breadcrumbs from './Breadcrumbs';

const ActionsBar = () => {
  return (
    <Box>
      <Box>
        <PopoverMenu
          dataHook="example-page-header-popover-menu"
          triggerElement={
            <IconButton
              skin="inverted"
              dataHook="page-header-popover-menu-button"
            >
              <More />
            </IconButton>
          }
        >
          <PopoverMenu.MenuItem onClick={() => {}} text="Refresh" />
          <PopoverMenu.MenuItem onClick={() => {}} text="Trash" />
          <PopoverMenu.MenuItem onClick={() => {}} text="Edit" />
        </PopoverMenu>
      </Box>
      <Box marginLeft="small" marginRight="small">
        <Button skin="light">Cancel</Button>
      </Box>
      <Box>
        <Button>Save</Button>
      </Box>
    </Box>
  );
};

export const header = props => (
  <Page.Header
    dataHook="example-page-header"
    title="Page Title"
    subtitle="Page subtitle"
    showBackButton
    onBackClicked={() => {}}
    actionsBar={<ActionsBar />}
    breadcrumbs={Breadcrumbs}
    {...props}
  />
);

export const content = props => (
  <Page.Content>
    <SomeContentComponent {...props} />
  </Page.Content>
);

export const tail = (
  <Page.Tail>
    <SomeTailComponent />
  </Page.Tail>
);

export const fixedContent = (
  <Page.FixedContent>
    <div
      style={{
        padding: '10px 0px',
        background: 'blue',
      }}
    >
      This is a fixedContent
    </div>
  </Page.FixedContent>
);
