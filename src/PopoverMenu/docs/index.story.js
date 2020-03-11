/* eslint-disable no-console */
import React from 'react';

import {
  api,
  code as baseLiveCode,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  title,
} from 'wix-storybook-utils/Sections';

import More from 'wix-ui-icons-common/More';
import Add from 'wix-ui-icons-common/Add';
import Edit from 'wix-ui-icons-common/Edit';
import Delete from 'wix-ui-icons-common/Delete';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import PopoverMenu from '..';

import IconButton from '../../IconButton';

import { placements } from '../../Popover';
import testkitDesc from './testkit.md';
import compound from './compound.md';

import * as examples from './examples';

const liveCode = config =>
  baseLiveCode({ components: { ...allComponents, PopoverMenu }, ...config });
const example = props => liveCode(props);

const commonProps = {
  appendTo: 'window',
  triggerElement: (
    <IconButton priority="secondary">
      <More />
    </IconButton>
  ),
};

const menuItems = [
  <PopoverMenu.MenuItem
    key="add"
    text="Add"
    onClick={e => console.log(e)}
    prefixIcon={<Add />}
  />,
  <PopoverMenu.MenuItem
    key="edit"
    text="Edit"
    onClick={e => console.log(e)}
    prefixIcon={<Edit />}
  />,
  <PopoverMenu.MenuItem
    key="delete"
    text="Delete"
    onClick={e => console.log(e)}
    prefixIcon={<Delete />}
  />,
];
export default {
  category: storySettings.category,
  storyName: 'PopoverMenu',

  component: PopoverMenu,
  componentPath: '..',
  componentProps: {
    ...commonProps,
    children: [...menuItems],
  },

  exampleProps: {
    placement: placements.map(placement => ({
      label: placement,
      value: placement,
    })),
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/PopoverMenu/',
      component: <PopoverMenu {...commonProps}>{menuItems}</PopoverMenu>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'PopoverMenu renders a trigger element that when the user click on it, a popup box with menu options appear.',
            }),
          ]),

          columns([
            importExample("import { PopoverMenu } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Element (Trigger)',
              subtitle:
                'Any component that is meant for triggering an action can be used as trigger element.',
              source: examples.trigger,
            },
            {
              title: 'Render props (Trigger)',
              subtitle:
                'Trigger events can be access through triggerElement prop render props. ',
              source: examples.renderprops,
            },
            {
              title: 'Text Wrap',
              subtitle:
                'By default all menu items text gets ellipsed when reaches boundaries limit. Passing `textWrap` disables ellipsis and wrap text to new line.',
              source: examples.wrap,
            },
          ].map(example),
        ],
      }),

      ...[
        { title: 'PopoverMenu API', sections: [api()] },
        {
          title: 'Compound Components API',
          sections: [description(compound)],
        },
        { title: 'Testkit', sections: [description(testkitDesc)] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
