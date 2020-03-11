import React from 'react';
import CropRotate from 'wix-ui-icons-common/CropRotate';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  title,
  example as baseExample,
} from 'wix-storybook-utils/Sections';

import ToggleButton from '..';
import { Layout } from '../../Layout';
import { storySettings } from '../test/storySettings';
import icons from '../../../stories/utils/icons-for-story';
import allComponents from '../../../stories/utils/allComponents';
import testkit from '!raw-loader!./testkit.md';
import * as examples from './examples';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const example = config =>
  baseExample({ components: { ...allComponents, Link }, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: ToggleButton,
  componentPath: '..',

  componentProps: {
    as: 'button',
    children: <CropRotate />,
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    tooltip: 'I am a tooltip',
    selected: false,
    disabled: false,
    tooltipContent: 'Crop & Rotate',
    tooltipProps: { placement: 'top' },
  },
  exampleProps: {
    onClick: () => 'Clicked!',
    children: icons,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <ToggleButton tooltipContent="Crop & Rotate">
            <CropRotate />
          </ToggleButton>
        </Layout>
      ),
    }),

    tabs({
      tabs: [
        tab({
          title: 'Description',
          sections: [
            columns([
              description({
                text: `Toggle Button is used when action is lower priority than a regular action or there’s no space available to place a button with text.`,
              }),
            ]),

            importExample("import { ToggleButton } from 'wix-style-react';"),

            divider(),

            columns([title('Examples')]),

            example({
              title: 'Skin',
              text:
                'Toggle Button supports 2 skin styles: `standard` and `dark`',
              source: examples.skins,
            }),

            example({
              title: 'Selected',
              text:
                'It can be `selected` when needed to indicate that some state is enabled',
              source: examples.selected,
            }),

            example({
              title: 'Disabled',
              text:
                'It can be `disabled` when needed to indicate that action is available, but cannot be performed at the moment.',
              source: examples.disabled,
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

        tab({
          title: 'API',
          sections: [api()],
        }),

        tab({
          title: 'Testkit',
          sections: [description({ text: testkit })],
        }),

        tab({
          title: 'Playground',
          sections: [playground()],
        }),
      ],
    }),
  ],
};
