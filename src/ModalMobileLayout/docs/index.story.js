import React from 'react';
import { Category } from '../../../stories/storiesHierarchy';

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

import ModalMobileLayout from '..';
import { ModalWrapperExample } from './examples/ModalWrapper';
import LinkTo from '@storybook/addon-links/react';
import Plain from '!raw-loader!./examples/Plain';
import HeaderComponent from './examples/Plain';

import Button from '../../Button';
import Box from '../../Box';
import Text from '../../Text';
import { MobileModalTemplates } from '../../../stories/ModalMobileLayout/MobileModalTemplates';
import { propsVariationExamples } from '../../../stories/ModalMobileLayout/index.story';

const titleExamples = [
  {
    label: 'Title Enabled',
    value: <Text weight="bold">Lorem Ipsum</Text>,
  },
  { label: 'No title', value: '' },
];

const contentExamples = [
  {
    label: 'Short Text',
    value: (
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    ),
  },
  {
    label: 'Long Text',
    value: (
      <Text>
        {new Array(13)
          .fill(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Nibh nisl condimentum id venenatis a condimentum. Commodo quis imperdiet massa tincidunt nunc. Tincidunt ornare massa eget egestas purus viverra. Ultrices mi tempus imperdiet nulla malesuada. Quis risus sed vulputate odio ut. Cras fermentum odio eu feugiat pretium nibh ipsum. Nunc eget lorem dolor sed viverra. Viverra accumsan in nisl nisi scelerisque eu. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Senectus et netus et malesuada fames ac turpis egestas integer.\n' +
              '\n' +
              'Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Vitae proin sagittis nisl rhoncus mattis rhoncus. Egestas integer eget aliquet nibh praesent tristique magna. Netus et malesuada fames ac turpis egestas sed. Imperdiet dui accumsan sit amet nulla facilisi. Etiam tempor orci eu lobortis elementum. Fermentum dui faucibus in ornare quam viverra orci sagittis eu. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Adipiscing diam donec adipiscing tristique. Massa ultricies mi quis hendrerit dolor. Sit amet massa vitae tortor condimentum. Tempor commodo ullamcorper a lacus. Pulvinar neque laoreet suspendisse interdum consectetur. Sed turpis tincidunt id aliquet.',
          )
          .join(' ')}
      </Text>
    ),
  },
];

const footerExamples = [
  {
    label: 'Simple Text',
    value: <Text>Footer</Text>,
  },
  {
    label: 'Action buttons',
    value: (
      <Box align="right">
        <Box marginRight="12px">
          <Button priority="secondary">Cancel</Button>
        </Box>
        <Button>Save</Button>
      </Box>
    ),
  },
  { label: 'No footer', value: '' },
];

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'ModalMobileLayout',

  component: ModalMobileLayout,
  componentWrapper: ({ component }) => (
    <ModalWrapperExample>
      {({ closeModal }) =>
        React.cloneElement(component, {
          onCloseButtonClick: closeModal,
          onOverlayClick: closeModal,
        })
      }
    </ModalWrapperExample>
  ),
  componentPath: '..',

  componentProps: {
    fullscreen: false,
    title: titleExamples[0].value,
    stickyTitle: false,
    content: contentExamples[0].value,
    footer: footerExamples[0].value,
    stickyFooter: false,
    onOverlayClick: () => {},
    onCloseButtonClick: () => {},
  },

  exampleProps: {
    title: titleExamples,
    content: contentExamples,
    footer: footerExamples,
  },

  hiddenProps: ['dataHook'],

  sections: [
    header({
      component: <HeaderComponent />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
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

          example({
            title: 'Plain Example',
            text:
              'A simple example with short content and buttons in the footer.',
            source: Plain,
          }),

          ...propsVariationExamples,

          divider(),

          title('Templates'),

          <MobileModalTemplates />,
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
