import React from 'react';
import { storySettings } from './storySettings';
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
import allComponents from '../../../stories/utils/allComponents';
import MultiSelectCheckbox from '..';
import * as examples from './examples';

const code = config =>
  baseCode({ components: allComponents, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MultiSelectCheckbox,
  componentPath: '..',

  componentProps: (setState, getState) => ({
    options: examples.options,
    selectedOptions: [],
    onClickOutside: () => {},
    onDeselect: selectedOption => {
      setState({
        selectedOptions: getState().selectedOptions.filter(
          val => val !== selectedOption,
        ),
      });
    },
    onSelect: selectedOption => {
      setState({
        selectedOptions: [...getState().selectedOptions, selectedOption],
      });
    },
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    options: [
      { label: 'One option', value: [{ id: 0, value: 'Just me here' }] },
      { label: `${examples.options.length} options`, value: examples.options },
    ],
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/MultiSelectCheckbox/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'MultiSelectCheckbox component can select multiple values through checkbox',
            }),
          ]),
          importExample(
            "import { MultiSelectCheckbox } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          code({
            source: examples.simple,
            compact: false,
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
