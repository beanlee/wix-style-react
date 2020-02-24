import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { dataTableTestkitFactory } from '../../../../testkit/protractor';
import { eyesItInstance } from '../../../../test/utils/eyes-it';
import { createTestStoryUrl } from '../../../../test/utils/storybook-helpers';
import { storySettings, testStories } from '../docs/storySettings';

describe('Data Table', () => {
  const eyes = eyesItInstance();
  const storyUrl = createTestStoryUrl({
    ...storySettings,
    testName: testStories.dataTable,
  });

  it('should call func on row click', async () => {
    const driver = dataTableTestkitFactory({
      dataHook: 'story-data-table-example',
    });
    const indexToClick = 2;
    const name = 'Deborah Rhodes';

    await browser.get(storyUrl);

    await waitForVisibilityOf(
      driver.element(),
      'Cant find Data Table Component',
    );
    await scrollToElement(driver.element());
    const rowData = await driver.getRowTextByIndex(indexToClick);
    expect(rowData).toBe(`#${indexToClick + 1} ${name}`);
    await driver.clickRowByIndex(indexToClick);

    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.alertIsPresent(), 10000, 'Alert is not presented :(');
    expect(
      await browser
        .switchTo()
        .alert()
        .getText(),
    ).toBe(`You clicked "${name}", row number ${indexToClick + 1}`);
    await browser
      .switchTo()
      .alert()
      .accept();
  });

  eyes.it('display new data when received', async () => {
    const dataHook = 'story-data-table-infinite-scroll';
    const driver = dataTableTestkitFactory({ dataHook });

    await browser.get(storyUrl);

    await waitForVisibilityOf(
      driver.element(),
      'Cant find Data Table Component',
    );
    await scrollToElement(driver.element());
    const initialItems = 20;
    const itemsAfterLoad = 40;
    await driver.scrollToRowByIdx(initialItems - 1);

    await browser.wait(
      async () => (await driver.rowsCount()) === itemsAfterLoad,
      10000,
      'New data was not loaded :(',
    );
    expect(await driver.rowsCount()).toEqual(itemsAfterLoad);
  });
});
