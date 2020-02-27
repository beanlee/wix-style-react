import * as React from 'react';
import InputWithOptions from '../../src/InputWithOptions';
import { inputWithOptionsTestkitFactory } from '../../dist/testkit';
import { inputWithOptionsTestkitFactory as inputWithOptionsEnzymeTestkitFactory } from '../../dist/testkit/enzyme';
import { inputWithOptionsTestkitFactory as inputWithOptionsPuppeteerTestkitFactory } from '../../dist/testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function InputWithOptionsWithMandatoryProps() {
  return <InputWithOptions />;
}

function InputWithOptionsWithAllProps() {
  return (
    <InputWithOptions
      ariaControls="label"
      ariaDescribedby="label"
      ariaLabel="text"
      autoFocus
      autoSelect
      popoverProps={{
        className: 'cls',
        placement: 'top',
        onClick: () => {},
        excludeClass: 'cls',
        onMouseEnter: () => {},
        onMouseLeave: () => {},
        showArrow: true,
        flip: true,
        fixed: true,
        moveBy: { x: 1, y: 0 },
        hideDelay: 10,
        showDelay: 1,
        moveArrowTo: 1,
        timeout: 1,
        style: {},
        id: '123',
        role: 'role',
        zIndex: 1,
        dynamicWidth: true,
        minWidth: '10px',
        maxWidth: '11px',
        disableClickOutsideWhenClosed: true,
      }}
      autocomplete="off"
      className="cls"
      clearButton
      customInput={<span />}
      dataHook="hook"
      defaultValue="value"
      disableEditing
      disabled
      forceFocus
      forceHover
      help
      helpMessage="msg"
      hideStatusSuffix
      id="1"
      max={10}
      maxLength={100}
      menuArrow
      min={5}
      name="name"
      noLeftBorderRadius
      noRightBorderRadius
      onBlur={_ev => {}}
      onChange={_ev => {}}
      onClear={_ev => {}}
      onCompositionChange={_isComposing => {}}
      onEnterPressed={_ev => {}}
      onEscapePressed={_ev => {}}
      onFocus={_ev => {}}
      onInputClicked={_ev => {}}
      onKeyDown={_ev => {}}
      onKeyUp={_ev => {}}
      onPaste={_ev => {}}
      onTooltipShow={() => {}}
      placeholder="placeholder"
      prefix={<div />}
      readOnly
      ref={React.createRef()}
      required
      roundInput
      rtl
      size="large"
      status="error"
      statusMessage="msg"
      step={1}
      suffix={<div />}
      tabIndex={0}
      textOverflow="clip"
      theme="amaterial"
      title="title"
      tooltipPlacement="bottom"
      type="text"
      updateControlledOnClear
      value="value"
      withSelection
      closeOnSelect
      dropDirectionUp
      fixedFooter={<div />}
      fixedHeader={<div />}
      focusOnSelectedOption
      hasMore
      inContainer
      infiniteScroll
      itemHeight="big"
      loadMore={_page => {}}
      markedOption="1"
      maxHeightPixels={200}
      minWidthPixels={100}
      onClickOutside={_ev => {}}
      onClose={() => {}}
      onMouseEnter={_ev => {}}
      onMouseLeave={_ev => {}}
      onOptionMarked={_opt => {}}
      onSelect={(_opt, _samePicked) => {}}
      selectedHighlight
      selectedId="1"
      styles="font: 12px"
      visible
      withArrow
      overflow="scroll"
      onOptionsShow={() => {}}
      onOptionsHide={() => {}}
      disableClickOutsideWhenClosed
      options={[
        {
          value: 'a',
          id: 0,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true,
        },
        {
          value: <div />,
          id: 1,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true,
        },
        { value: '-', id: '2' },
        {
          value: ({ selected, disabled, hovered }) => <div />,
          id: 3,
          disabled: true,
          linkTo: 'google.com',
          title: true,
          overrideStyle: true,
        },
      ]}
    />
  );
}

function ShouldHaveRefMethods() {
  const instace = new InputWithOptions({});
  instace.focus({ preventScroll: true });
  instace.blur();
  instace.select();
}

async function testkits() {
  const testkit = inputWithOptionsTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = inputWithOptionsEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await inputWithOptionsPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
