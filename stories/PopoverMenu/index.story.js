import React from 'react';
import { storySettings } from './storySettings';
import allComponents from '../utils/allComponents';
import {
  header,
  title,
  description,
  table,
  importExample,
  columns,
  example as baseExample,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

import Add from 'wix-ui-icons-common/Add';
import Edit from 'wix-ui-icons-common/Edit';
import Delete from 'wix-ui-icons-common/Delete';
import More from 'wix-ui-icons-common/More';
import IconButton from 'wix-style-react/IconButton';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import { Category } from '../storiesHierarchy';

const menuItems = [
  <PopoverMenu.MenuItem key="add" text="Add" prefixIcon={<Add />} />,
  <PopoverMenu.MenuItem key="edit" text="Edit" prefixIcon={<Edit />} />,
  <PopoverMenu.MenuItem key="delete" text="Delete" prefixIcon={<Delete />} />,
];

const commonProps = {
  appendTo: 'window',
  triggerElement: (
    <IconButton priority="secondary">
      <More />
    </IconButton>
  ),
};

const example = config =>
  baseExample({ components: { ...allComponents, PopoverMenu }, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    header({
      component: <PopoverMenu {...commonProps}>{menuItems}</PopoverMenu>,

      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    columns([
      description({
        title: 'Description',
        text: `It is often styled as a typical push button with ChevronDown icon to hint that activating the button will display a menu.`,
      }),
    ]),

    columns([
      table({
        title: 'Menu Component',
        rows: [
          [
            <LinkTo
              kind={Category.COMPONENTS}
              story="PopoverMenu"
            >{`<PopoverMenu />`}</LinkTo>,
            'content element',
          ],
        ],
      }),
    ]),

    columns([
      table({
        title: 'Trigger Elements',
        rows: [
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.1 Button"
            >{`<Button/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.2 IconButton"
            >{`<IconButton/>`}</LinkTo>,
            'trigger element',
          ],
          [
            <LinkTo
              kind={Category.BUTTONS}
              story="5.3 TextButton"
            >{`<TextButton/>`}</LinkTo>,
            'trigger element',
          ],
        ],
      }),
    ]),

    importExample(examples.importExample),

    title('Examples'),

    example({
      title: 'Plain Example',
      text: 'Plain example of PopoverMenu usage.',
      source: examples.basic,
    }),
    example({
      title: 'Skins',
      text: 'PopoverMenu items supports `dark` and `destructive` skins.',
      source: examples.skins,
    }),
    example({
      title: 'Prefix Icon',
      text: 'PopoverMenu items supports prefixIcon',
      source: examples.prefix,
    }),
    example({
      title: 'Text Size',
      text: 'PopoverMenu can enable small text size for its items.',
      source: examples.size,
    }),
    example({
      title: 'Divider',
      text: 'PopoverMenu items can be divided by using Divider.',
      source: examples.divider,
    }),
    example({
      title: 'Ellipsis',
      text:
        'All PopoverMenu items by default gets ellipsed, but wrapping text can be enabled too.',
      source: examples.wrap,
    }),
    example({
      title: 'Menu placement',
      text:
        'PopoverMenu supports 4 main placements: `left`,`rigth`, `top`, `bottom`',
      source: examples.placement,
    }),
  ],
};
