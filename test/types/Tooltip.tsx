import * as React from 'react';
import Tooltip, { TooltipProps } from '../../src/Tooltip';
import { tooltipTestkitFactory } from '../../testkit';
import { tooltipTestkitFactory as tooltipEnzymeTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';

async function testkits() {
  const vanilla = tooltipTestkitFactory({
    dataHook: 'hi',
    wrapper: document.createElement('div'),
  });

  const vanillaText: string = await vanilla.getTooltipText();

  const enzyme = tooltipEnzymeTestkitFactory({
    dataHook: 'hi',
    wrapper: mount(<div />),
  });

  const enzymeText: string = await enzyme.getTooltipText();
}

function TooltipInstanceMethods() {
  const wrapper = mount<TooltipProps>(<Tooltip content="Content" />);
  const tooltip = wrapper.instance();
}

function TooltipContentWithMandatoryProps() {
  return <Tooltip content="Some contenttttttt" />;
}

function TooltipContentWithAllProps() {
  return (
    <Tooltip
      disabled={false}
      dataHook="some-data-hook"
      size="small"
      appendTo="scrollParent"
      content="hiiiiiiiii"
      maxWidth={900}
      moveBy={{ x: 999, y: 1234 }}
      onHide={() => {}}
      onShow={() => {}}
      placement="bottom-start"
      textAlign="start"
      zIndex={1999}
    />
  );
}
