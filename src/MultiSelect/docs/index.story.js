import React from 'react';
import MultiSelect from '..';

import {
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  api,
  testkit,
  title,
  code as baseCode,
} from 'wix-storybook-utils/Sections';

import readmeApi from '../README.API.md';
import readmeTestkit from '../README.TESTKIT.md';
import playgroundStoryConfig from './MultiSelectPlaygroundConfig';
import allComponents from '../../../stories/utils/allComponents';

import ExampleSelectSimpleRaw from '!raw-loader!./ExampleSelectSimple';
import ExampleSelectAutocompleteRaw from '!raw-loader!./ExampleSelectAutocomplete';

import ExampleSuggestionsRaw from '!raw-loader!./ExampleSuggestions';
import ExampleTagInputRaw from '!raw-loader!./ExampleTagInput';
import ExampleTagInputSelectionRaw from '!raw-loader!./ExampleTagInputSelection';
import ExampleForHeader from './ExampleForHeader';

import ExampleReorderableRaw from '!raw-loader!./ExampleReorderable';

import { storySettings } from './storySettings';

const code = config =>
  baseCode({
    components: allComponents,
    compact: true,
    autoRender: false,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MultiSelect,

  componentPath: '..',
  ...playgroundStoryConfig,

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/MultiSelect',
      component: (
        <div style={{ width: '50%' }}>
          <ExampleForHeader />
        </div>
      ),
    }),
    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { MultiSelect } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          ...[
            { title: 'Select', source: ExampleSelectSimpleRaw },
            {
              title: 'Select + Autocomplete',
              source: ExampleSelectAutocompleteRaw,
            },
            { title: 'Tag Input', source: ExampleTagInputRaw },
            { title: 'Tag Input + Suggestions', source: ExampleSuggestionsRaw },
            {
              title: 'Tag Input + Selection',
              source: ExampleTagInputSelectionRaw,
            },
            { title: 'Reorderable', source: ExampleReorderableRaw },
          ].map(code),
        ],
      }),

      ...[
        { title: 'API', sections: [api(), description(readmeApi)] },
        { title: 'Testkit', sections: [description(readmeTestkit), testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
