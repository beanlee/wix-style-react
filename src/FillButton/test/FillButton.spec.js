import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import FillButton from '../FillButton';
import { fillButtonPrivateDriverFactory } from './FillButton.private.uni.driver';

describe('FillButton', () => {
  const render = createRendererWithUniDriver(fillButtonPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<FillButton />);
    expect(await driver.exists()).toBe(true);
  });

  describe('`iconSize` prop', () => {
    it('[when] given small should render small icon', async () => {
      const { driver } = render(<FillButton iconSize="small" />);
      expect(await driver.isIconSmall()).toBe(true);
    });

    it('[when] given medium should render medium icon', async () => {
      const { driver } = render(<FillButton iconSize="medium" />);
      expect(await driver.isIconMedium()).toBe(true);
    });
  });

  describe('`onClick` prop', () => {
    it('[when] given should be called when clicked', async () => {
      const onClick = jest.fn();
      const { driver } = render(<FillButton onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('`tooltipProps` prop', () => {
    it('[when] given should pass textual content to tooltip', async () => {
      const content = 'hello';
      const { driver } = render(<FillButton tooltipProps={{ content }} />);
      expect(await driver.getTooltipText()).toBe(content);
    });
  });
});
