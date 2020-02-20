import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import InputArea from '../InputArea';

import { uniTestkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import { inputAreaUniDriverFactory } from '../InputArea.uni.driver';
import { Cell, Layout } from '../../Layout';

const dataHook = 'storybook-inputarea';

const tests = [
  {
    describe: '',
    its: [
      {
        it: 'default',
        props: {},
      },
      {
        it: 'placeholder',
        props: {
          placeholder: 'This is a placeholder!',
        },
      },
      {
        it: 'disabled',
        props: {
          disabled: true,
        },
      },
      {
        it: 'resizable',
        props: {
          resizable: true,
        },
      },
      {
        it: 'small size',
        props: {
          size: 'small',
        },
      },
      {
        it: 'long text',
        props: {
          value:
            'Half-giant jinxes peg-leg gillywater broken glasses large black dog Great Hall. Nearly-Headless Nick now string them together, and answer me this, which creature would you be unwilling to kiss? Poltergeist sticking charm, troll umbrella stand flying cars golden locket Lily Potter. Pumpkin juice Trevor wave your wand out glass orbs, a Grim knitted hats. Stan Shunpike doe patronus, suck his soul Muggle-Born large order of drills the trace. Bred in captivity fell through the veil, quaffle blue flame ickle diddykins Aragog. Yer a wizard, Harry Doxycide the woes of Mrs. Weasley Goblet of Fire.',
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`InputArea${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <Layout cols={1}>
          <Cell>
            <InputArea {...props} />
          </Cell>
          <Cell>
            <InputArea status="error" {...props} />
          </Cell>
          <Cell>
            <InputArea status="warning" {...props} />
          </Cell>
          <Cell>
            <InputArea status="loading" {...props} />
          </Cell>
        </Layout>
      ),
    );
  });
});

const inputAreaUniTestkitFactory = uniTestkitFactoryCreator(
  inputAreaUniDriverFactory,
);

const createDriver = () =>
  inputAreaUniTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

const InteractiveInputArea = ({ componentDidMount, ...props }) => {
  useEffect(() => {
    componentDidMount && componentDidMount();
  }, [componentDidMount]);

  return <InputArea dataHook={dataHook} {...props} />;
};

const interactiveTests = [
  {
    describe: 'focus',
    its: [null, 'error', 'warning', 'loading'].map(status => ({
      it: status ? `focus with ${status} status` : 'focus',
      props: {
        status,
      },
      componentDidMount: async () => {
        await createDriver().focus();
      },
    })),
  },
];

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(`InputArea${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <InteractiveInputArea
          {...props}
          componentDidMount={componentDidMount}
        />
      ),
    );
  });
});
