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
import * as examples from './examples';
import VariableInput from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'VariableInput',

  component: VariableInput,
  componentPath: '..',

  componentProps: {
    initialValue: 'Hello World!',
    size: 'small',
    variableParser: value => (value === 'page.name' ? 'Page name' : false),
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <VariableInput
            initialValue="VariableInput will render known variables as {{page.name}} tags"
            variableParser={value => {
              return value === 'page.name' ? 'Page name' : false;
            }}
          />
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
              text:
                'Input tags component, allowing to show known variables as [`<Tag/>`](/?path=/story/components-api-components--tag) components',
            }),
          ]),

          importExample("import { VariableInput } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text:
              'This example shows a value that contains plain text and known variable',
            source: examples.simple,
          }),

          example({
            title: 'Size',
            text:
              'Use the `size` prop to select between small, medium and large sizes',
            source: examples.size,
          }),

          example({
            title: 'Rows',
            text:
              'Use the `rows` prop to set the component height based on number of rows',
            source: examples.rows,
          }),

          example({
            title: 'Status',
            text:
              'Add an status (error/warning) indication with possible tooltip',
            source: examples.status,
          }),

          example({
            title: 'Placeholder',
            text:
              'Use the `placeholder` prop to show a message to the user when component is empty',
            source: examples.placeholder,
          }),

          example({
            title: 'Disabled',
            text: 'Use `disabled` attribute to disable the component',
            source: examples.disabled,
          }),

          example({
            title: 'Multiline',
            text:
              'Use `multiline` attribute to control the component scroll direction',
            source: examples.multiline,
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
