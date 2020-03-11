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
import * as examples from './examples';

import SidebarHeader from '..';
import Box from '../../Box';
import LinearProgressBar from '../../LinearProgressBar';

const example = config => baseExample({ components: allComponents, ...config });

const titleExamples = [
  { label: 'Short', value: 'Site Name' },
  {
    label: 'Long',
    value:
      'This is a very long title which exceeds the maximum width of its container',
  },
];

const subtitleExamples = [
  { label: 'Short', value: 'Role: Owner' },
  {
    label: 'Long',
    value:
      'This is a very long subtitle which exceeds the maximum width of its container',
  },
];

const childrenExamples = [
  {
    label: 'Progress bar',
    value: (
      <Box marginTop={3}>
        <LinearProgressBar showProgressIndication value={50} />
      </Box>
    ),
  },
];

export default {
  category: storySettings.category,
  storyName: 'SidebarHeader',

  component: SidebarHeader,
  componentPath: '..',

  componentProps: {
    title: titleExamples[0].value,
    subtitle: subtitleExamples[0].value,
  },

  exampleProps: {
    title: titleExamples,
    subtitle: subtitleExamples,
    children: childrenExamples,
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'A header within the sidebar with title, subtitle and custom content at the bottom.',
            }),
          ]),

          importExample("import { SidebarHeader } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'A simple example for a header with title and subtitle',
            source: examples.plain,
          }),

          example({
            title: 'Header with Title, Subtitle and Children',
            text:
              'An example that demonstrates a header with a title, subtitle and custom node child',
            source: examples.titlesWithChildren,
          }),

          example({
            title: 'Header with Children',
            text:
              'An example that demonstrates a header with just a custom node child',
            source: examples.onlyChildren,
          }),

          example({
            title: 'Header with Ellipsis',
            text:
              'An example that demonstrates a header with a very long title which exceeds the maximum width of its container',
            source: examples.ellipsis,
          }),

          example({
            title: 'Light Skin',
            text:
              'This example uses the `<Sidebar/>` to demonstrate the "light" skin design. Notice that when `<SidebarHeader/>` is contained inside `<Sidebar/>`, it affected by the `skin` prop accordingly',
            source: examples.lightSkin,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
