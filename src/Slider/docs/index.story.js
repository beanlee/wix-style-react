import React from 'react';
import {
  tabs,
  tab,
  description,
  api,
  testkit,
  importExample,
  header,
  title,
  divider,
  playground,
  example as baseExample,
} from 'wix-storybook-utils/Sections';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

import Slider from '..';

import { storySettings } from './storySettings';

const example = config => baseExample({ components: allComponents, ...config });

class SlideWithState extends React.Component {
  state = {
    value: 4,
  };

  change = value => this.setState({ value });

  render() {
    return (
      <div style={{ width: '50%', padding: '10px' }}>
        <Slider
          onChange={this.change}
          value={this.state.value}
          displayMarks={false}
          displayTooltip={false}
        />
      </div>
    );
  }
}
export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Slider,

  componentPath: '..',

  componentProps: setProps => ({
    onChange: value => setProps({ value }),
  }),

  sections: [
    header({
      component: <SlideWithState />,
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Slider/Slider.js',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `Sliders allow users to make selections from a range of values.`,
          ),

          importExample("import { Slider } from 'wix-style-react';"),

          description({
            title: 'Usage',
            text: `Slider is controlled component. User needs to control Slider's state.`,
          }),

          divider(),

          title('Examples'),

          example({
            title: 'Single Value',
            text: 'Single value slider.',
            source: examples.plainExample,
          }),

          example({
            title: 'Marks under',
            text: 'Slider supports showing marking values under the slider.',
            source: examples.plainSliderMarks,
          }),

          example({
            title: 'Custom Marks',
            text: 'Slider custom marks',
            source: examples.customMarks,
          }),

          example({
            title: 'Multi Value',
            text: 'Usually used for user to select the range.',
            source: examples.rangeSlider,
          }),

          example({
            title: 'Pushable Handlers',
            text: 'Allow pushing of surrounding handles when moving a handle.',
            source: examples.rangeSliderPushable,
          }),

          example({
            title: 'States',
            text: 'Slider supports `disabled` state.',
            source: examples.states,
          }),

          example({
            title: 'Start Point',
            text: `Slider supports having a Start Point`,
            source: examples.startPoint,
          }),
        ],
      }),

      tab({ title: 'API', sections: [api()] }),
      tab({ title: 'Testkit', sections: [testkit()] }),
      tab({ title: 'Playground', sections: [playground()] }),
    ]),
  ],
};
