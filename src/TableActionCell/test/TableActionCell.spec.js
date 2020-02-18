import React from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import eventually from 'wix-eventually';

import TableActionCell from '../TableActionCell';
import tableActionCellDriverFactory from '../TableActionCell.driver';
import { flattenInternalDriver } from '../../../test/utils/private-drivers';

const primaryActionProps = (actionTrigger = () => {}, disabled = false) => ({
  primaryAction: {
    text: 'primary action',
    skin: 'standard',
    onClick: actionTrigger,
    disabled,
  },
});

const secondaryActionsProps = ({ actionTriggers, actionDataHooks } = {}) => {
  const createAction = n => ({
    text: `Action ${n}`,
    dataHook: actionDataHooks && actionDataHooks[n],
    icon: <span>{`Icon ${n}`}</span>, // simulate the icon as <span> elements
    onClick: (actionTriggers && actionTriggers[n]) || (() => {}),
  });

  return {
    secondaryActions: Array(4)
      .fill()
      .map((val, idx) => createAction(idx)),
    numOfVisibleSecondaryActions: 2,
    upgrade: true,
  };
};

describe('Table Action Cell', () => {
  const createDriver = (...args) =>
    flattenInternalDriver(
      createDriverFactory(tableActionCellDriverFactory)(...args),
    );

  it("should have a placeholder when there's only a primary action", () => {
    const driver = createDriver(<TableActionCell {...primaryActionProps()} />);
    expect(driver.primaryActionPlaceholderExists()).toBe(true);
  });

  it('should display the primary action button', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell {...primaryActionProps(onPrimaryActionTrigger)} />,
    );

    expect(driver.getPrimaryActionButtonDriver().exists()).toBe(true);
    expect(
      driver.getPrimaryActionButtonDriver().getButtonTextContent(),
    ).toEqual('primary action');
  });

  it('should trigger the primary action on primary button click', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell {...primaryActionProps(onPrimaryActionTrigger)} />,
    );

    driver.clickPrimaryActionButton();
    expect(onPrimaryActionTrigger).toHaveBeenCalledTimes(1);
  });

  it('should not have a primary action placeholder when there are also secondary actions', () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
      />,
    );

    expect(driver.primaryActionPlaceholderExists()).toBe(false);
  });

  it('should put visible secondary actions in the cell', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps({
          actionDataHooks: [undefined, 'data-hook-for-1'],
        })}
      />,
    );

    expect(driver.getVisibleActionsCount()).toEqual(2);

    expect(
      driver.getVisibleActionButtonDriver(0).getButtonTextContent(),
    ).toEqual('Icon 0');
    expect(
      driver
        .getVisibleActionByDataHookButtonDriver('data-hook-for-1')
        .getButtonTextContent(),
    ).toEqual('Icon 1');

    const tooltipDriver1 = driver.getVisibleActionTooltipDriver(0);
    const tooltipDriver2 = driver.getVisibleActionByDataHookTooltipDriver(
      'data-hook-for-1',
    );

    tooltipDriver1.mouseEnter();
    await eventually(() =>
      expect(tooltipDriver1.getContent()).toEqual('Action 0'),
    );
    tooltipDriver1.mouseLeave();

    tooltipDriver2.mouseEnter();

    await eventually(() =>
      expect(tooltipDriver2.getContent()).toEqual('Action 1'),
    );
    tooltipDriver2.mouseLeave();
  });

  it('should put hidden secondary action in a PopoverMenu', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
      />,
    );

    expect(await driver.getHiddenActionsPopoverMenuDriver().exists()).toEqual(
      true,
    );

    driver.clickPopoverMenu();
    await eventually(async () =>
      expect(await driver.getHiddenActionsCount()).toEqual(2),
    );
  });

  it('should trigger secondary action on click', async () => {
    const actionTriggers = Array(4)
      .fill()
      .map(() => jest.fn());

    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps({
          actionTriggers,
          actionDataHooks: [
            undefined,
            'data-hook-for-1',
            undefined,
            'data-hook-for-3',
          ],
        })}
      />,
    );

    driver.clickVisibleAction(0);
    driver.clickVisibleActionByDataHook('data-hook-for-1');

    driver.clickPopoverMenu();
    await eventually(() => driver.clickHiddenAction(0));

    driver.clickPopoverMenu();
    await eventually(() =>
      driver.clickHiddenActionByDataHook('data-hook-for-3'),
    );

    actionTriggers.forEach(actionTrigger => {
      expect(actionTrigger).toHaveBeenCalledTimes(1);
    });
  });

  it('should render disabled hidden actions', async () => {
    const actionTrigger = jest.fn();
    const disabledAction = {
      text: `Disabled Action`,
      icon: <span>Icon</span>,
      onClick: actionTrigger,
      disabled: true,
    };
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        secondaryActions={[disabledAction]}
        numOfVisibleSecondaryActions={0}
      />,
    );

    driver.clickPopoverMenu();

    await eventually(() => driver.clickHiddenAction(0));

    expect(actionTrigger).not.toHaveBeenCalled();
  });

  it('should allow to change the number of visible secondary actions', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        numOfVisibleSecondaryActions={3}
      />,
    );

    expect(driver.getVisibleActionsCount()).toEqual(3);

    driver.clickPopoverMenu();
    await eventually(async () =>
      expect(await driver.getHiddenActionsCount()).toEqual(1),
    );
  });

  it('should allow to have no visible secondary actions', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        numOfVisibleSecondaryActions={0}
      />,
    );

    expect(driver.getVisibleActionsCount()).toEqual(0);

    driver.clickPopoverMenu();
    await eventually(async () =>
      expect(await driver.getHiddenActionsCount()).toEqual(4),
    );
  });

  it('should mark the primary action as disabled', () => {
    const driver = createDriver(
      <TableActionCell {...primaryActionProps(() => {}, true)} />,
    );

    expect(driver.getIsPrimaryActionButtonDisabled()).toBe(true);
  });

  describe('when a secondary action is disabled', () => {
    it('should mark the a visible secondary actions as disabled', () => {
      const actionTrigger = jest.fn();

      const disabledAction = {
        text: `Disabled Action`,
        icon: <span>Icon</span>,
        onClick: actionTrigger,
        disabled: true,
      };

      const driver = createDriver(
        <TableActionCell
          {...primaryActionProps()}
          secondaryActions={[disabledAction]}
          numOfVisibleSecondaryActions={1}
        />,
      );

      const isDisabled = driver
        .getVisibleActionButtonDriver(0)
        .isButtonDisabled();
      expect(isDisabled).toBe(true);
    });

    describe('when disabledTooltipText is supplied', () => {
      it('should show correct tooltip text', async () => {
        const actionTrigger = jest.fn();

        const disabledAction = {
          text: `Disabled Action`,
          icon: <span>Icon</span>,
          onClick: actionTrigger,
          disabled: true,
          disabledDescription: 'disabled item tooltip text',
        };

        const driver = createDriver(
          <TableActionCell
            {...primaryActionProps()}
            secondaryActions={[disabledAction]}
            numOfVisibleSecondaryActions={1}
          />,
        );

        const tooltipDriver = driver.getVisibleActionTooltipDriver(0);
        tooltipDriver.mouseEnter();

        await eventually(() =>
          expect(tooltipDriver.getContent()).toEqual(
            'disabled item tooltip text',
          ),
        );
      });
    });

    describe('when disabledTooltipText is not supplied', () => {
      it('should show correct tooltip text', async () => {
        const actionTrigger = jest.fn();

        const disabledAction = {
          text: `Disabled Action`,
          icon: <span>Icon</span>,
          onClick: actionTrigger,
          disabled: true,
        };

        const driver = createDriver(
          <TableActionCell
            {...primaryActionProps()}
            secondaryActions={[disabledAction]}
            numOfVisibleSecondaryActions={1}
          />,
        );

        const tooltipDriver = driver.getVisibleActionTooltipDriver(0);
        tooltipDriver.mouseEnter();

        await eventually(() =>
          expect(tooltipDriver.getContent()).toEqual('Disabled Action'),
        );
      });
    });
  });
});
