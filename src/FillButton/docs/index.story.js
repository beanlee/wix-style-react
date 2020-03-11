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
import Box from '../../Box';

import * as examples from './examples';

import FillButton from '..';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'FillButton',

  component: FillButton,
  componentPath: '..',

  componentProps: {
    fill: '',
    tooltipContent: 'hello there',
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/FillButton/',
      component: (
        <Box height="24px">
          <FillButton tooltipContent="Hello there" />{' '}
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
                'Trigger component for swatches like component for adding new itemt in the list of colors, gradiens, images etc.',
            }),
          ]),

          columns([
            importExample("import { FillButton } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          code({
            title: 'Simple Usage',
            subtitle: 'A simple example with compact preview',
            source: examples.simple,
          }),

          code({
            title: 'Fill',
            subtitle: 'Supports gradient and hex color fill',
            source: examples.fill,
          }),

          code({
            title: 'State',
            subtitle: 'Supports disabled state',
            source: examples.state,
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
