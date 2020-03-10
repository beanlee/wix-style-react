import React from 'react';
import { array, bool, func, node, number, oneOf, string } from 'prop-types';

import AddColor from './AddColor';
import Tooltip from '../Tooltip';
import parseColor from 'color';

import { Layout } from '../Layout';

import FillPreview from '../FillPreview';

import { dataHooks } from './constants';

const MINIMUM_GRID_GAP = 6;

/** Color swatches */
const Swatches = props => {
  const {
    colors,
    onClick,
    selected,
    dataHook,
    showClear,
    showClearMessage,
    showAddButton,
    addButtonMessage,
    addButtonIconSize,
    onAdd,
    onChange,
    onCancel,
    columns,
    gap,
  } = props;

  const hexColors = colors.map(color => {
    const maybeColor = parseColor(color);
    return maybeColor ? maybeColor.hex() : color;
  });

  const uniqueColors = Array.from(new Set(hexColors));

  return (
    <Layout
      dataHook={dataHook}
      cols={columns}
      gap={`${Math.max(MINIMUM_GRID_GAP, gap)}px`}
    >
      {showAddButton && (
        <AddColor
          tooltip={addButtonMessage}
          iconSize={addButtonIconSize}
          onAdd={onAdd}
          onChange={onChange}
          onCancel={onCancel}
        />
      )}

      {showClear && (
        <Tooltip
          dataHook={dataHooks.emptyTooltip}
          disabled={!showClearMessage}
          appendTo="window"
          size="small"
          content={showClearMessage}
        >
          <FillPreview
            dataHook={dataHooks.empty}
            onClick={() => onClick('')}
            selected={selected === ''}
          />
        </Tooltip>
      )}

      {uniqueColors.map((color, index) => (
        <FillPreview
          dataHook={dataHooks.swatch}
          key={`${color}-${index}`}
          fill={color}
          onClick={() => onClick(color)}
          selected={selected === color}
        />
      ))}
    </Layout>
  );
};

Swatches.propTypes = {
  /** Array of colors to be shown as swatches */
  colors: array,

  /** Selected color */
  selected: string,

  /** Data-hook for testing */
  dataHook: string,

  /** Callback function when user clicks on a swatch. Returns color HEX string representation. */
  onClick: func,

  /** Size of swatches */
  size: oneOf(['small', 'medium']),

  /** If true shows no color option */
  showClear: bool,

  /** optional message to display in tooltip when showClear is true */
  showClearMessage: node,

  /** Callback function when user clicks on Add button and selects a color to be added. Returns color HEX string representation. */
  onAdd: func,

  /** Callback function when user changes color in Color Picker. Returns color HEX string representation. */
  onChange: func,

  /** Callback function when user closes Color Picker without picking color. */
  onCancel: func,

  /** If true shows add button which triggers colors picker*/
  showAddButton: bool,

  /** Text for add button tooltip*/
  addButtonMessage: string,

  /** Size of Plus icon inside add button */
  addButtonIconSize: oneOf(['small', 'medium']),

  /** Number of maximum columns. Default value is 6 */
  columns: number,

  /** Gap between swatches. Default value is 12 */
  gap: number,
};

Swatches.defaultProps = {
  colors: [],
  onClick: () => {},
  selected: '',
  showClearMessage: '',
  columns: 6,
  gap: 12,
};

export default Swatches;
