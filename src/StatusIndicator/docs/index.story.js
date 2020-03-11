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
import StatusIndicator from '..';
import { STATUS, TOOLTIP_PLACEMENT } from '../constants';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'StatusIndicator',

  component: StatusIndicator,
  componentPath: '..',

  componentProps: {
    message: 'Tooltip',
    status: 'error',
    tooltipPlacement: 'top',
  },

  exampleProps: {
    status: Object.values(STATUS).map(status => ({
      label: status,
      value: status,
    })),
    tooltipPlacement: Object.values(TOOLTIP_PLACEMENT).map(placement => ({
      label: placement,
      value: placement,
    })),
  },

  sections: [
    header({
      component: (
        <div
          style={{
            display: 'grid',
            gridGap: '10px',
            gridAutoFlow: 'column',
            width: 'fit-content',
          }}
        >
          <StatusIndicator status="error" />
          <StatusIndicator status="warning" />
          <StatusIndicator status="loading" />
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
              text: 'An icon with tooltip indicating a certain status.',
            }),
          ]),

          importExample("import { StatusIndicator } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Error',
            source: `<StatusIndicator status="error" message="Error Message"/>`,
          }),

          example({
            title: 'Warning',
            source: `<StatusIndicator status="warning" message="Warning Message"/>`,
          }),

          example({
            title: 'Loading',
            source: `<StatusIndicator status="loading" message="Loading Message"/>`,
          }),

          example({
            title: 'Tooltip Placement',
            text: `The component's tooltip placement can be one of the following:`,
            source: `
<Layout cols={4}>
  <Cell span={1}>
    <Box marginBottom={1}>top:</Box>
    <StatusIndicator status="error" message="top" tooltipPlacement="top" />
  </Cell>
  <Cell span={1}>
    <Box marginBottom={1}>left:</Box>
    <StatusIndicator status="error" message="left" tooltipPlacement="left" />
  </Cell>
  <Cell span={1}>
    <Box marginBottom={1}>bottom:</Box>
    <StatusIndicator status="error" message="bottom" tooltipPlacement="bottom" />
  </Cell>
  <Cell span={1}>
    <Box marginBottom={1}>right:</Box>
    <StatusIndicator status="error" message="right" tooltipPlacement="right" />
  </Cell>
</Layout>
`,
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
