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
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import MobilePreviewWidget from '..';

import Box from '../../Box';
import Text from '../../Text';

const code = config => baseCode({ components: allComponents, ...config });

const childrenNodesExamples = [
  {
    label: 'Short Content',
    value: (
      <Box
        align="center"
        verticalAlign="middle"
        height="100%"
        backgroundColor="Y30"
      >
        <Text>Content goes here</Text>
      </Box>
    ),
  },
  {
    label: 'Long Content',
    value: (
      <Box
        align="center"
        verticalAlign="middle"
        height="650px"
        backgroundColor="Y30"
      >
        <Text>Content goes here</Text>
      </Box>
    ),
  },
];

const childNodeString = `<Box align="center" verticalAlign="middle" height="100%" backgroundColor="Y30">
        <Text>Content goes here</Text>
      </Box>`;

export default {
  category: storySettings.category,
  storyName: 'MobilePreviewWidget',

  component: MobilePreviewWidget,
  componentPath: '..',

  componentProps: {
    dataHook: '',
    children: childrenNodesExamples[0].value,
  },

  exampleProps: {
    children: childrenNodesExamples,
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/MobilePreviewWidget/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Mobile preview widget. Displays custom content within a mobile device.',
            }),
          ]),

          columns([
            importExample(
              "import { MobilePreviewWidget } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usage',
            }),

            code({
              compact: true,
              source: `<MobilePreviewWidget>${childNodeString}</MobilePreviewWidget>`,
            }),
          ]),

          description({
            title: 'Skin',
            text:
              'MobilePreviewWidget supports `neutral` (default), `gradient` and `custom` skins. To use `custom` skin, set it to `custom` and use the `backgroundColor` prop with the desired color',
          }),

          code({
            compact: true,
            source: `<Layout cols={2}>
                    <MobilePreviewWidget skin='gradient'>${childNodeString}</MobilePreviewWidget>
                    <MobilePreviewWidget skin='custom' backgroundColor='B10'>${childNodeString}</MobilePreviewWidget>
                   </Layout>`,
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
