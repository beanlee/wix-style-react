import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import { Container, Row, Col } from 'wix-style-react/Grid';
import Add from 'wix-ui-icons-common/Add';
import { ExamplePageContainer } from './ExamplePageContainer';
import { LongTextContent } from './SomeContentComponent';

const ExampleStandard = () => (
  <ExamplePageContainer>
    <Page>
      <Page.Header
        title="Your Product"
        actionsBar={<Button prefixIcon={<Add />}>New Item</Button>}
      />

      <Page.Content>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header title="Catchy Header" />
                <Card.Content>
                  <LongTextContent />
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </Page>
  </ExamplePageContainer>
);

export default ExampleStandard;
