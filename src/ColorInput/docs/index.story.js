import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  title,
  example as baseExample,
  testkit,
} from 'wix-storybook-utils/Sections';

import ColorInput from '..';
import { placements } from '../../Popover';
import allComponents from '../../../stories/utils/allComponents';

import usage from './Usage.md';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onConfirm: value => setState({ value }),
    size: 'medium',
    error: false,
    errorMessage: '',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    disabled: false,
    onAddColor: () => {},
    addTooltipContent: 'Add Color',
  }),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
    popoverPlacement: placements,
    popoverAppendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
    colorPickerChildren: [
      {
        label: 'Simple Text',
        value: 'I am Color Picker Children!',
      },

      {
        label: 'A <button>',
        value: ({ changeColor }) => (
          <button onClick={() => changeColor('blue')}>Set color to blue</button>
        ),
      },
    ],
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <ColorInput value="#FF0000" popoverAppendTo="window" />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            '🎨 ColorInput is an input which allows to write HEX color manually or pick it from color picker.',
          ),

          importExample("import { ColorInput } from 'wix-style-react';"),

          divider(),

          description({
            title: 'Usage',
            text: usage,
          }),

          title('Examples'),

          example({
            title: 'Controlled',
            text: 'The component is used in controlled mode.',
            source: examples.controlledExample,
          }),

          example({
            title: 'Semi-Controlled',
            text: 'The component returns only valid hex values.',
            source: examples.semiControlledExample,
          }),

          example({
            title: 'Size',
            text: 'ColorInput supports `small`, `medium` and `large` sizes.',
            source: examples.sizes,
          }),

          example({
            title: 'Error, Null and Disabled',
            text: 'ColorInput has `status`, `null` and `disabled` states.',
            source: examples.states,
          }),

          example({
            title: 'colorPickerChildren prop with <Swatches/>',
            text:
              '`<ColorInput/>` accepts `colorPickerChildren` prop which can be a function. It receives `changeColor` function to control `<ColorInput/>` value',
            source: examples.colorPickerChildren,
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
