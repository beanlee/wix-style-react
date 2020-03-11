import React from 'react';
import {
  tab,
  tabs,
  api,
  header,
  divider,
  columns,
  title,
  playground,
  example as baseExample,
  description,
  importExample,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';

import Modal from 'wix-style-react/Modal';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';

import SimpleExample from '!raw-loader!./examples/SimpleExample';
import ModalWithCloseButton from '!raw-loader!./examples/ModalWithCloseButton';
import allComponents from '../../../stories/utils/allComponents';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Modal,
  componentPath: '..',
  componentWrapper: ({ component }) => (
    <Box>
      <Button onClick={() => component.props.onRequestClose()}>
        Open Modal
      </Button>
      {component}
    </Box>
  ),

  componentProps: (setState, getState) => ({
    isOpen: false,
    shouldDisplayCloseButton: true,
    shouldCloseOnOverlayClick: true,
    onRequestClose: () => setState({ isOpen: !getState().isOpen }),
    children: (
      <Box
        width="50vw"
        height="50vh"
        align="center"
        verticalAlign="middle"
        backgroundColor="D80"
      >
        This is the content!
      </Box>
    ),
  }),

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Accessible modal dialog component',
            }),
          ]),

          importExample("import { Modal } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Example',
            text: 'A simple example for modal with an alert',
            source: SimpleExample,
          }),

          example({
            title: 'Close Button',
            text: 'An example of a modal with a close button',
            source: ModalWithCloseButton,
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
