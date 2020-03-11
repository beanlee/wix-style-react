import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  columns,
  divider,
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../tests/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import SocialPreview from '..';
import ImageViewer from '../../ImageViewer';

import Box from '../../Box';
import BasicExampleRaw from '!raw-loader!./BasicExample';

const code = config => baseCode({ components: allComponents, ...config });

const mediaNode = (
  <ImageViewer
    width="100%"
    height="100%"
    imageUrl="https://upload.wikimedia.org/wikipedia/commons/d/dd/New_Mela_Ramanputhur_Holy_Family_Church.jpg"
    removeRoundedBorders
  />
);

export default {
  category: storySettings.category,
  storyName: 'SocialPreview',

  component: SocialPreview,
  componentPath: '..',

  componentProps: {
    title: 'Site Name | a title of your site',
    description: 'A short description for a site',
    previewUrl: 'www.site-name.com',
    media: mediaNode,
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/SocialPreview/',
      component: (
        <Box width="340px" pointerEvents="none">
          <SocialPreview
            title="Social Preview"
            previewUrl="http://www.wix-wix-style-react.surge.sh"
            description="Wix's UI component library"
            media={mediaNode}
          />
        </Box>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'A common display unit for social posts',
            }),
          ]),

          columns([
            importExample("import { SocialPreview } from 'wix-style-react'"),
          ]),

          divider(),

          code({
            title: 'Basic example',
            description:
              'A SocialPreview component will usually contain a media ImageViewer component',
            source: BasicExampleRaw,
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
