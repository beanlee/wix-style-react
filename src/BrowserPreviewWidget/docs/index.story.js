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

import BrowserPreviewWidget from '..';
import Box from 'wix-style-react/Box';
import Text from 'wix-style-react/Text';

import { skins, browserBarSizes } from '../constants';

const example = config => baseExample({ components: allComponents, ...config });

const childNode = (
  <Box padding="20px" backgroundColor="Y30">
    <Text>Content goes here</Text>
  </Box>
);

const childNodeString = `<Box padding="20px" backgroundColor="Y30">
        <Text>Content goes here</Text>
      </Box>`;

export default {
  category: storySettings.category,
  storyName: 'BrowserPreviewWidget',

  component: BrowserPreviewWidget,
  componentPath: '..',

  componentProps: {
    dataHook: 'browser-preview-widget-story',
    skin: skins.neutral,
    backgroundColor: '',
    browserBarSize: browserBarSizes.size12,
    height: '100%',
    width: '100%',
    children: childNode,
  },

  sections: [
    header({
      component: (
        <BrowserPreviewWidget
          browserBarSize="size9"
          height="130px"
          width="230px"
        >
          {childNode}
        </BrowserPreviewWidget>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'Browser preview widget. Displays custom content within a browser display.',
          }),

          importExample(
            "import { BrowserPreviewWidget } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Skin',
            text:
              'BrowserPreviewWidget supports `neutral` (default), `gradient` and `custom` skins. To use custom skin, set it to `custom` and use the `backgroundColor` prop with the desired color',
            source: `<Layout>
                <Cell>
                    <BrowserPreviewWidget browserBarSize="${browserBarSizes.size9}">${childNodeString}</BrowserPreviewWidget>
                </Cell>
                <Cell>
                    <BrowserPreviewWidget browserBarSize="${browserBarSizes.size9}" skin='gradient'>${childNodeString}</BrowserPreviewWidget>
                </Cell>
                <Cell>
                    <BrowserPreviewWidget browserBarSize="${browserBarSizes.size9}" skin='custom' backgroundColor='B10'>${childNodeString}</BrowserPreviewWidget>
                </Cell>
              </Layout>`,
          }),

          example({
            title: 'Browser Bar Size',
            text: `BrowserPreviewWidget supports 4 browser bar sizes: \`${browserBarSizes.size9}\`, \`${browserBarSizes.size12}\` (default), \`${browserBarSizes.size18}\` and \`${browserBarSizes.size24}\`.
| Browser Bar Height | Width |
| --- | --- |
| ${browserBarSizes.size9} | 0 < w < 312 |
| ${browserBarSizes.size12} | 312 ≤ w < 444 |
| ${browserBarSizes.size18} | 444 ≤ w < 660 |
| ${browserBarSizes.size24} | 660 ≤ w |
`,
            source: `<Layout>
                <Cell>
                  <BrowserPreviewWidget browserBarSize="${browserBarSizes.size9}">
                    <Box width="250px" height="100px" backgroundColor="Y30"/>
                  </BrowserPreviewWidget>
                </Cell>
                <Cell>
                  <BrowserPreviewWidget>
                    <Box width="350px" height="100px" backgroundColor="Y30"/>
                  </BrowserPreviewWidget>
                </Cell>
                <Cell>
                  <BrowserPreviewWidget browserBarSize="${browserBarSizes.size18}">
                    <Box width="450px" height="100px" backgroundColor="Y30"/>
                  </BrowserPreviewWidget>
                </Cell>
                <Cell>
                  <BrowserPreviewWidget browserBarSize="${browserBarSizes.size24}">
                    <Box width="700px" height="100px" backgroundColor="Y30"/>
                  </BrowserPreviewWidget>
                </Cell>
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
