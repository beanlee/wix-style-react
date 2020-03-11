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

import Text from 'wix-style-react/Text';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import PreviewWidget from '..';
import Box from 'wix-style-react/Box';

import { skins, contentOutlines } from '../constants';

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
  storyName: 'PreviewWidget',

  component: PreviewWidget,
  componentPath: '..',

  componentProps: {
    dataHook: 'preview-story',
    skin: skins.neutral,
    contentOutline: contentOutlines.shadow,
    backgroundColor: '',
    height: '100%',
    width: '100%',
    children: childNode,
  },

  sections: [
    header({
      component: (
        <PreviewWidget height="100px" width="250px">
          {childNode}
        </PreviewWidget>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Preview content widget.',
            }),
          ]),

          importExample("import { PreviewWidget } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Skin',
            text:
              'PreviewWidget supports `neutral` (default), `gradient` and `custom` skins. To use `custom` skin, set it to `custom` and use the `backgroundColor` prop with the desired color',
            source: `<Layout>
                <Cell>
                    <PreviewWidget>${childNodeString}</PreviewWidget>
                </Cell>
                <Cell>
                    <PreviewWidget skin='gradient'>${childNodeString}</PreviewWidget>
                </Cell>
                <Cell>
                    <PreviewWidget skin='custom' backgroundColor='B10'>${childNodeString}</PreviewWidget>
                </Cell>
              </Layout>`,
          }),

          example({
            title: 'Content Outline',
            text:
              'PreviewWidget supports `shadow` (default) and `border` content outline.',
            source: `<Layout>
                <Cell>
                    <PreviewWidget skin="custom" backgroundColor="D80">${childNodeString}</PreviewWidget>
                </Cell>
                <Cell>
                    <PreviewWidget skin="custom" backgroundColor="D80" contentOutline='border'>${childNodeString}</PreviewWidget>
                </Cell>
              </Layout>`,
          }),

          example({
            title: 'Custome Size',
            text:
              'PreviewWidget supports customizing the `height` and `width` of the component. The content area is centered. Default `height` and `width` are `100%` ',
            source: `<Layout>
                <Cell>
                    <PreviewWidget height="200px">${childNodeString}</PreviewWidget>
                </Cell>
                <Cell>
                    <PreviewWidget width="250px">${childNodeString}</PreviewWidget>
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
