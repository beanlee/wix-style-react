import React from 'react';
import LockLocked from 'wix-ui-icons-common/LockLocked';
import LockUnlocked from 'wix-ui-icons-common/LockUnlocked';
import { Layout, Cell } from 'wix-style-react/Layout';
import {
  tab,
  code,
  description,
  importExample,
  api,
  header,
  tabs,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import SegmentedToggle from '..';

import * as examples from './examples';
import testkit from './testkit.md';

const BasicExample = () => (
  <Layout>
    <Cell span={4}>
      <SegmentedToggle defaultSelected="locked">
        <SegmentedToggle.Button value="locked" prefixIcon={<LockLocked />}>
          Locked
        </SegmentedToggle.Button>
        <SegmentedToggle.Button value="unlocked" prefixIcon={<LockUnlocked />}>
          Unlocked
        </SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
  </Layout>
);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SegmentedToggle,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    defaultSelected: 'locked',
    children: [
      <SegmentedToggle.Button value="locked" prefixIcon={<LockLocked />}>
        Locked
      </SegmentedToggle.Button>,
      <SegmentedToggle.Button value="unlocked" prefixIcon={<LockUnlocked />}>
        Very long fancy and hardly fitting tab
      </SegmentedToggle.Button>,
    ],
  },

  sections: [
    header({
      component: <BasicExample />,
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/SegmentedToggle/SegmentedToggle.js',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `SegmentedToggle is a view group containing typically three or more buttons that can be toggled on and off. These buttons visibly change to indicate whether an option is active or inactive.`,
          ),
          importExample({
            source: "import { SegmentedToggle } from 'wix-style-react';",
          }),

          description({
            title: `Usage`,
            text: `Component includes compound components: Button and Icon. Make sure to pass prop "value" to compound components to enable selection control.`,
          }),

          description({
            title: `Text & Prefix`,
            text: `Icon accompanied by text make information easier to find and scan.`,
          }),

          code({
            source: examples.textAndIcon,
            components: { SegmentedToggle, LockLocked, Layout, Cell },
          }),

          description({
            title: `Text`,
            text: `Simple usecase where prefix icon is not an option.`,
          }),

          code({
            source: examples.text,
            components: { SegmentedToggle, LockLocked, Layout, Cell },
          }),

          description({
            title: `Icon`,
            text: `Icon only option is mostly used in narrow places. This option provides additional tooltip on hover in order to inform users on icons meaning.`,
          }),

          code({
            source: examples.icon,
            components: {
              SegmentedToggle,
              LockLocked,
              LockUnlocked,
              Layout,
              Cell,
            },
          }),

          description({
            title: `Controlled mode`,
            text: `Controlled mode can be enabled by passing 'selected' prop`,
          }),

          code({
            source: examples.controlled,
            components: { SegmentedToggle, LockLocked, Layout, Cell },
          }),

          description({
            title: `Disabled`,
            text: `All component children can be disabled by passing disabled prop.`,
          }),

          code({
            source: examples.disabled,
            components: { SegmentedToggle, LockLocked, Layout, Cell },
          }),
        ],
      }),

      tab({
        title: 'API',
        sections: [api()],
      }),

      tab({
        title: 'Testkit',
        sections: [description(testkit)],
      }),
    ]),
  ],
};
