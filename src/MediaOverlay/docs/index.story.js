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

import basicExample from '!raw-loader!./examples/basic';
import useCaseExample1 from '!raw-loader!./examples/useCase1';
import useCaseExample2 from '!raw-loader!./examples/useCase2';
import useCaseExample3 from '!raw-loader!./examples/useCase3';
import useCaseExample4 from '!raw-loader!./examples/useCase4';
import useCaseExample5 from '!raw-loader!./examples/useCase5';
import customMediaExample from '!raw-loader!./examples/customMedia';
import placementExample from '!raw-loader!./examples/placement';
import skinExample from '!raw-loader!./examples/skin';
import hoverSkinExample from '!raw-loader!./examples/hoverSkin';
import Proportion from '../../Proportion';
import Box from '../../Box';
import PopoverMenu from '../../PopoverMenu';
import { galleryItemWithHoverActions } from './examples/content';
import HeaderExample from './examples/header';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import MediaOverlay from '..';

const example = config =>
  baseExample({
    components: {
      ...allComponents,
      PopoverMenu,
    },
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: 'MediaOverlay',

  component: MediaOverlay,
  componentPath: '..',

  componentProps: {
    skin: 'gradient',
    hoverSkin: 'dark',
    media: 'example.jpg',
    children: galleryItemWithHoverActions,
  },

  exampleProps: {
    children: [
      {
        label: 'Hover actions at top-end',
        value: galleryItemWithHoverActions,
      },
    ],
  },

  componentWrapper: ({ component }) => (
    <Proportion aspectRatio={Proportion.PREDEFINED_RATIOS.landscape}>
      {component}
    </Proportion>
  ),

  sections: [
    header({
      component: (
        <Box width="200px" height="110px">
          <HeaderExample />
        </Box>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            'A component used to overlay any other content on top of a media element.',
          ),

          importExample("import { MediaOverlay } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Basic overlay',
            text:
              'A basic example of overlaying content on a media element where some items are visible only on hover. You can control the visibility of `<MediaOverlay.Content>` elements using `visible` prop.',
            source: basicExample,
          }),

          example({
            title: 'Skins',
            text: 'Use `skin` prop to set different skins.',
            source: skinExample,
          }),

          example({
            title: 'Hover skins',
            text:
              'Use `hoverSkin` prop to set different skins for hover state.',
            source: hoverSkinExample,
          }),

          example({
            title: 'Content placement',
            text:
              'The position of `<MediaOverlay.Content>` elements can be set using `placement` prop.',
            source: placementExample,
          }),

          example({
            title: 'Custom media element',
            text:
              'It is possible to use a custom node with `media` prop. This example uses a `<div>` element with linear gradient background as a media prop.',
            source: customMediaExample,
          }),

          divider(),

          title('Use Cases'),

          example({
            text:
              'Combination of gradient overlay and elements on the bottom can be used to display relevant information in a default state of the element. For example to display source or duration of the video.',
            source: useCaseExample1,
          }),

          example({
            text:
              'A layout of top right actions on a gradient overlay may be used for situations when there are more than two actions and imagery needs to be visible on the overlay. Actions can be supported by other components at the same time.',
            source: useCaseExample2,
          }),

          example({
            text:
              "A counter type layout can be used to indicate a number of contained images that can't be shown because of insufficient space. It can be used in galleries as the default state of the last image.  It should always be used with color overlay.",
            source: useCaseExample3,
          }),

          example({
            text:
              'The center placement of the actions on a color overlay is used when one or few prominent actions are needed.',
            source: useCaseExample4,
          }),

          example({
            text:
              'Top right placement of the actions with color overlay should be used for reorderable components. The function should always be supported by the use of compound `<MediaOverlay.DragHandle />` component on the hover state.',
            source: useCaseExample5,
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
