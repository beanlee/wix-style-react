import React from 'react';
import {
  header,
  tabs,
  tab,
  title,
  description,
  importExample,
  divider,
  example as baseExample,
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

import { storySettings } from './storySettings';
import Accordion from '..';
import RichTextInputArea from '../../RichTextInputArea';
import { buttonTypes } from '../constants';

import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

const item = config => ({
  title: 'Item',
  icon: <InfoCircle />,
  expandLabel: 'See More',
  collapseLabel: 'Less',
  children: examples.text,
  ...config,
});

const exampleItems = [
  {
    label: 'Two Rows',
    value: [
      item({
        title: 'First Row',
      }),
      item({
        title: 'Second Row',
      }),
    ],
  },

  {
    label: 'Three Rows having a button',
    value: [
      item({
        title: 'First Row',
      }),
      item({
        title: 'Second Row',
      }),

      item({
        title: 'Third Row With Editor',
        buttonType: buttonTypes.button,
        expandLabel: 'Show Editor',
        collapseLabel: 'Hide Editor',
        children: <RichTextInputArea />,
      }),
    ],
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Accordion,
  componentPath: '..',

  componentProps: {
    itemsHook: storySettings.itemsHook,
    items: exampleItems[0].value,
    multiple: false,
  },

  exampleProps: {
    items: exampleItems,
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(`Component for collapsible content`),

          importExample("import { Accordion } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Simple Usage', source: examples.simple }),
          example({ title: 'With Button & Icon', source: examples.withButton }),
          example({
            title: 'Multiple with Initially Open',
            source: examples.multiple,
          }),
          example({
            title: 'Disabled Accordion Rows',
            source: examples.disabled,
          }),
          example({ title: 'Usage in Card', source: examples.inCard }),
          example({ title: 'Skins', source: examples.skins }),
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
