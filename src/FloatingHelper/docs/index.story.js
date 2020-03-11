import React from 'react';
import FloatingHelper from '..';
import { placementOptions } from '../constants';
import Image from 'wix-ui-icons-common/Image';
import { storySettings } from '../test/storySettings';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';
import {
  header,
  tabs,
  tab,
  description,
  title,
  importExample,
  columns,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import allComponents from '../../../stories/utils/allComponents';
import { Category } from '../../../stories/storiesHierarchy';

const example = config => baseExample({ components: allComponents, ...config });

const componentProps = {
  dataHook: storySettings.dataHook,
  content: (
    <FloatingHelper.Content
      title="Don’t forget to setup payments"
      body="In order to sell your music you need to choose a payment method."
    />
  ),
  target: <span>I am a FloatingHelper target</span>,
  placement: 'right',
  initiallyOpened: true,
};

const exampleProps = {
  placement: Object.values(placementOptions),

  target: [
    { label: 'Simple text', value: 'I am simple text target' },
    { label: 'Simple span', value: <span>I am a span target</span> },
  ],

  content: [
    {
      label: 'with title & body only',
      value: (
        <FloatingHelper.Content
          title="Don’t forget to setup payments"
          body="In order to sell your music you need to choose a payment method."
        />
      ),
    },
    {
      label: 'with all items',
      value: (
        <FloatingHelper.Content
          title="Don’t forget to setup payments"
          body="In order to sell your music you need to choose a payment method."
          actionText="Ok, Take Me There"
          onActionClick={() => null}
          image={<Image width="102" height="102" />}
        />
      ),
    },
  ],
};

export default {
  category: storySettings.category,
  storyName: storySettings.story,
  component: FloatingHelper,
  componentPath: '..',
  componentProps,
  exampleProps,

  sections: [
    header({
      title: '<FloatingHelper/>',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/FloatingHelper/FloatingHelper.js',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: [
                'This is a Popover helper component. Note that the "content" prop should receive the ',
                <LinkTo
                  kind={Category.COMPONENTS}
                  story="FloatingHelper.Content"
                >{`<FloatingHelper.Content/>`}</LinkTo>,
                ' component.',
              ],
            }),
          ]),

          columns([
            importExample("import { FloatingHelper } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Example',
            source: examples.simpleExample,
          }),

          example({
            title: 'Full Example',
            text: `A full example with an action button and an image.`,
            source: examples.fullExample,
          }),

          example({
            title: 'Programmatic Open Example (Uncontrolled mode)',
            text:
              'In `Uncontrolled` mode, the default behavior is that the popover content is opened when mouse-enter is triggered on the target and closes when the close button is clicked. This option is not recommended but is still supported for backward compatibility.',
            source: examples.programmaticExample,
          }),

          example({
            title: 'Controlled Example',
            source: examples.controlledExample,
          }),
          example({
            title: 'Appearances',
            text:
              '`<FloatingHelper/>` has two appearances: `dark` (default) and `light`.',
            source: examples.appearance,
          }),
        ],
      }),

      tab({ title: 'API', sections: [api()] }),
      tab({ title: 'Testkit', sections: [testkit()] }),
      tab({ title: 'Playground', sections: [playground()] }),
    ]),
  ],
};
