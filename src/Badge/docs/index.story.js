import React from 'react';

import { default as Badge, SIZE, SKIN, TYPE } from '..';

import { storySettings } from './storySettings';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';
import ChevronDownSmall from 'wix-ui-icons-common/ChevronDownSmall';
import ExampleBadgesRaw from '!raw-loader!./ExampleBadges';
import ExampleBadgeEllipsisRaw from '!raw-loader!./ExampleBadgeEllipsis';

import {
  api,
  code as baseCode,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

const exampleAffixesIcons = [
  {
    label: 'small icon',
    value: <ChevronDownSmall />,
  },
  {
    label: 'regular icon',
    value: <ChevronDown />,
  },
];

const code = config =>
  baseCode({
    components: { ...allComponents, SIZE, SKIN, TYPE },
    compact: true,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Badge,
  componentPath: '..',

  componentProps: {
    children: "I'm a badge!",
    skin: 'general',
    type: 'solid',
    size: 'medium',
    uppercase: true,
  },

  exampleProps: {
    prefixIcon: exampleAffixesIcons,
    suffixIcon: exampleAffixesIcons,
    onClick: () => alert('Badge Clicked'),
  },

  sections: [
    header(),
    tabs([
      tab({
        title: 'Description',
        sections: [
          importExample("import { Badge } from 'wix-style-react';"),
          divider(),
          title('Examples'),

          code({
            title: 'With icon',
            description:
              'Badge can contain icon as a prefix/suffix Icon size should match badge size. For a medium sized badge use normal icons. For a small badge use small icons which end with the prefix Small',
            source: examples.withIcon,
          }),

          code({
            title: 'Variations',
            description:
              'The different combinations of skin and variants. Please notice that not all combinations are valid',
            source: ExampleBadgesRaw,
            autoRender: false,
          }),

          code({
            title: 'Ellipsis',
            description:
              'When wrapped in a container with limited width - ellipsis and tooltip will appear',
            source: ExampleBadgeEllipsisRaw,
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
