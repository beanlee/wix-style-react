import React from 'react';

import { cleanup, createRendererWithUniDriver } from '../../../test/utils/unit';

import StatisticsWidget from '../StatisticsWidget';
import { statisticsWidgetPrivateDriverFactory } from './StatisticsWidget.private.uni.driver';

describe('StatisticsWidget', () => {
  const render = createRendererWithUniDriver(
    statisticsWidgetPrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<StatisticsWidget />);

    expect(await driver.exists()).toBe(true);
  });

  describe('With one item', () => {
    let data;

    beforeEach(() => {
      data = {
        items: [
          {
            value: 'First value',
            description: 'First description',
            percentage: 12,
          },
        ],
      };
    });

    describe('value', () => {
      it('should render value', async () => {
        const { driver } = render(<StatisticsWidget {...data} />);
        const count = await driver.getItemsCount();

        expect(count).toBe(1);
      });

      it('should render value based on props', async () => {
        data.items[0].value = 'Changed value';

        const { driver } = render(<StatisticsWidget {...data} />);
        const value = await driver.getValue(0);
        const shortValue = await driver.getValueInShort(0);

        expect(shortValue).toBeNull();
        expect(value).toBe('Changed value');
      });

      it('should render short version', async () => {
        data.items[0].valueInShort = '1K';

        const { driver } = render(<StatisticsWidget {...data} />);
        const shortvalue = await driver.getValueInShort(0);
        const value = await driver.getValue(0);

        expect(shortvalue).toBe('1K');
        expect(value).toBe('First value');
      });
    });

    describe('description', () => {
      it('should not exist by default', async () => {
        data.items[0].description = undefined;

        const { driver } = render(<StatisticsWidget {...data} />);
        const description = await driver.getDescription(0);

        expect(description).toBeNull();
      });

      it('should render based on props', async () => {
        data.items[0].description = 'Changed description';

        const { driver } = render(<StatisticsWidget {...data} />);
        const description = await driver.getDescription(0);

        expect(description).toBe('Changed description');
      });
    });

    describe('Info icon', () => {
      it('should not exist by default', async () => {
        const { driver } = render(<StatisticsWidget {...data} />);
        const info = await driver.isInfoExists(0);

        expect(info).toBe(false);
      });

      it('should exist when descriptionInfo is set', async () => {
        data.items[0].descriptionInfo = 'This is a description';

        const { driver } = render(<StatisticsWidget {...data} />);
        const info = await driver.isInfoExists(0);

        expect(info).toBe(true);
      });

      it('should contain passed text', async () => {
        const description = 'This is a description';
        data.items[0].descriptionInfo = description;

        const { driver } = render(<StatisticsWidget {...data} />);

        expect(await driver.getDescriptionInfo(0)).toBe(description);
      });

      it('should be null, when there is no descriptionInfo', async () => {
        data.items[0].descriptionInfo = undefined;

        const { driver } = render(<StatisticsWidget {...data} />);

        expect(await driver.getDescriptionInfo(0)).toBeNull();
      });
    });

    describe('Percents', () => {
      it('should not exist by default', async () => {
        data.items[0].percentage = undefined;

        const { driver } = render(<StatisticsWidget {...data} />);
        const percentage = await driver.getPercentage(0);

        expect(percentage).toBeNull();
      });

      it('should exist when is set', async () => {
        const { driver } = render(<StatisticsWidget {...data} />);
        const percentage = await driver.getPercentage(0);

        expect(percentage).toBe(12);
      });

      describe('Reverted percentage', () => {
        it('should be false when unset', async () => {
          const { driver } = render(<StatisticsWidget {...data} />);
          const isInverted = await driver.isPercentageInverted(0);

          expect(isInverted).toBe(false);
        });

        it('should be false when set to false', async () => {
          data.items[0].invertedPercentage = false;

          const { driver } = render(<StatisticsWidget {...data} />);
          const isInverted = await driver.isPercentageInverted(0);

          expect(isInverted).toBe(false);
        });

        it('should be true when set to true', async () => {
          data.items[0].invertedPercentage = true;

          const { driver } = render(<StatisticsWidget {...data} />);
          const isInverted = await driver.isPercentageInverted(0);

          expect(isInverted).toBe(true);
        });
      });
    });
  });

  describe('With more then 5 items', () => {
    let data;

    beforeEach(() => {
      global.console.warn = jest.fn();
    });

    beforeEach(() => {
      data = {
        items: [
          {
            value: '1k',
          },
          {
            value: '2k',
          },
          {
            value: '3k',
          },
          {
            value: '4k',
          },
          {
            value: '5k',
          },
          {
            value: '6k',
          },
          {
            value: '7k',
          },
        ],
      };
    });

    it('should print warning in a console', async () => {
      render(<StatisticsWidget {...data} />);

      expect(global.console.warn).toBeCalled();
    });

    it('should render first 5 items', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      const valueFirst = await driver.getValue(0);
      const valueLast = await driver.getValue(4);

      const count = await driver.getItemsCount();

      expect(count).toBe(5);
      expect(valueFirst).toBe('1k');
      expect(valueLast).toBe('5k');
    });
  });

  describe('Mouse and keyboard actions', () => {
    let data;
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const onClick3 = jest.fn();

    beforeEach(() => {
      data = {
        items: [
          {
            value: '1st value',
            description: '1st description',
            percentage: 12,
            onClick: onClick1,
          },
          {
            value: '2nd value',
            description: '2nd description',
            percentage: 12,
          },
          {
            value: '3rd value',
            description: '3rd description',
            percentage: 12,
            onClick: onClick2,
          },
          {
            value: '4th value',
            description: '4th description',
            percentage: 12,
            onClick: onClick3,
          },
        ],
      };
    });

    afterEach(() => {
      onClick1.mockReset();
      onClick2.mockReset();
      onClick3.mockReset();
    });

    it('should not receive focus, when prop not passed', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);

      expect(await driver.hasTabIndex(1)).toBe(false);
    });

    it('should receive focus, when prop is passed', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);

      expect(await driver.hasTabIndex(0)).toBe(true);
      expect(await driver.hasTabIndex(2)).toBe(true);
      expect(await driver.hasTabIndex(3)).toBe(true);
    });

    it('should not call onclick, when prop not passed', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      await driver.clickStatistics(1);

      expect(onClick1).toBeCalledTimes(0);
    });

    it('should call onClick', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      await driver.clickStatistics(0);

      expect(onClick1).toBeCalledTimes(1);
    });

    it('should call a callback on Space key press', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      await driver.pressSpaceKey(0);
      await driver.pressSpaceKey(2);
      await driver.pressSpaceKey(3);

      expect(onClick1).toBeCalledTimes(1);
      expect(onClick2).toBeCalledTimes(1);
      expect(onClick3).toBeCalledTimes(1);
    });

    it('should call a callback on Enter key press', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      await driver.pressEnterKey(0);
      await driver.pressEnterKey(2);
      await driver.pressEnterKey(3);

      expect(onClick1).toBeCalledTimes(1);
      expect(onClick2).toBeCalledTimes(1);
      expect(onClick3).toBeCalledTimes(1);
    });

    it('should not call a callback on an item without onClick', async () => {
      const { driver } = render(<StatisticsWidget {...data} />);
      await driver.pressSpaceKey(1);
      await driver.pressEnterKey(1);

      expect(onClick1).toBeCalledTimes(0);
    });
  });

  describe('children', () => {
    it('should render children', async () => {
      const content = 'That is a lot';
      const dataHook = 'stats-widget-child';
      const data = {
        items: [
          {
            value: '100',
            description: 'Money',
            children: <div data-hook={dataHook}>{content}</div>,
          },
        ],
      };
      const { driver } = render(<StatisticsWidget {...data} />);
      const node = await driver.getChildren(0, dataHook);

      expect(await node.text()).toBe(content);
    });

    it('should support arbitrary props', async () => {
      const dataHook = 'stats-widget-child';
      const data = {
        items: [
          {
            value: '100',
            description: 'Money',
            children: <div data-hook={dataHook} />,
            'data-arbitrary-test-prop': 'exists!',
          },
        ],
      };
      const { driver } = render(<StatisticsWidget {...data} />);
      const node = await driver.getStatsItem(0);
      expect(await node.attr('data-arbitrary-test-prop')).toBe('exists!');
    });
  });
});
