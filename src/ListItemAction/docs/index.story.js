import React from 'react';
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
import icons from '../../../stories/utils/icons-for-story';

import * as examples from './examples';

import { storySettings } from '../test/storySettings';

import ListItemAction from '..';
import allComponents from '../../../stories/utils/allComponents';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;
const example = config =>
  baseExample({ components: { ...allComponents, Link }, ...config });

export default {
  category: storySettings.category,
  storyName: 'ListItemAction',

  component: ListItemAction,
  componentPath: '..',

  componentProps: {
    title: 'Hello World!',
  },

  exampleProps: {
    prefixIcon: icons,
  },

  sections: [
    header({
      title: 'ListItemAction',
      component: (
        <div style={{ width: '200px' }}>
          <ListItemAction as="button" title="Option 1" />
          <ListItemAction as="button" title="Option 2" />
        </div>
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
                'ListItemAction is an internal component which is used to build dropdown or menu like components. Usually this item should not be used by consumers, though custom options builder is exposed for usage with DropdownBase.',
            }),
          ]),

          importExample(
            "import { listItemActionBuilder } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'Using options builder to render a list of items.',
            source: examples.simple,
          }),

          example({
            title: 'Affix',
            text: 'Supports prefix icons.',
            source: examples.prefix,
          }),

          example({
            title: 'Skin',
            text:
              'Supports three different skins: standard, dark & destructive',
            source: examples.skin,
          }),

          example({
            title: 'Size',
            text: 'Supports two sizes: small and medium',
            source: examples.size,
          }),

          example({
            title: 'States',
            text: 'Supports disabled state.',
            source: examples.state,
          }),

          example({
            title: 'Text Ellipsis',
            text: 'Text can be set to be ellipsed on tight container width.',
            source: examples.wrap,
          }),

          example({
            title: 'Custom HTML tag',
            text: `
                  This component can be rendered as any given HTML tag – \`<button/>\`, \`<a/>\`, \`<Link/>\` (from react router), \`<div/>\`, \`<span/>\` etc.<br/>
                  All props/attributes will pass to the <em>rendered</em> HTML tag.<br/>
                  <br/>
                  For example:<br/>
                  - as an \`<a/>\`, the component can have attributes like \`href\`, \`target\`, etc.<br/>
                  - as a \`<Link/>\` from react router, the component can have props like \`to\`, \`replace\`, etc.
                `,
            source: examples.custom,
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
