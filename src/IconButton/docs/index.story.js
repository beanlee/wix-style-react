import React from 'react';
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
import More from 'wix-ui-icons-common/More';

import IconButton from '..';
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
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: IconButton,
  componentPath: '..',

  componentProps: {
    as: 'button',
    children: <More />,
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    disabled: false,
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
          <IconButton>
            <More />
          </IconButton>
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
                text: `Icon Button is used when action is lower priority than a regular action or there’s no space available to place a button with text.`,
              }),
            ]),

            importExample("import { IconButton } from 'wix-style-react';"),

            divider(),

            title('Examples'),

            example({
              title: 'Skin',
              text:
                'Icon Button supports 5 skin styles. `standard` works well on white, `inverted` is great on grey, `light` is perfect on dark backgrounds, `transparent` looks good on coloured backgrounds and `premium` for premium plan actions.',
              source: examples.skins,
            }),

            example({
              title: 'Priority',
              text:
                'It can be `primary` or `secondary` action. There should be only one primary action per page.',
              source: examples.priority,
            }),

            example({
              title: 'Size',
              text:
                'Its size can be `tiny`, `small`, `medium` or `large`. Icon should be set according to IconButton size. Tiny & small sized icon buttons should use small icons, which ends with the Small prefix. Medium & large sized icon buttons should use normal icons, which has no prefix. Default size is `medium`',
              source: examples.size,
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

        tab({ title: 'API', sections: [api()] }),
        tab({ title: 'Testkit', sections: [description(testkit)] }),
        tab({ title: 'Playground', sections: [playground()] }),
      ],
    }),
  ],
};
