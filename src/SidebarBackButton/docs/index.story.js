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
import SidebarBackButton from '..';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'SidebarBackButton',

  component: SidebarBackButton,
  componentPath: '..',

  componentProps: {
    children: 'Go back',
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'A suggested back button for the sidebar, accepting text and onClick.',
            }),
          ]),

          importExample("import { SidebarBackButton } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'the arrow will move only on hover',
            source: examples.plain,
          }),

          example({
            title: 'Animated Arrow',
            text:
              'The arrow will animate every 5 seconds, to achieve prominence',
            source: examples.withAnimation,
          }),

          example({
            title: 'Light Skin',
            text: 'Using a Sidebar container with skin="light"',
            source: examples.lightSkin,
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
