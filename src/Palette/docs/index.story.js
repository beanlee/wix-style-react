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

import Palette from '..';
import Box from '../../Box/Box';
import allComponents from '../../../stories/utils/allComponents';

import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

const colors3 = [
  'rgb(50, 132, 144)',
  'rgb(50, 183, 198)',
  'rgb(146, 224, 225)',
  'rgb(203, 246, 255)',
  'rgb(229, 250, 248)',
];

const colors6 = ['cyan', 'yellow', 'pink', '#fff', 'rgb(0, 0, 0)', '#aeaeae'];

export default {
  category: storySettings.category,
  storyName: 'Palette',

  component: Palette,
  componentPath: '..',

  componentProps: {
    fill: colors3,
  },
  componentWrapper: ({ component }) => (
    <Box width="100px" height="24px">
      {component}
    </Box>
  ),
  exampleProps: {
    fill: [
      { label: colors3.toString(), value: colors3 },
      { label: colors6.toString(), value: colors6 },
    ],
  },

  sections: [
    header({
      component: (
        <Box width={'200px'} height={'24px'}>
          <Palette fill={colors3} />
        </Box>
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
                'Palette is a list of colors. It can be solid colors, gradients or images. Palette should be used when needed to demonstrate available styles.',
            }),
          ]),

          importExample("import { Palette } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Structure',
            text:
              'Component allows any number of color fills. It splits into equal columns horiontally.',
            source: examples.simple,
          }),
          example({
            title: 'Fill',
            text: 'It can be a palette of solid colors, gradients or images.',
            source: examples.fill,
          }),
          example({
            title: 'Size',
            text:
              'Component by default stretches 100% both vertically and hotizontally. It’s size can be controlled with external parent component.',
            source: examples.size,
          }),

          divider(),

          title('Use Cases'),

          description(
            'Palette can be used inside various components, for example, FormField or Thumbnail.',
          ),

          example({ title: 'Inside FormField', source: examples.formfield }),
          example({
            title: 'Inside Thumbnail',
            source: examples.thumbnailSmall,
          }),
          example({
            title: 'Inside Thumbnail and FormField',
            source: examples.thumbnailBig,
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
