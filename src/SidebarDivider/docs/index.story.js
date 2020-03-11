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
import * as examples from './examples';

import SidebarDivider from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'SidebarDivider',

  component: SidebarDivider,
  componentPath: '..',

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
                'A divider within the sidebar that supports inner and full mode.',
            }),
          ]),

          importExample("import { SidebarDivider } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'A simple example for an inner sidebar divider',
            source: examples.plain,
          }),

          example({
            title: 'Full-Width Divider',
            text:
              'An example that demonstrates a divider with full width. Notice that in this mode, the divider has no margins',
            source: examples.fullWidth,
          }),

          example({
            title: 'Light Skin',
            text:
              'This example uses the `<Sidebar/>` to demonstrate the "light" skin design. Notice that when `<SidebarDivider/>` is contained inside `<Sidebar/>`, it affected by the `skin` prop accordingly',
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
