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

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import GooglePreview from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'GooglePreview',

  component: GooglePreview,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    title: 'Site Name | a title of your site',
    previewUrl: 'www.site-name.com',
    description: 'A short description for a site',
  },

  hiddenProps: ['dataHook'],

  sections: [
    header({
      component: (
        <GooglePreview
          title="Site Name | a title of your site"
          previewUrl="www.site-name.com"
          description="A short description for a site"
        />
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'A google preview displayer. Contains a title, url and description for SEO result',
          }),

          importExample("import { GooglePreview } from 'wix-style-react'"),

          divider(),

          title('Examples'),

          example({
            title: 'Basic',
            text: 'With all required fields',
            source:
              '<GooglePreview title="Site Name | a title of your site" previewUrl="www.site-name.com" description="a short description for a site"></GooglePreview>',
          }),

          example({
            title: 'Multi-line description',
            text: 'The description can grow up to two lines maximum',
            source:
              '<GooglePreview title="Site Name | a title of your site" previewUrl="www.site-name.com" description="a short description for a site a short description for a site a short description for a site a short description for a site a short description for a site a short description for a site a short description for a site a short description for a site"></GooglePreview>',
          }),

          example({
            title: 'No description',
            text: 'The google preview can appear without a description',
            source:
              '<GooglePreview title="Site Name | a title of your site" previewUrl="www.site-name.com"></GooglePreview>',
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
