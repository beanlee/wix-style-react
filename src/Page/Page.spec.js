/* eslint-disable no-console */
import React from 'react';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react';

import Page from './Page';
import pageDriverFactory from './Page.driver';
import { pageUniDriverFactory } from './Page.uni.driver';
import { PagePrivateDriver } from './Page.private.driver';

const Content = () => <div>content</div>;

const Tail = () => <div>tail</div>;

const renderPageWithProps = (props = {}) => (
  <Page {...props}>
    <Page.Header title="title" />
    <Page.Content>
      <Content />
    </Page.Content>
  </Page>
);

describe('Page', () => {
  const stub = (console.error = jest.fn());
  beforeEach(() => {
    require('react');
  });

  afterEach(() => {
    jest.resetModules();
    stub.mockReset();
  });

  describe('[sync]', () => {
    runTests(createRendererWithDriver(pageDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(pageUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    it('should initialize component', async () => {
      const { driver } = render(renderPageWithProps());
      expect(await driver.exists()).toBe(true);
    });

    describe('backgroundImage', () => {
      it('should initialize component with background image', async () => {
        const { driver } = render(
          renderPageWithProps({ backgroundImageUrl: '/some/image' }),
        );
        expect(await driver.backgroundImageExists()).toBe(true);
      });

      it('should not initialize component with background image', async () => {
        const { driver } = render(renderPageWithProps());
        expect(await driver.backgroundImageExists()).toBe(false);
      });
    });

    describe('customClassName', () => {
      it('should have custom className', async () => {
        const { driver } = render(
          renderPageWithProps({ className: 'myClass' }),
        );
        expect(await driver.hasClass('myClass')).toBe(true);
      });
    });

    describe('gradientClassName', () => {
      it('should initialize component with gradient class name', async () => {
        const { driver } = render(
          renderPageWithProps({ gradientClassName: 'class' }),
        );
        expect(await driver.gradientClassNameExists()).toBe(true);
      });

      it('should not initialize component with gradient class name by default', async () => {
        const { driver } = render(renderPageWithProps());
        expect(await driver.gradientClassNameExists()).toBe(false);
      });
    });

    describe('gradient size', () => {
      it('should be 36px by default', async () => {
        const { driver } = render(
          renderPageWithProps({ gradientClassName: 'class' }),
        );
        expect(await driver.gradientContainerHeight()).toBe('36px');
      });

      it('should not render 0 when maximized but header height delta is 0', async () => {
        const { driver } = render(renderPageWithProps());
        expect(await driver.getPageHtml()).not.toContain('>0<');
      });

      it('should be zero when Tail exist', async () => {
        const props = { gradientClassName: 'class' };
        const { driver } = render(
          <Page {...props}>
            <Page.Header />
            <Page.Tail>
              <Tail />
            </Page.Tail>
            <Page.Content>
              <Content />
            </Page.Content>
          </Page>,
        );
        expect(await driver.gradientContainerHeight()).toBe('0px');
      });
    });

    describe('Page.Tail', () => {
      it('should attach a tail component', async () => {
        const { driver } = render(
          <Page>
            <Page.Header title="title" />
            <Page.Tail>
              <Tail />
            </Page.Tail>
            <Page.Content>
              <Content />
            </Page.Content>
          </Page>,
        );

        expect(await driver.tailExists()).toBe(true);
      });

      it('should not attach a tail component', async () => {
        const { driver } = render(renderPageWithProps());
        expect(await driver.tailExists()).toBe(false);
      });
    });

    describe('DOM calculations', () => {
      // eslint-disable-next-line jest/no-disabled-tests
      xit('should recalculate component heights when re-rendered', () => {
        // TODO:
      });
    });

    describe('Header layer', () => {
      it('should NOT block clicks on content close to header', async () => {});
      it('should NOT block clicks on content close to header when MiniHeader appears', async () => {});
    });
  }

  describe('Prop Validation', () => {
    //Please notice that Prop Validation tests are running on the Page Driver only (and not Page UniDriver).
    const render = createRendererWithDriver(pageDriverFactory);
    const prefixWarning = 'Warning: Failed prop type: ';
    const suffixWarning = '\n    in Page';

    it('should not initialize component with an unknown type', () => {
      const page = (
        <Page>
          <Page.Header title="title" />
          <Page.Content>
            <div />
          </Page.Content>
          <div>Unwanted child</div>
        </Page>
      );

      render(page);
      expect(stub).toHaveBeenCalledWith(
        expect.stringContaining(
          `${prefixWarning}Page: Invalid Prop children, unknown child div${suffixWarning}`,
        ),
      );
    });

    it('should NOT throw an error if a falsy child provided', () => {
      const page = (
        <Page>
          <Page.Header title="title" />
          {false && (
            <Page.Content>
              <div />
            </Page.Content>
          )}
        </Page>
      );

      render(page);

      expect(stub).toHaveBeenCalledTimes(0);
    });
  });

  it('should render the height as inline style when `height` prop is provided', async () => {
    const height = '40vh';
    const driver = PagePrivateDriver.fromJsxElement(
      <Page height={height}>
        <Page.Header title="title" />
        <Page.Content>
          <Content />
        </Page.Content>
      </Page>,
    );

    expect(await driver.getStyle()['height']).toBe(height);
  });

  describe('zIndex', () => {
    it('should NOT have zIndex in inline style by default', async () => {
      const driver = PagePrivateDriver.fromJsxElement(
        <Page>
          <Page.Header title="title" />
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>,
      );

      expect(await driver.getStyle()['z-index']).toBe('');
    });

    it('should have provided zIndex in inline style', async () => {
      const driver = PagePrivateDriver.fromJsxElement(
        <Page zIndex={7}>
          <Page.Header title="title" />
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>,
      );

      expect(await driver.getStyle()['z-index']).toBe('7');
    });
  });
});
