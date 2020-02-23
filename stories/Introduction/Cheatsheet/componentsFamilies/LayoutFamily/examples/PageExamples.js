/* eslint-disable no-console */
import React, { Component } from 'react';
import { SingleComponentStacked } from '../../../sharedComponents';
import { layoutSymbolsToComponents } from '../../../../../symbolsComponentsMapping/families/layoutFamily';

import { layoutSymbols } from '../../../../../symbolsComponentsMapping/symbols';

import {
  createLinkedSymbolName,
  createLinkedComponentsNames,
} from '../../../sharedComponents/utils';

import Card from 'wix-style-react/Card';
import Page from 'wix-style-react/Page';
import Box from 'wix-style-react/Box';
import { Row, Col, Container } from 'wix-style-react/Grid';
import Button from 'wix-style-react/Button';
import TextButton from 'wix-style-react/TextButton';
import Add from 'wix-ui-icons-common/Add';
import More from 'wix-ui-icons-common/More';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import IconButton from 'wix-style-react/IconButton';
import EmptyState from 'wix-style-react/EmptyState';
import { Category } from '../../../../../storiesHierarchy';

class ExamplePageWithCard extends Component {
  renderHeader() {
    const ActionBar = () => {
      return (
        <Box>
          <Box>
            <PopoverMenu
              triggerElement={
                <IconButton skin="inverted">
                  <More />
                </IconButton>
              }
            >
              <PopoverMenu.MenuItem
                onClick={() => console.log('PopoverMenu.MenuItem onClick')}
                text="Refresh"
              />
              <PopoverMenu.MenuItem
                onClick={() => console.log('PopoverMenu.MenuItem onClick')}
                text="Trash"
              />
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
            onClick={() => console.log('Breadcrumbs onClick')}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }

  render() {
    return (
      <Page upgrade>
        {this.renderHeader()}
        <Page.Content>
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header title="Card Title" />
                  <Card.Content>
                    <Box height="150px" />
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

class ExamplePageEmptyState extends Component {
  renderHeader() {
    const ActionBar = () => <Button prefixIcon={<Add />}>New Item</Button>;

    return (
      <Page.Header
        title="Page Title"
        breadcrumbs={
          <Breadcrumbs
            items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
            activeId="3"
            size="medium"
            theme="onGrayBackground"
            onClick={() => console.log('Breadcrumbs onClick')}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }

  render() {
    return (
      <Page upgrade>
        {this.renderHeader()}
        <Page.Content>
          <Container>
            <Row>
              <Col>
                <EmptyState
                  image={
                    <Box
                      height="120px"
                      width="120px"
                      backgroundColor="D60"
                      borderRadius="50%"
                    />
                  }
                  subtitle="Create your product item in an easy & fast way to display it on your site"
                  theme="page"
                  title="You don't have any items yet"
                >
                  <TextButton prefixIcon={<Add />}>New Item</TextButton>
                </EmptyState>
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }
}

const PageExamples = () => {
  const symbol = layoutSymbols.pageLayout;
  const components = layoutSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.LAYOUT, symbol }),
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentStacked {...singleComponentProps}>
      <ExamplePageWithCard />
      <Box height="30px" backgroundColor="D80" />
      <ExamplePageEmptyState />
    </SingleComponentStacked>
  );
};

export default PageExamples;
