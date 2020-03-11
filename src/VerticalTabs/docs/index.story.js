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
  api,
  testkit,
} from 'wix-storybook-utils/Sections';
import { storySettings } from './storySettings';
import allComponents from '../../../stories/utils/allComponents';
import VerticalTabs from '..';
import * as examples from './verticalTabsExample';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: VerticalTabs,
  componentPath: '..',

  componentProps: {
    size: 'medium',
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/VerticalTabs/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Vertical Tabs component to be used for easily switching between different side content views.',
            }),
          ]),

          columns([
            importExample("import { VerticalTabs } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          code({
            title: 'Vertical Tabs With Suffix and one Disabled tab',
            source: examples.verticalTabsSuffixExample,
          }),

          code({
            title: 'Vertical Tabs With Suffix - Small Size',
            source: examples.verticalTabsSmallExample,
          }),

          code({
            title: 'Vertical Tabs With Footer',
            source: examples.verticalTabsFooterExample,
          }),

          code({
            title: 'Vertical Tabs - Tab Selection',
            source: examples.verticalTabsSelectedExample,
          }),

          code({
            title: 'Vertical Tabs With Prefix and Multiple Tab Groups',
            source: examples.verticalTabsExample,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
      ].map(tab),
    ]),
  ],
};
