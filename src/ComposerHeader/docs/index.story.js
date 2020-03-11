import React from 'react';
import ArrowRight from 'wix-ui-icons-common/ArrowRight';
import Undo from 'wix-ui-icons-common/Undo';
import Redo from 'wix-ui-icons-common/Redo';

import TextButton from '../../TextButton';
import Button from '../../Button';
import ToggleButton from '../../ToggleButton';

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

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import ComposerHeader from '..';
import compound from './compound.md';

import * as examples from './examples';

const code = config => baseCode({ components: allComponents, ...config });

const size = 'medium';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ComposerHeader,
  componentPath: '../',

  hiddenProps: ['dataHook'],

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/ComposerHeader/',
      component: (
        <ComposerHeader backButtonValue="Back to Social Posts" size={size}>
          <ComposerHeader.Actions justifyContent="flex-start">
            <TextButton skin="premium" size={size}>
              Upgrade
            </TextButton>
          </ComposerHeader.Actions>
          <ComposerHeader.Actions
            justifyContent="flex-end"
            saveStatusValue="Saving..."
          >
            <ToggleButton tooltipContent="Undo">
              <Undo />
            </ToggleButton>
            <ToggleButton tooltipContent="Redo">
              <Redo />
            </ToggleButton>
          </ComposerHeader.Actions>
          <ComposerHeader.MainActions>
            <Button size={size} skin="inverted">
              Preview
            </Button>
            <Button size={size} suffixIcon={<ArrowRight />}>
              Next
            </Button>
          </ComposerHeader.MainActions>
        </ComposerHeader>
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
                'ComposerHeader contains main navigation actions – back button on the left and confirm actions on the right. It also has a "save" state preview and supports multiple custom actions. Use to build interfaces to edit photos, create albums, newsletters and similar.',
            }),
          ]),

          columns([
            importExample("import { ComposerHeader } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          code({
            title: 'Back Button',
            subtitle: 'Navigation button.The styling is not changeable.',
            compact: true,
            source: examples.back,
          }),

          code({
            title: 'Main Actions',
            subtitle:
              'Main actions are always attached to the end of the composer header.',
            compact: true,
            source: examples.main,
          }),

          code({
            title: 'Additional Actions',
            subtitle:
              'Additional actions can be added between back and main actions. All of Composer.Actions suppoert any valid css prop for style tag.',
            compact: true,
            source: examples.actions,
          }),

          code({
            title: 'Dividers',
            subtitle:
              'Component automatically creates left divider for first Composer.Actions item that has justifyContent="flex-start" and right divider for last Composer.Actions that has justifyContent="flex-end"',
            compact: true,
            source: examples.dividers,
          }),

          code({
            title: 'Save Status',
            subtitle:
              'Component has a predefined style to display a save status – saved, saving, unsaved, failed.',
            compact: true,
            source: examples.save,
          }),

          code({
            title: 'Size',
            subtitle:
              'ComposerHeader supports two sizes – small and medium. Small is for modal and medium for page layouts.',
            compact: true,
            source: examples.size,
          }),

          code({
            title: 'Shadow',
            subtitle:
              'ComposerHeader can be "elevated" state by having a shadow effect',
            compact: true,
            source: examples.shadow,
          }),
        ],
      }),

      ...[
        { title: 'ComposerHeader API', sections: [api()] },
        { title: 'Compound Components API', sections: [description(compound)] },
        { title: 'Testkit', sections: [testkit()] },
      ].map(tab),
    ]),
  ],
};
