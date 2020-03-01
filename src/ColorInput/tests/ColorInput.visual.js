import React from 'react';
import { storiesOf } from '@storybook/react';

import ColorInput from '../ColorInput';
import { Cell, Layout } from '../../Layout';

const TestContainer = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '1024px',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
  >
    {children}
  </div>
);

const tests = [
  {
    describe: 'ColorInput',
    its: [
      {
        it: 'ColorInput states',
        props: {
          storyFunction: () => (
            <TestContainer>
              <div style={{ margin: '10px' }}>
                <Layout>
                  <Cell span={4}>
                    <ColorInput value="#FF0000" size="large" />
                  </Cell>
                  <Cell span={4}>
                    <ColorInput value="#FF0000" size="medium" />
                  </Cell>
                  <Cell span={4}>
                    <ColorInput value="#FF0000" size="small" />
                  </Cell>
                </Layout>
              </div>
              <div style={{ margin: '10px' }}>
                <Layout>
                  <Cell span={4}>
                    <ColorInput value="#FF0000" status="error" />
                  </Cell>
                  <Cell span={4}>
                    <ColorInput value="" />
                  </Cell>
                  <Cell span={4}>
                    <ColorInput value="#FF0000" disabled />
                  </Cell>
                </Layout>
              </div>
            </TestContainer>
          ),
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`ColorInput${describe ? '/' + describe : ''}`, module).add(
      it,
      props.storyFunction,
    );
  });
});
