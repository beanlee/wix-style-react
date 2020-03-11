import React from 'react';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import {
  tab,
  tabs,
  api,
  header,
  example as baseExample,
  divider,
  columns,
  title,
  playground,
  description,
  importExample,
} from 'wix-storybook-utils/Sections';

import { Layout } from '../..';
import Button from '..';

import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';
import skins from './Skins.md';
import testkit from './testkit.md';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const example = config =>
  baseExample({ components: { ...allComponents, Link }, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Button,
  componentPath: '..',

  componentProps: {
    as: 'button',
    children: 'Button',
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons,
    fullWidth: false,
    disabled: false,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <Button>Button</Button>
        </Layout>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `Button is a default component to display action in a page.`,
          ),

          importExample("import { Button } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Skin and Priority',
            text: skins,
            source: examples.primary,
          }),

          example({
            title: 'Size',
            text:
              'Button supports four sizes – large for emphasized actions, medium as default, small as alternative to medium and tiny for very small layouts.',
            source: examples.sizes,
          }),

          example({
            title: 'Affix',
            text:
              'To emphasize button’s actions it is allowed to add prefix or suffix icon. When adding an icon you should match the icon size to the button size. If your button is small, use a small size icon which ends with Small prefix. *Normal sized icons have no prefix.',
            source: examples.affixes,
          }),

          example({
            title: 'States',
            text:
              'If action is submitted, but still processing, button can display a loader.Button can be disabled when needed to indicate that action is available, but cannot be performed at the moment.',
            source: examples.states,
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
        { title: 'Testkit', sections: [description(testkit)] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
