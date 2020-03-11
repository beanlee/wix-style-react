import {
  api,
  example as baseExample,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';

import CardGalleryItem from '..';
import { storySettings } from './storySettings';
import componentProps from './exampleProps';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';
import PopoverMenu from '../../PopoverMenu';

const { category, storyName } = storySettings;

const example = config =>
  baseExample({ components: { ...allComponents, PopoverMenu }, ...config });

export default {
  category,
  storyName,

  component: CardGalleryItem,
  componentPath: '..',

  componentProps,

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          importExample("import { CardGalleryItem } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Settings Menu',
            text:
              'Settings menu can be provided with `settingsMenu` prop and can be an `IconButton`, `TextButton` or any other trigger based component.',
            source: examples.iconButton,
          }),

          example({
            title: 'Badge',
            text: 'Component can display a badge.',
            source: examples.badge,
          }),

          example({
            title: 'Background Image Node',
            text:
              'Component can display a background image node instead of image URL.',
            source: examples.backgroundImageNode,
          }),

          example({
            title: 'Disabled Primary Action',
            text: 'Primary Action can be disabled.',
            source: examples.disabledPrimaryAction,
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
