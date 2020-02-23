/* eslint-disable */
import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';

import Box from 'wix-style-react/Box';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import IconButton from 'wix-style-react/IconButton';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import { Row, Col, Container } from 'wix-style-react/Grid';

class ExampleSplitLayout extends React.Component {
  renderHeader() {
    const ActionBar = () => {
      return (
        <Box>
          <Box>
            <PopoverMenu
              triggerElement={
                <IconButton skin="inverted">
                  <Icons.More />
                </IconButton>
              }
            >
              <PopoverMenu.MenuItem onClick={() => {}} text="Refresh" />
              <PopoverMenu.MenuItem onClick={() => {}} text="Trash" />
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

    return (
      <Page.Header
        title="Page Title"
        breadcrumbs={
          <Breadcrumbs
            items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
            activeId="3"
            size="medium"
            theme="onGrayBackground"
            onClick={() => {}}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }

  render() {
    const ExampleLongContent = () => <div style={{ height: '550px' }} />;
    const ExampleShortContent = () => <div style={{ height: '250px' }} />;

    return (
      <Page upgrade height="372px">
        {this.renderHeader()}
        <Page.Content>
          <Container>
            <Row stretchViewsVertically>
              <Col span={8}>
                <Card>
                  <Card.Header title="Card Title" />
                  <Card.Content>
                    <ExampleLongContent />
                  </Card.Content>
                </Card>
              </Col>
              <Col span={4}>
                <Card stretchVertically>
                  <Card.Content>
                    <ExampleShortContent />
                  </Card.Content>
                </Card>
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }
}

export default ExampleSplitLayout;
