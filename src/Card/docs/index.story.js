import {
  api,
  tabs,
  tab,
  title,
  code as baseCode,
  description,
  importExample,
  header,
  divider,
} from 'wix-storybook-utils/Sections';

import Card from '..';

import { storySettings } from './storySettings';
import allComponents from '../../../stories/utils/allComponents';

import CompoundComponentsRaw from '!raw-loader!./CompoundComponents.md';

const code = config =>
  baseCode({
    components: allComponents,
    compact: false,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Card,
  componentPath: '../Card.js',

  componentProps: {},

  sections: [
    header({}),
    tabs([
      tab({
        title: 'Usage',
        sections: [
          description({
            title: 'Description',
            description:
              'Card is a compound component for any content to be displayed in a styled block. This is one of the basic building blocks and combined well with Grid component',
          }),

          importExample(`
import { Card } from 'wix-style-react';
const { Header, Subheader, Content, Divider} = Card;
            `),

          divider(),

          title('Basic Examples'),
          ...[
            {
              title: 'Basic',
              description:
                'A simple card simply apply default styles background, for any custom layout',
              source: `
                <Card>
                  <Box height="160px"/>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Header',
              description:
                "Card's heading area that can contain title, subtitle and action area using <Card.Header/>",
              source: `
                <Card>
                  <Card.Header title="Card title" subtitle="This is how a subtitle looks like" suffix={<Button prefixIcon={<Icons.Add/>}>New Item</Button>}/>
                  <Box height="160px"/>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Sub Header',
              description:
                "Card's sub-header is and area that can contain title and additional action using <Card.Subheader/>",
              source: `
                <Card>
                  <Card.Header title="Order Summary" withoutDivider/>
                  <Card.Subheader title="Products to Fulfill" suffix={<Button size="tiny">Create Label</Button>}/>
                  <Box height="160px"/>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Sub Header',
              description:
                "Card's divider and be applied between different content using <Card.Divider/>",
              source: `
                <Card>
                  <Box height="42px"/>
                  <Card.Divider/>
                  <Box height="42px"/>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Content',
              description:
                "Card's content area that can contain any custom content, for example forms using the <Card.Content/>",
              source: `
                <Card>
                  <Card.Content>
                    <Container fluid>
                      <Row>
                        <Col span={6}>
                          <FormField label="form field">
                            <Input/>
                          </FormField>
                        </Col>
                        <Col span={6}>
                          <FormField label="form field">
                            <Input/>
                          </FormField>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Content>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Controls',
              description:
                'Set the `controls` property to make controls appear on the card',
              source: `
                <Card controls={<CloseButton />}>
                  <Box height="160px"/>
                </Card>
                `,
              compact: false,
            },
            {
              title: 'Collapsable',
              description:
                'A collapsed card behavior can be achieved by using the <Collapse/> component which is a proxy for `react-collapse`',
              source: `
                class CollapsableCard extends React.Component {
                  state = { isOpen: true };
                  render() {
                    return (
                      <Card>
                        <Card.Header
                          title="Card with collapsable content"
                          withoutDivider={!this.state.isOpen}
                          suffix={
                            <ToggleSwitch checked={this.state.isOpen} onChange={() => this.setState({isOpen: !this.state.isOpen})}/>
                          }
                        />
                        <Collapse open={this.state.isOpen}>
                          <Card.Content>
                            <Box height="160px"/>
                          </Card.Content>
                        </Collapse>
                      </Card>
                    );
                  }
                }
                `,
              compact: false,
            },
          ].map(code),

          divider(),

          title('Layout Examples'),

          ...[
            {
              title: 'Card Layout',
              description:
                'In most cases a card will be placed on top of a Grid',
              source: `
                <Container>
                  <Row>
                    <Col span={8}>
                      <Card>
                        <Card.Header title="First Card"/>
                        <Card.Content>
                          <EmptyState
                            title="You don't have any items yet"
                            subtitle="Create your product item in an easy & fast way to display it on your site"
                            theme="section"
                          >
                            <TextButton prefixIcon={<Icons.Add />}>New Item</TextButton>
                          </EmptyState>
                        </Card.Content>
                      </Card>
                    </Col>
                    <Col span={4}>
                      <Card>
                        <Card.Header title="Second Card"/>
                        <Card.Content>
                          <Box align="center">
                            <Avatar size="size72"/>
                          </Box>
                        </Card.Content>
                      </Card>
                    </Col>
                  </Row>
                </Container>
                `,
              compact: true,
            },
          ].map(code),
        ],
      }),
      ...[
        {
          title: 'API',
          sections: [api()],
        },
        {
          title: 'Compound Components API',
          sections: [
            description({
              title: 'Compound Components APIs',
              text: CompoundComponentsRaw,
            }),
          ],
        },
      ].map(tab),
    ]),
  ],
};
