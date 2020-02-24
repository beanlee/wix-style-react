import React from 'react';
import eventually from 'wix-eventually';
import { mount } from 'enzyme';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../../../test/utils/react';
import { enzymeUniTestkitFactoryCreator } from 'wix-ui-test-utils/enzyme';
import DataTable from '../DataTable';
import dataTableDriverFactory from '../DataTable.driver';
import { dataTableUniDriverFactory } from '../DataTable.uni.driver';

describe('Table', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(dataTableDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(dataTableUniDriverFactory));
  });

  function runTests(render) {
    afterEach(() => cleanup());

    const createDriver = jsx => render(jsx).driver;

    const createDefaultProps = () => ({
      id: 'id',
      data: [
        { a: 'value 1', b: 'value 2' },
        { a: 'value 3', b: 'value 4' },
      ],
      columns: [
        { title: 'Row Num', render: (row, rowNum) => rowNum },
        { title: 'A', render: row => row.a },
        { title: 'B', render: row => row.b },
      ],
      rowClass: 'class-name',
    });

    const defaultProps = createDefaultProps();

    it('should pass id prop to child', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.hasChildWithId(defaultProps.id)).toBe(true);
    });

    describe('data is empty', () => {
      const rowDataHook = 'row-data-hook';
      const props = Object.assign({}, defaultProps, {
        data: [],
        rowDataHook,
      });

      it('should not render the component when no data supplied', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.exists()).toEqual(false);
      });

      it('should render the component when data is supplied', async () => {
        const driver = createDriver(<DataTable {...defaultProps} />);
        expect(await driver.exists()).toEqual(true);
      });

      it('should display nothing', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.isDisplayingNothing()).toBe(true);
      });

      it('should count 0 rows', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.getRowsCount()).toEqual(0);
      });

      it('should count 0 rows with class name', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(
          await driver.getRowsWithClassCount(defaultProps.rowClass),
        ).toEqual(0);
      });

      it('should find 0 rows with data-hook', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.getRowsWithDataHook(rowDataHook)).toHaveLength(0);
      });

      it('should not find a row with data-hook', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.getRowWithDataHook(rowDataHook)).toEqual(null);
      });

      it('should not a header only', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.isDisplayingHeaderOnly()).toBeFalsy;
      });

      it('should not a header ', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.isDisplayingHeader()).toBeFalsy;
      });

      it('should not find a child with id', async () => {
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.hasChildWithId(defaultProps.id)).toBeFalsy;
      });

      // There rest of the driver's methods would throw some error
    });

    it('should display something when data is non-empty', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.isDisplayingNothing()).toBe(false);
    });

    it('should display header only when data is empty and showHeaderWhenEmpty is true', async () => {
      const props = {
        ...defaultProps,
        data: [],
        showHeaderWhenEmpty: true,
      };

      const driver = createDriver(<DataTable {...props} />);
      expect(await driver.isDisplayingHeaderOnly()).toBe(true);
    });

    it('should render column titles', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.getTitles()).toEqual(
        defaultProps.columns.map(col => col.title),
      );
    });

    describe('column width', () => {
      const columns = [
        { title: 'Row Num', width: '30%', render: (row, rowNum) => rowNum },
        { title: 'A', width: '40px', render: row => row.a },
        { title: 'B', width: '50px', render: row => row.b },
      ];

      it('should apply column.width', async () => {
        const driver = createDriver(
          <DataTable {...defaultProps} columns={columns} />,
        );
        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
          const column = columns[colIndex];
          expect(await driver.getHeaderCellWidth(colIndex)).toEqual(
            column.width,
          );
          for (
            let rowIndex = 0;
            rowIndex < (await driver.getRowsCount());
            rowIndex++
          ) {
            expect(await driver.getCellWidth(rowIndex, colIndex)).toBe('');
          }
        }
      });

      it('should apply column.width when header is hidden', async () => {
        const driver = createDriver(
          <DataTable {...defaultProps} columns={columns} hideHeader />,
        );
        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
          const column = columns[colIndex];
          for (
            let rowIndex = 0;
            rowIndex < (await driver.getRowsCount());
            rowIndex++
          ) {
            if (rowIndex === 0) {
              expect(await driver.getCellWidth(rowIndex, colIndex)).toEqual(
                column.width,
              );
            } else {
              expect(await driver.getCellWidth(rowIndex, colIndex)).toBe('');
            }
          }
        }
      });
    });

    it('should display correct amount of rows', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.getRowsCount()).toBe(defaultProps.data.length);
    });

    it('should render rows', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.getRowText(0)).toEqual(['0', 'value 1', 'value 2']);
      expect(await driver.getRowText(1)).toEqual(['1', 'value 3', 'value 4']);
    });

    it('should assign class to rows', async () => {
      const driver = createDriver(<DataTable {...defaultProps} />);
      expect(await driver.getRowsWithClassCount(defaultProps.rowClass)).toBe(
        defaultProps.data.length,
      );
    });

    it('should assign a dynamic class to rows', async () => {
      const getClass = rowData => rowData.a.replace(/[\s]+/g, '-');
      const driver = createDriver(
        <DataTable {...defaultProps} dynamicRowClass={getClass} />,
      );
      expect(await driver.getRowsWithClassCount('value-1')).toBe(1);
      expect(await driver.getRowsWithClassCount('value-3')).toBe(1);
      expect(await driver.getRowsWithClassCount(defaultProps.rowClass)).toBe(
        defaultProps.data.length,
      );
    });

    it('should assign dataHook to rows', async () => {
      const rowDataHook = 'row-data-hook';
      const props = Object.assign({}, defaultProps, { rowDataHook });
      const driver = createDriver(<DataTable {...props} />);
      expect(
        (await driver.getRowsWithDataHook(rowDataHook))[0].textContent,
      ).toBe('0value 1value 2');
      expect(
        (await driver.getRowsWithDataHook(rowDataHook))[1].textContent,
      ).toBe('1value 3value 4');
      expect(await driver.getRowsWithDataHook(rowDataHook)).toHaveLength(
        defaultProps.data.length,
      );
    });

    it('should assign a dynamic dataHook to rows', async () => {
      const calcDataHook = (rowData, rowIndex) =>
        `row-index-${rowIndex}-a-${rowData.a.replace(' ', '_')}`;
      const props = Object.assign({}, defaultProps, {
        rowDataHook: calcDataHook,
      });
      const driver = createDriver(<DataTable {...props} />);
      expect(
        (await driver.getRowWithDataHook(`row-index-0-a-value_1`)).textContent,
      ).toBe('0value 1value 2');
      expect(
        (await driver.getRowWithDataHook(`row-index-1-a-value_3`)).textContent,
      ).toBe('1value 3value 4');
    });

    it('should get a row classes', async () => {
      const getDynamicClass = (rowData, rowNum) =>
        rowNum === 1 ? 'rowNum1' : '';
      const driver = createDriver(
        <DataTable {...defaultProps} dynamicRowClass={getDynamicClass} />,
      );
      expect((await driver.getRowClasses(1)).sort()).toEqual([
        'class-name',
        'rowNum1',
      ]);
    });

    it('should hide table header', async () => {
      const driver = createDriver(<DataTable {...defaultProps} hideHeader />);
      expect(await driver.isDisplayingHeader()).toBe(false);
    });

    it('should override default table header styles', async () => {
      const inlineThStyle = {
        thPadding: '1px',
        thHeight: '2px',
        thFontSize: '3px',
        thBorder: '4px',
        thColor: 'rgb(18, 52, 86)',
        thOpacity: '0.8',
        thLetterSpacing: '1.5px',
      };
      const driver = createDriver(
        <DataTable {...defaultProps} {...inlineThStyle} />,
      );
      expect(await driver.getHeaderCellStyle(0)).toEqual(
        jasmine.objectContaining({
          padding: '1px',
          height: '2px',
          'font-size': '3px',
          border: '4px',
          color: 'rgb(18, 52, 86)',
          opacity: '0.8',
          'letter-spacing': '1.5px',
        }),
      );
    });

    it('should override default cell styles', async () => {
      const clonedProps = Object.assign({}, defaultProps);
      clonedProps.columns.push({
        title: 'c',
        render: () => 'c',
        style: {
          paddingLeft: '1px',
          height: '2px',
          width: '100px',
        },
      });
      const driver = createDriver(<DataTable {...clonedProps} />);
      expect(await driver.getCellStyle(0, 3)).toEqual(
        jasmine.objectContaining({
          'padding-left': '1px',
          height: '2px',
          width: '100px',
        }),
      );
    });

    it('should override default cell styles using function', async () => {
      const clonedProps = Object.assign({}, defaultProps);
      clonedProps.columns.push({
        title: 'c',
        render: () => 'c',
        style: (_column, _row, rowNum) => ({
          paddingLeft: rowNum + 'px',
        }),
      });
      const driver = createDriver(<DataTable {...clonedProps} />);
      expect(await driver.getCellStyle(1, 3)).toEqual(
        jasmine.objectContaining({
          'padding-left': '1px',
        }),
      );
    });

    describe('clickableDataRow class', () => {
      it('should not assign the class to rows by default', async () => {
        const props = { ...defaultProps };

        const driver = createDriver(<DataTable {...props} />);

        expect(await driver.isRowClickable(0)).toBe(false);
      });

      it('should assign the class to rows when onRowClick prop is provided', async () => {
        const props = {
          ...defaultProps,
          onRowClick: jest.fn(),
        };

        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.isRowClickable(0)).toBe(true);
      });
    });

    describe('animatedDataRow class', () => {
      it('should not assign the class to rows by default', async () => {
        const props = { ...defaultProps };

        const driver = createDriver(<DataTable {...props} />);

        expect(await driver.isRowAnimated(0)).toBe(false);
      });

      it('should assign the class to rows when rowDetails prop is provided', async () => {
        const props = {
          ...defaultProps,
          rowDetails: row => <span>{row.a}</span>,
        };

        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.isRowAnimated(0)).toBe(true);
      });
    });

    describe('Row event handlers', () => {
      const tests = [
        { handler: 'onRowClick', driverMethod: 'clickRow' },
        { handler: 'onMouseEnterRow', driverMethod: 'mouseEnterRow' },
        { handler: 'onMouseLeaveRow', driverMethod: 'mouseLeaveRow' },
      ];

      tests.forEach(({ handler, driverMethod }) => {
        it(`should call ${handler} with row data and index`, async () => {
          const props = {
            ...defaultProps,
            [handler]: jest.fn(),
          };

          const driver = createDriver(<DataTable {...props} />);

          await driver[driverMethod](0);
          expect(props[handler]).toBeCalledWith(props.data[0], 0);

          await driver[driverMethod](1);
          expect(props[handler]).toHaveBeenLastCalledWith(props.data[1], 1);
        });
      });

      it('should expand with correct content and collapse', async () => {
        const animationSpeed = 500;

        const props = {
          ...defaultProps,
          rowDetails: row => <span>{row.a}</span>,
        };

        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.hasRowDetails(0)).toBe(true);
        expect(await driver.getRowDetailsText(0)).toBe('');
        await driver.clickRow(0);

        // After clicking content will appear at once
        expect(await driver.getRowDetailsText(0)).toBe(defaultProps.data[0].a);
        await driver.clickRow(0);
        expect(await driver.hasRowDetails(0)).toBe(true);

        // When we clicking second time to collapse content will disappear after a while (based on animation speed)
        expect(await driver.getRowDetailsText(0)).not.toBe('');

        return eventually(
          async () => {
            expect(await driver.getRowDetailsText(0)).toBe('');
          },
          { timeout: animationSpeed },
        );
      });

      it('should position rowDetails correctly when adding rows to the top of the table', async () => {
        const props = {
          data: [{ a: 'foo', b: 'bar' }],
          columns: [
            { title: 'Row Num', render: (row, rowNum) => rowNum },
            { title: 'A', render: row => row.a },
            { title: 'B', render: row => row.b },
          ],
          rowDetails: row => row.a,
        };

        const dataHook = 'myDataHook';
        const wrapper = mount(<DataTable {...props} dataHook={dataHook} />);

        const dataTableEnzymeTestkitFactory = enzymeUniTestkitFactoryCreator(
          dataTableUniDriverFactory,
        );
        const dataTableTestkit = dataTableEnzymeTestkitFactory({
          wrapper,
          dataHook,
        });

        expect(await dataTableTestkit.getRowDetailsText(0)).toBe('');
        await dataTableTestkit.clickRow(0);
        expect(await dataTableTestkit.getRowDetailsText(0)).toBe('foo');

        wrapper.setProps({
          data: [{ a: 'value 5', b: 'value 6' }, ...props.data],
        });

        await eventually(async () => {
          expect(await dataTableTestkit.getRowDetailsText(0)).toBe('');
          expect(await dataTableTestkit.getRowDetailsText(1)).toBe('foo');
        });
      });

      it('should have correct row count when row details enabled', async () => {
        const props = {
          ...defaultProps,
          rowDetails: jest.fn(),
        };

        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.getRowsCount()).toBe(2);
        await driver.clickRow(0);
        expect(await driver.getRowsCount()).toBe(2);
      });
    });

    describe('onCellClick', () => {
      it(`should call onCellClick with column data, row data and index`, async () => {
        const columnClickHandler = jest.fn();
        const props = {
          ...defaultProps,
          columns: [
            {
              title: 'Row Num',
              render: (row, rowNum) => rowNum,
              onCellClick: columnClickHandler,
            },
            { title: 'A', render: row => row.a },
          ],
        };

        const driver = createDriver(<DataTable {...props} />);

        await driver.clickColumn(0, 0);
        expect(columnClickHandler).toBeCalledWith(
          props.columns[0],
          props.data[0],
          0,
          expect.anything(),
        );

        columnClickHandler.mockReset();
        await driver.clickColumn(0, 1);
        expect(columnClickHandler).not.toBeCalled();
      });
    });
    describe('Sortable column titles', () => {
      let props;

      beforeEach(() => {
        props = {
          ...defaultProps,
          columns: [
            { title: 'Row Num', render: (row, rowNum) => rowNum },
            {
              title: 'A',
              sortable: true,
              sortDescending: false,
              render: row => row.a,
            },
            { title: 'B', render: row => row.b },
            {
              title: 'C',
              sortable: true,
              sortDescending: true,
              render: row => row.a,
            },
          ],
        };
      });

      it('should display sortable title', async () => {
        const _props = Object.assign({}, props, { onSortClick: jest.fn() });
        const driver = createDriver(<DataTable {..._props} />);
        expect(await driver.hasSortableTitle(0)).toBe(false);
        expect(await driver.hasSortableTitle(1)).toBe(true);
      });

      it('should display sort asc/desc style', async () => {
        const _props = Object.assign({}, props, { onSortClick: jest.fn() });
        const driver = createDriver(<DataTable {..._props} />);
        expect(await driver.hasSortDescending(1)).toBe(false);
        expect(await driver.hasSortDescending(3)).toBe(true);
      });

      it('should call on sort callback', async () => {
        const _props = Object.assign({}, props, { onSortClick: jest.fn() });
        const driver = createDriver(<DataTable {..._props} />);
        await driver.clickSort(1);
        expect(_props.onSortClick).toBeCalledWith(props.columns[1], 1);
      });

      it('should not call on sort callback when non-sortable column is clicked', async () => {
        const _props = Object.assign({}, props, { onSortClick: jest.fn() });
        const driver = createDriver(<DataTable {..._props} />);
        await driver.clickSort(2);
        expect(_props.onSortClick).not.toHaveBeenCalled();
      });
    });

    describe('Tooltip titles', () => {
      it('should display tooltip icon', async () => {
        const props = {
          ...defaultProps,
          columns: [
            { title: 'Row Num', render: (row, rowNum) => rowNum },
            {
              title: 'A',
              infoTooltipProps: { content: 'Vary informative tooltip text' },
              render: row => row.a,
            },
            { title: 'B', render: row => row.b },
          ],
        };
        const driver = createDriver(<DataTable {...props} />);
        expect(await driver.hasInfoIcon(0)).toBe(false);
        expect(await driver.hasInfoIcon(1)).toBe(true);
      });
    });

    describe('Virtualization', () => {
      it('should render a small portion of the lines', async () => {
        const tableProps = createDefaultProps();
        tableProps.data = [...Array(14)].map((_n, i) => ({
          id: i,
          a: `value a ${i}`,
          b: `value b ${i}`,
        }));
        const props = {
          ...tableProps,
          virtualized: true,
          virtualizedTableHeight: 350,
          virtualizedLineHeight: 60,
        };
        const driver = createDriver(<DataTable {...props} />);
        // 5 items can fit in fully.
        // 1 item appear only partially
        // 2 items are for better scrolling reasons
        expect(await driver.getRowsCount()).toBe(8);
      });
    });

    it('should highlight even rows', async () => {
      const driver = createDriver(
        <DataTable
          {...defaultProps}
          isRowHighlight={(_, rowNum) => rowNum % 2 === 0}
        />,
      );

      const classes = (await driver.getRowClasses(0)).sort();
      expect(classes.includes('highlight')).toEqual(true);
    });
  }

  describe('row keys', () => {
    const createDefaultProps = () => ({
      id: 'id',
      data: [
        { a: 'value 1', b: 'value 2' },
        { a: 'value 3', b: 'value 4' },
      ],
      columns: [
        { title: 'Row Num', render: (row, rowNum) => rowNum },
        { title: 'A', render: row => row.a },
        { title: 'B', render: row => row.b },
      ],
      rowClass: 'class-name',
    });

    const getRowKey = (wrapper, index) =>
      wrapper
        .find('tbody tr[data-table-row="dataTableRow"]')
        .at(index)
        .key();

    it('should assign data.id as row keys', async () => {
      const props = createDefaultProps();
      props.data[0].id = '000';
      props.data[1].id = '111';
      const wrapper = mount(<DataTable {...props} />);
      expect(getRowKey(wrapper, 0)).toBe('000');
      expect(getRowKey(wrapper, 1)).toBe('111');
    });

    it('should use rowIndex as keys', async () => {
      const wrapper = mount(<DataTable {...createDefaultProps()} />);
      expect(getRowKey(wrapper, 0)).toBe('0');
      expect(getRowKey(wrapper, 1)).toBe('1');
    });
  });
});
