import { eyesItInstance } from '../../../test/utils/eyes-it';
import {
  pageTestkitFactory,
  popoverMenuTestkitFactory,
} from '../../../testkit/protractor';
import { pagePrivateDriverFactory } from '../Page.private.protractor.driver';
import {
  waitForVisibilityOf,
  scrollToElement,
  protractorTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';
import { storySettings } from '../docs/storySettings';

const { category, storyName } = storySettings;

const testStoryUrl = testName =>
  createTestStoryUrl({ category, storyName, testName });

describe('Page', () => {
  const eyes = eyesItInstance();

  const initTest = async ({ storyUrl, dataHook }) => {
    await browser.get(storyUrl);
    const driver = pageTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Page');
    await scrollToElement(driver.element());
    return driver;
  };

  describe('Sticky layer', () => {
    it('should NOT see components with z-index when they go under a sticky item', () => {});
  });

  describe('min/max width', () => {
    function eyesOptions({ width }) {
      return {
        enableSnapshotAtBrowserGet: true,
        enableSnapshotAtEnd: false,
        width,
      };
    }

    describe('Default values', () => {
      const url = testStoryUrl('7. Default [min/max]-width');

      eyes.it(
        'should stop growing at max-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });

    describe('Custom values', () => {
      const url = testStoryUrl('8. Custom [min/max]-width');
      eyes.it(
        'should stop growing at max-width (1400px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width (600px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });
  });

  eyes.it('should have sticky notification', async () => {
    const ENOUGH_SCROLL_TO_MINIMIZE = 200;
    const dataHook = storySettings.dataHook;
    const privateDriver = protractorTestkitFactoryCreator(
      pagePrivateDriverFactory,
    )({ dataHook });

    await browser.get(testStoryUrl('11. With Notification'));
    await eyes.checkWindow('With shown notification');
    await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
    await eyes.checkWindow('With shown notification over a mini-header');
    // TODO: click to close notification, scroll down to trigger mini-header (notification should not reappear. It happens , I don't know why!)
  });

  eyes.it(
    'should have visible opened PopoverMenus',
    async () => {
      await browser.get(testStoryUrl('12. PopoverMenus'));

      const headerMenu = popoverMenuTestkitFactory({
        dataHook: 'example-page-header-popover-menu',
      });
      const headerMenuButton = await headerMenu.getTriggerElement(
        'page-header-popover-menu-button',
      );
      await headerMenuButton.click();
      await eyes.checkWindow('header PopoverMenu should be opened');

      const contentMenu = popoverMenuTestkitFactory({
        dataHook: 'popovermenu-in-content',
      });
      const contentMenuButton = await contentMenu.getTriggerElement(
        'popovermenu-in-content-button',
      );
      await contentMenuButton.click();
      await eyes.checkWindow('content PopoverMenu should be opened');
    },
    { enableSnapshotAtBrowserGet: false, enableSnapshotAtEnd: false },
  );

  describe('Vertical Scroll', () => {
    const dataHook = storySettings.dataHook;
    const privateDriver = protractorTestkitFactoryCreator(
      pagePrivateDriverFactory,
    )({ dataHook });
    const ENOUGH_SCROLL_TO_MINIMIZE = 200;
    const SCROLL_TO_BOTTOM = 3000;
    const ANIMATION_DURATION_MS = 200;
    const Constants = storySettings.PageWithScrollConstants;

    const testScrollStoryUrl = testName =>
      createTestStoryUrl({
        category,
        storyName: `${storyName}/Scroll`,
        testName,
      });

    describe('1. Short Content', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('1. Short Content'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVerticalScroll()).toBe(0);
      });
    });

    describe('2. Stretch Vertically', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('2. Stretch Vertically'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVerticalScroll()).toBe(0);
      });
    });

    describe('3. Max Height No Scroll', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('3. Max Height No Scroll'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVerticalScroll()).toBe(0);
      });
    });

    describe('4. Scroll - No Mini Header', () => {
      eyes.it(
        'should scroll exactly 1px before triggering the mini-header',
        async () => {
          await initTest({
            storyUrl: testScrollStoryUrl('4. Scroll - No Mini Header'),
            dataHook,
          });
          await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
          expect((await privateDriver.getVerticalScroll()) > 0).toBeTruthy();
        },
      );
    });

    describe('5. Scroll - Trigger Mini Header', () => {
      eyes.it(
        'should scroll exactly to the point where mini-header is triggered',
        async () => {
          await initTest({
            storyUrl: testScrollStoryUrl('5. Scroll - Trigger Mini Header'),
            dataHook,
          });
          await privateDriver.scrollVertically(300);
          await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
          expect((await privateDriver.getVerticalScroll()) > 0).toBeTruthy();
        },
      );
    });

    describe('6. Long', () => {
      eyes.it('should have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('6. Long'),
          dataHook,
        });
        await privateDriver.scrollVertically(SCROLL_TO_BOTTOM);

        await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
        expect((await privateDriver.getVerticalScroll()) > 0).toBeTruthy();
      });
    });

    describe('7. Multiple Stickies', () => {
      eyes.it('should scroll and trigger mini-header', async () => {
        const GAP_HEIGHT_PX = 200;
        const STICKY_HEIGHT = 50;

        await initTest({
          storyUrl: testScrollStoryUrl('7. Multiple Stickies'),
          dataHook,
        });
        await privateDriver.scrollVertically(Constants.scrollTrigger + 1);
        await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
        await eyes.checkWindow('trigger mini-header');

        await privateDriver.scrollVertically(GAP_HEIGHT_PX / 2);
        await eyes.checkWindow('first gap scrolled half way');

        await privateDriver.scrollVertically(GAP_HEIGHT_PX / 2 + STICKY_HEIGHT);
        await eyes.checkWindow('second sticky at top');
      });
    });

    describe('9. Long With Fixed ScrollBar', () => {
      eyes.it(
        'should have minimized header with width that matches the scrollable container',
        async () => {
          await initTest({
            storyUrl: testScrollStoryUrl('9. Long With Fixed ScrollBar'),
            dataHook,
          });
          await privateDriver.scrollVertically(SCROLL_TO_BOTTOM);

          await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
          expect((await privateDriver.getVerticalScroll()) > 0).toBeTruthy();
        },
      );
    });
  });
});
