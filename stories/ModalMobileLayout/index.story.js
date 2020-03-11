import React from 'react';
import { Category } from '../storiesHierarchy';
import { storySettings } from './storySettings';
import allComponents from '../utils/allComponents';
import {
  header,
  title,
  description,
  columns,
  example as baseExample,
  importExample,
  divider,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

import HeaderComponent from '../../src/ModalMobileLayout/docs/examples/Plain';
import { MobileModalTemplates } from './MobileModalTemplates';

const example = config => baseExample({ components: allComponents, ...config });

export const propsVariationExamples = [
  example({
    title: 'Title',
    text: '',
    source: examples.title,
  }),

  example({
    title: 'Sticky Title',
    text: '',
    source: examples.stickyTitle,
  }),

  example({
    title: 'Footer',
    text: '',
    source: examples.footer,
  }),

  example({
    title: 'Sticky Footer',
    text: '',
    source: examples.stickyFooter,
  }),

  example({
    title: 'Close Button',
    text: '',
    source: examples.closeButton,
  }),
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/ModalMobileLayout/',
      component: <HeaderComponent />,
    }),

    columns([
      description({
        title: 'Description',
        text: [
          'Use this component together with ',
          <LinkTo
            kind={Category.COMPONENTS}
            story="Modal"
          >{`<Modal />`}</LinkTo>,
          ' to display content in this layout. You may place a title and/or a footer with actions relevant to the displayed content.',
        ],
      }),
    ]),

    importExample("import { ModalMobileLayout } from 'wix-style-react';"),

    divider(),

    title('Examples'),

    ...propsVariationExamples,

    divider(),

    title('Templates'),

    <MobileModalTemplates />,
  ],
};
