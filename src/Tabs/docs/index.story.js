import React from 'react';

import { createAutoExampleWrapper } from '../../../stories/utils/AutoExampleWrapper';
import {
  api,
  example as baseExample,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';
import TabsHeaderExample from './TabsHeaderExample';

const example = config => baseExample({ components: allComponents, ...config });

import { storySettings } from './storySettings';
import Tabs from '../Tabs';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: createAutoExampleWrapper(Tabs),
  componentPath: '..',
  componentProps: setProps => ({
    onClick: value => setProps({ activeId: value.id }),
    activeId: '1',
    hasDivider: true,
    items: [1, 2, 3].map(index => ({
      id: String(index),
      title: `item ${index}`,
    })),
  }),
  sections: [
    header({
      component: <TabsHeaderExample />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `Tabs component enables navigation between content at the same page.`,
          ),

          importExample("import { Tabs } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Basic use', source: examples.base }),
          example({
            title: 'Without bottom divider',
            source: examples.hasDivider,
          }),
          example({ title: 'Tabs types', source: examples.types }),
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
