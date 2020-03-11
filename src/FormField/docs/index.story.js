import React from 'react';
import { storySettings } from './storySettings';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';
import exampleCharCount from '!raw-loader!./exampleCharCount';
import {
  header,
  title,
  divider,
  tabs,
  tab,
  api,
  example as baseExample,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';

import FormField from '..';
import Input from '../../Input';
import InputArea from '../../InputArea';
import RichTextInputArea from '../../RichTextInputArea';
import DatePicker from '../../DatePicker';
import Dropdown from '../../Dropdown';
import Checkbox from '../../Checkbox';
import ToggleSwitch from '../../ToggleSwitch';

const ID = 'formFieldId';
const placeholder = 'Default text goes here...';
const childrenExamples = [
  { label: 'Input', value: <Input placeholder={placeholder} id={ID} /> },
  {
    label: 'Input with char counter',
    value: ({ setCharactersLeft }) => (
      <Input
        placeholder={placeholder}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
        id={ID}
      />
    ),
  },
  {
    label: 'InputArea',
    value: <InputArea placeholder={placeholder} id={ID} />,
  },
  {
    label: 'InputArea with char counter',
    value: ({ setCharactersLeft }) => (
      <InputArea
        placeholder={placeholder}
        id={ID}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
      />
    ),
  },

  {
    label: 'RichTextInputArea',
    value: <RichTextInputArea placeholder={placeholder} />,
  },

  {
    label: 'DatePicker',
    value: <DatePicker value={new Date()} onChange={() => undefined} />,
  },

  {
    label: 'Dropdown',
    value: (
      <Dropdown
        placeholder="Select dominant hand"
        options={[
          { id: 0, value: 'Left' },
          { id: 1, value: 'Right' },
          { id: 2, value: 'Ambidextrous' },
        ]}
      />
    ),
  },

  { label: 'Checkbox', value: <Checkbox /> },

  { label: 'ToggleSwitch', value: <ToggleSwitch /> },
];

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: FormField,
  componentPath: '..',

  componentProps: {
    dataHook: 'storybook-formfield',
    children: childrenExamples[0].value,
    label: 'This is an input:',
    labelPlacement: 'top',
    labelAlignment: 'middle',
    required: true,
    infoContent: 'I help you to fill info',
    stretchContent: true,
    id: 'formFieldId',
  },

  exampleProps: {
    children: childrenExamples,
    infoTooltipProps: [
      { label: 'placement left', value: { placement: 'left' } },
      { label: 'placement right', value: { placement: 'right' } },
      { label: 'placement top', value: { placement: 'top' } },
      { label: 'placement bottom', value: { placement: 'bottom' } },
    ],
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <FormField label="Label" infoContent="Tooltip with Information">
            <div
              style={{
                width: '100%',
                height: 30,
                border: '1px dashed #4eb7f5 ',
                borderRadius: 6,
              }}
            />
          </FormField>
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { FormField } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Generic component to help build forms',
            source: examples.generic,
          }),

          example({
            title: 'With tooltip',
            source: examples.withTooltip,
          }),

          example({
            title: 'Label Alignment',
            source: examples.alignment,
          }),

          example({
            title: 'With length count',
            text:
              'When children is function (a.k.a. render prop), it receives setCharactersLeft which can be called with number',
            source: examples.withLength,
          }),

          example({
            title: 'Inline Label With Length Count',
            source: examples.inlineLabelWithLength,
          }),

          example({
            title: 'Length count with charCount property',
            description:
              'An example of displaying remaining character count using charCount prop (instead of render function method).',
            source: exampleCharCount,
          }),
          example({
            title: 'With custom suffix',
            description:
              'An example that shows custom suffix element. Notice in case there are both `suffix` and `charCount`, the character counter will disappear',
            source: examples.customSuffix,
          }),
          example({
            title: 'Within Grid',
            source: examples.ExampleWithinGrid,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'TestKit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
