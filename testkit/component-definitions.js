import React from 'react';

import CropRotate from 'wix-ui-icons-common/CropRotate';
import Popover from '../src/Popover';
import Input from '../src/Input';
import Notification from '../src/Notification';
import FloatingHelper from '../src/FloatingHelper';
import VerticalTabs from '../src/VerticalTabs';
import SegmentedToggle from '../src/SegmentedToggle';
import PopoverMenu from '../src/PopoverMenu';

/*
 * This file exports object with config for components.
 * It is used for automated teskit smoke tests
 *
 * { [component.displayName]: ComponentDefinition }
 *
 * [component.displayName] = {
 *   // hook function to be called before tests begin
 *   beforeAllHook?: function;
 *
 *   // hook function to be called after tests end
 *   afterAllHook?: function;
 *
 *   // set required props, if any
 *   props?: object;
 * }
 */

export default {
  ColorPicker: {
    props: {
      value: '#000',
      onChange: () => {},
      onCancel: () => {},
      onConfirm: () => {},
    },
  },

  Popover: {
    props: {
      children: [
        <Popover.Element>
          <div>I am the trigger!</div>
        </Popover.Element>,
        <Popover.Content>
          <div>I am the content!</div>
        </Popover.Content>,
      ],
    },
  },

  PopoverMenu: {
    props: {
      triggerElement: <div />,
      children: [<PopoverMenu.MenuItem key="0" />],
    },
  },

  FloatingHelper: {
    props: {
      content: <FloatingHelper.Content title="title" body="body" />,
      target: <div>target</div>,
      placement: 'left',
    },
  },

  Range: {
    props: {
      children: [<Input key="0" />, <Input key="1" />],
    },
  },

  Tag: {
    props: {
      id: 'hello',
      children: 'a',
    },
  },

  Badge: {
    props: {
      children: 'hello',
    },
  },

  ImageViewer: {
    props: {
      imageUrl: '',
    },
  },

  FormField: {
    props: {
      children: <div />,
    },
  },

  BadgeSelect: {
    props: {
      options: [{ id: '0', skin: 'general', text: 'general' }],
      selectedId: '0',
    },
  },

  CardGalleryItem: {
    props: {
      primaryActionProps: {
        label: 'Button',
      },
      secondaryActionProps: {
        label: 'Text link',
      },
      backgroundImageUrl:
        'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_343,h_343,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg',
    },
  },

  Carousel: {
    props: {
      images: [
        {
          src:
            'https://a-static.besthdwallpaper.com/garfield-wallpaper-2800x2100-815_28.jpg',
        },
        {
          src:
            'https://m.media-amazon.com/images/M/MV5BZGMwOGIwZjUtOWQ1OS00YWRjLWJmZGMtN2Y1OWQ3ZDYwYTM3XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg',
        },
        {
          src:
            'https://a-static.besthdwallpaper.com/cartoons-garfield-wallpaper-1440x1080-6773_22.jpg',
        },
      ],
    },
  },

  Collapse: {
    props: {
      label: 'Simple text',
      children: 'Lorem perferendis sapiente quas facilis!',
      open: true,
    },
  },

  CalendarPanel: {
    props: {
      onChange: () => {},
    },
  },

  Palette: {
    props: {
      fill: [
        'rgb(50, 132, 144)',
        'rgb(50, 183, 198)',
        'rgb(146, 224, 225)',
        'rgb(203, 246, 255)',
        'rgb(229, 250, 248)',
      ],
    },
  },

  Breadcrumbs: {
    props: {
      items: [
        { id: 0, value: 'Option 1' },
        { id: 1, value: 'Option 2' },
      ],
    },
  },

  Calendar: {
    props: {
      onChange: () => {},
    },
  },

  CalendarPanelFooter: {
    props: {
      primaryActionLabel: 'Submit',
      secondaryActionLabel: 'Cancel',
      primaryActionDisabled: false,
      primaryActionOnClick: () => null,
      secondaryActionOnClick: () => null,
      dateToString: () => 'a string',
    },
  },

  EditableTitle: {
    props: {
      initialValue: 'Some Title',
    },
  },
  EmptyState: {
    props: {
      subtitle:
        'Create your product item in an easy & fast way to display it on your site',
      theme: 'page',
      title: " You don't have any items yet",
    },
  },
  ToggleButton: {
    props: { tooltipContent: 'Crop & Rotate', children: <CropRotate /> },
  },

  Button: {
    props: {
      children: 'Button',
    },
  },

  TextButton: {
    props: {
      children: 'Text Button',
    },
  },

  Slider: {
    props: {
      onChange: () => {},
    },
  },

  Selector: {
    props: {
      id: 1,
      title: 'title',
    },
  },

  Table: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },

  Tabs: {
    props: {
      items: [
        { id: 1, title: 'item 1' },
        { id: 2, title: 'item 2' },
        { id: 3, title: 'item 3' },
        { id: 4, title: 'item 4' },
        { id: 5, title: 'item 5' },
      ],
    },
  },

  Modal: {
    props: {
      isOpen: false,
    },
  },

  Notification: {
    props: {
      children: [
        <Notification.TextLabel key="0">label</Notification.TextLabel>,
        <Notification.CloseButton key="1" />,
      ],
    },
  },

  DatePicker: {
    props: {
      onChange: () => {},
    },
  },

  CustomModalLayout: {
    props: {
      children: <div />,
    },
  },
  BaseModalLayout: {
    props: {
      children: <div />,
    },
  },
  MessageModalLayout: {
    props: {
      children: <div />,
    },
  },
  AnnouncementModalLayout: {
    props: {
      children: <div />,
    },
  },

  ModalSelectorLayout: {
    props: {
      dataSource: () =>
        Promise.resolve({
          items: [],
          totalCount: 0,
        }),
    },
  },

  Proportion: { props: { children: 'test' } },

  Box: {
    props: {
      children: <div />,
    },
  },

  ColorInput: {
    props: {
      value: '#FFFFFF',
    },
  },

  ListItemAction: {
    props: {
      title: 'something',
    },
  },

  SidebarHeader: {
    props: {
      title: 'test',
    },
  },

  SidebarSectionItem: {
    props: {
      children: 'test',
    },
  },

  SidebarSectionTitle: {
    props: {
      children: 'test',
    },
  },

  MarketingLayout: {
    props: {
      title: 'Large Size Layout',
      description:
        'This layout is very prominent, use it to promote apps or things like staff featured templates.',
    },
  },

  ModalPreviewLayout: {
    props: {
      children: <div />,
      onClose: () => {},
    },
  },

  MediaOverlay: {
    props: {
      media: <div />,
    },
  },

  InfoIcon: {
    props: {
      content: 'test',
    },
  },

  PreviewWidget: {
    props: {
      children: <div />,
    },
  },

  TimeTable: {
    props: {
      addItemButtonLabel: 'Add Task',
      columns: [
        {
          title: '1',
          subtitle: 'DAY',
          items: [{ content: 'Task 1' }],
          disabled: true,
        },
        {
          title: '2',
          subtitle: 'DAY',
          items: [
            {
              content: 'Task 2',
            },
            {
              content: 'Task 3',
              disabled: false,
            },
          ],
          disabled: true,
        },
        {
          title: '3',
          subtitle: 'DAY',
          items: [{ content: 'Task 4' }],
          disabled: true,
        },
        {
          title: '4',
          subtitle: 'DAY',
          items: [{ content: 'Task 5' }],
          active: true,
        },
        {
          title: '5',
          subtitle: 'DAY',
          items: [{ content: 'Task 6' }],
        },
        {
          title: '6',
          subtitle: 'DAY',
          items: [
            {
              content: 'Task 7',
              disabled: true,
              draggable: true,
            },
          ],
        },
        {
          title: '7',
          subtitle: 'DAY',
          items: [{ content: 'Task 8' }],
        },
      ],
    },
  },

  VerticalTabs: {
    props: {
      children: [
        <VerticalTabs key="1">
          <VerticalTabs.TabsGroup title="Current Benefits">
            <VerticalTabs.TabItem id={0}>
              Experts Dashboard
            </VerticalTabs.TabItem>
            <VerticalTabs.TabItem id={1}>Product Betas</VerticalTabs.TabItem>
            <VerticalTabs.TabItem id={2}>
              Wix Arena Exposure
            </VerticalTabs.TabItem>
          </VerticalTabs.TabsGroup>
          <VerticalTabs.TabsGroup title="Next Level Benefits">
            <VerticalTabs.TabItem id={3}>Loyalty Program</VerticalTabs.TabItem>
            <VerticalTabs.TabItem id={4}>
              20% Revenue Share
            </VerticalTabs.TabItem>
            <VerticalTabs.TabItem id={5}>
              Dedicated Account Manager
            </VerticalTabs.TabItem>
          </VerticalTabs.TabsGroup>
        </VerticalTabs>,
      ],
    },
  },

  ListItemSelect: {
    props: {
      title: 'List item select',
      size: 'small',
      suffix: 'Suffix',
    },
  },

  MobilePreviewWidget: {
    props: {
      children: <div />,
    },
  },

  ListItemSection: {
    props: {
      title: 'I am a list section',
    },
  },

  BrowserPreviewWidget: {
    props: {
      children: <div />,
    },
  },

  SocialButton: {
    props: {
      icon: 'facebook',
      text: 'Share me please!',
    },
  },

  LabelledElement: {
    props: {
      value: 'asddas',
      children: <Input size="large" value="asddas" />,
    },
  },

  Divider: {
    props: {
      hasFlexboxContainer: true,
    },
  },

  BarChart: {
    props: {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
        value: 250,
        description: `Option ${n}`,
      })),
    },
  },

  ComposerHeader: {
    props: {
      backButtonValue: 'Back to Social Posts',
    },
  },

  StatisticsWidget: {
    props: {
      items: [
        {
          value: '$7,500',
          description: 'Monday',
          percentage: 21,
          invertedPercentage: true,
        },
        {
          value: '1 200 000',
          description: 'Tuesday',
          descriptionInfo: 'Sales on Tuesday',
          percentage: 11,
        },
        {
          value: '21k',
          description: 'Wednesday',
        },
      ],
    },
  },

  Tooltip: {
    props: {
      upgrade: true,
      content: 'hello',
      children: <button>content</button>,
    },
  },

  Text: {
    props: {
      ellipsis: true,
      children: 'text',
    },
  },

  SegmentedToggle: {
    props: {
      children: [
        <SegmentedToggle.Button key="1" value="option">
          Option
        </SegmentedToggle.Button>,
        <SegmentedToggle.Button key="2" value="option2">
          Option
        </SegmentedToggle.Button>,
      ],
    },
  },

  Swatches: {
    props: {
      colors: [
        '#000',
        '#fff',
        'red',
        'cyan',
        'rgb(200, 100, 0)',
        'turquoise',
        'beige',
      ],
    },
  },

  Stepper: {
    props: {
      steps: [
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
        { text: 'This is a long step name' },
      ],
      activeStep: 0,
    },
  },

  SocialPreview: {
    props: {
      title: 'Click me!'.repeat(27),
      description: 'a short description for a site'.repeat(8),
      previewUrl: 'www.site-name.com'.repeat(28),
    },
  },

  Skeleton: {
    props: {
      content: [
        {
          size: 'small',
          type: 'line',
        },
        {
          size: 'large',
          type: 'line',
        },
        {
          size: 'medium',
          type: 'line',
        },
        {
          size: 'full',
          type: 'line',
        },
      ],
    },
  },

  Heading: {
    props: {
      light: false,
      appearance: 'H1',
      children: 'Hey there, good looking',
    },
  },

  Label: {
    props: {
      size: 'medium',
      children: 'label',
    },
  },

  TableActionCell: {
    props: {
      primaryAction: {
        text: 'Edit',
        skin: 'inverted',
        onClick: () => ({}),
      },
    },
  },

  Accordion: {
    props: {
      items: [
        {
          title: 'First Row With Button',
          children: 'text',
          buttonType: 'button',
          expandLabel: 'Show More',
          collapseLabel: 'Less',
        },
        {
          title: 'Second Row With Icon',
          children: 'text',
          expandLabel: 'Show More',
          collapseLabel: 'Less',
        },
      ],
    },
  },
};
