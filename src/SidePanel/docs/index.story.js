import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import FixedExample from '!raw-loader!./FixedPositionExample';

import SidePanel from '..';
import compoundReadmeApi from '../COMPOUND_README.API.md';
import Box from '../../Box';

const example = config => baseExample({ components: allComponents, ...config });

const importDeclaration = `
import { SidePanel } from 'wix-style-react';
const { Header, Content, Footer } = SidePanel;
`;

export default {
  category: storySettings.category,
  storyName: 'SidePanel',

  component: SidePanel,
  componentPath: '..',

  componentProps: {
    children: (
      <>
        <SidePanel.Header title="Title" infoTooltipContent="Tooltip" />
        <SidePanel.Content>
          <Box height="250px">
            <Box margin="auto">content goes here</Box>
          </Box>
        </SidePanel.Content>
        <SidePanel.Footer>
          <Box height="20px">Footer</Box>
        </SidePanel.Footer>
      </>
    ),
  },

  sections: [
    header({
      component: <SidePanel buttonText="Click me!" />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'A Side Panel container component, created to display a panel with header, content and footer. e.g. Filters',
            }),
          ]),

          importExample(importDeclaration),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'A simple example of panel with header, content and footer',
            source: `
<SidePanel onCloseButtonClick={() => alert('click!')}>
  <SidePanel.Header
    title="Title"
    infoTooltipContent="Tooltip"
  />
  <SidePanel.Content>
    <Box background="#fafafa" height="200px" align="center" verticalAlign="middle">
      content goes here
    </Box>
  </SidePanel.Content>
  <SidePanel.Footer>
    <Box align="right">
      <Button>Action</Button>
    </Box>
  </SidePanel.Footer>
</SidePanel>
`,
          }),

          example({
            title: 'Custom Header title element',
            text:
              'Change the header text to be a custom element, for example a search-bar',
            source: `
<SidePanel onCloseButtonClick={() => alert('click!')}>
  <SidePanel.Header title={<Search value="" options={[]}/>}></SidePanel.Header>
  <SidePanel.Content>
    <Box background="#fafafa" height="50px" align="center" verticalAlign="middle">
      content goes here
    </Box>
  </SidePanel.Content>
</SidePanel>
`,
          }),

          example({
            title: 'Custom Header children',
            text:
              'In addition to the header title, you can provide an element to be below the header but still a part of it',
            source: `
<SidePanel onCloseButtonClick={() => alert('click!')}>
  <SidePanel.Header title="Title">
    <Tabs
      items={[
        { id: 1, title: 'First Tab'},
        { id: 2, title: 'Second Tab' },
      ]}
      activeId={1}
      type="uniformSide"
      width="174px"
    />
  </SidePanel.Header>
  <SidePanel.Content>
    <Box background="#fafafa" height="50px" align="center" verticalAlign="middle">
      content goes here
    </Box>
  </SidePanel.Content>
</SidePanel>
`,
          }),

          example({
            title: 'Sectioned content',
            text:
              'We recommend using <SidePanel.Content> for each section with <SidePanel.Divider> between them.',
            source: `
<SidePanel>
  <SidePanel.Header title="Title">
  </SidePanel.Header>
  <SidePanel.Content>
    <Box background="#fafafa" height="100px" align="center" verticalAlign="middle">
      First content block
    </Box>
  </SidePanel.Content>

  <SidePanel.Divider/>

  <SidePanel.Content>
    <Box background="#fafafa" height="100px" align="center" verticalAlign="middle">
      Second content block
    </Box>
  </SidePanel.Content>
</SidePanel>
          `,
          }),

          example({
            title: 'An advanced example',
            text:
              'Full height, fixed position panel. In this example, we built a filters panel',
            source: FixedExample,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        {
          title: 'Compound components API',
          sections: [description(compoundReadmeApi)],
        },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
