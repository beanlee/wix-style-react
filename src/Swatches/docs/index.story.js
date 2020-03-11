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

import Swatches from '..';
import * as examples from './examples';

const code = config => baseCode({ components: allComponents, ...config });
const colors3 = ['cyan', 'yellow', 'pink'];
const colors6 = ['cyan', 'yellow', 'pink', '#fff', 'rgb(0, 0, 0)', '#aeaeae'];

export default {
  category: storySettings.category,
  storyName: 'Swatches',

  component: Swatches,
  componentPath: '..',

  componentProps: setProps => ({
    onClick: value => setProps({ selected: value }),
    colors: colors3,
  }),

  hiddenProps: ['size'],

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
    colors: [
      { label: colors3.toString(), value: colors3 },
      { label: colors6.toString(), value: colors6 },
    ],
    size: [
      { label: 'small', value: 'small' },
      { label: 'medium', value: 'medium' },
    ],
    showClear: [
      { label: 'true', value: true },
      { label: 'false', value: false },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Swatches/',
      component: (
        <div style={{ width: '204px' }}>
          <Swatches colors={colors6} />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Displays given colors with clickable swatches.',
            }),
          ]),

          importExample("import { Swatches } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            title: 'Simple Usage',
            subtitle:
              'Pass color string array in `colors` prop. Any css valid color works.',
            source: examples.simple,
          }),

          code({
            title: 'Columns',
            subtitle:
              "Swatches uses `grid` layout with default `12px` gap. Each swatch preserves square proportion and adjust based on the number of columns, grid gap and container's width. ",
            source: examples.columns,
          }),

          code({
            title: 'No Color',
            subtitle: 'Pass `showClear` prop to get no color option.',
            source: examples.nocolor,
          }),

          code({
            title: 'Add button',
            subtitle:
              'Pass `showAddButton` prop to get the Add Color button that includes color picker on click.',
            source: examples.add,
          }),

          code({
            title: 'Full Interactive Preview',
            description:
              'Example with selectable items and working add button.',
            source: examples.full,
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
