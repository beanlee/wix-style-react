import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  columns,
  playground,
  api,
  importExample,
  divider,
  testkit,
  example as baseExample,
  title,
} from 'wix-storybook-utils/Sections';
import Text, { SIZES, SKINS, WEIGHTS } from '..';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

import { storySettings } from '../test/storySettings';
import { Layout, Cell } from '../../Layout';
import SectionHelper from '../../SectionHelper';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Text,
  componentPath: '../Text.js',

  componentProps: {
    children: 'Some text',
    light: false,
    dataHook: 'storybook-text',
    size: SIZES.medium,
    secondary: false,
    skin: SKINS.standard,
    weight: WEIGHTS.thin,
    tagName: 'span',
    ellipsis: false,
  },

  sections: [
    header({
      component: (
        <Layout>
          <Cell span={8}>
            <Text>
              The Life and Strange Surprizing Adventures of Robinson Crusoe, Of
              York, Mariner: Who lived Eight and Twenty Years, all alone in an
              un-inhabited Island on the Coast of America, near the Mouth of the
              Great River of Oroonoque; Having been cast on Shore by Shipwreck,
              wherein all the Men perished but himself. With An Account how he
              was at last as strangely deliver'd by Pyrates.
            </Text>
          </Cell>
        </Layout>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Text is a a component that makes general text appear in Wix Style. It supports three sizes, three weigths and has multiple skin colors. Use it to build any text content.',
            }),
          ]),

          importExample("import { Text } from 'wix-style-react';"),

          columns([
            description({
              text: (
                <SectionHelper title="Load Wix fonts from CDN:">{`<link rel="stylesheet" href="//static.parastorage.com/services/third-party/fonts/Helvetica/fontFace.css"></link>`}</SectionHelper>
              ),
            }),
          ]),

          divider(),

          title('Examples'),

          example({
            title: 'Skins',
            text:
              'Text component supports four different styles of skins. Each skin is represents a specific use case. `Standard` skin can be placed on colored backrounds, while other skins should be used only on white or grey.',
            source: examples.skins,
          }),

          example({
            title: 'Light',
            text:
              'Text can appear on dark or light backgrounds. Use `light` prop to keep text in a high contrast.',
            source: examples.light,
          }),

          example({
            title: 'Secondary',
            text:
              'Text component supports secondary styling for `standard` and `light` skins.',
            source: examples.secondary,
          }),

          example({
            title: 'Weight',
            text:
              'Text component supports three weights – `thin`, `normal` and `bold`. Each weight represents a specific use case.',
            source: examples.weight,
          }),

          example({
            title: 'Size',
            text:
              'Text component supports three sizes – `medium`, `small` and `tiny`. Default size is `medium`.',
            source: examples.size,
          }),

          example({
            title: 'Inline Link',
            text:
              'Text component provides a style for html based links. Use them when text links are multiline or inline.',
            source: examples.link,
          }),

          example({
            title: 'Ellipsis',
            text:
              'Text component can wrap the text or show ellipsis. Hidden text appears on hover in a tooltip. Setting `showTooltip` prop to `false` allows showing ellipsis without tooltip.',
            source: examples.ellipsis,
          }),

          example({
            title: `Tooltip Width`,
            text:
              'Maximum width of tooltip can be adjusted with `maxWidth` prop.',
            source: examples.maxwidth,
          }),

          example({
            title: 'TagName',
            text: 'Control the rendered HTML tag.',
            source: examples.custom,
          }),

          example({
            title: 'Lists',
            text: 'Text component provides a style for HTML based lists.',
            source: examples.list,
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
