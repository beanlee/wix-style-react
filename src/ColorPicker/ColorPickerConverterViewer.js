import React, { PureComponent } from 'react';
import { func, node, object } from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import AddSmall from 'wix-ui-icons-common/AddSmall';

import Color from 'color';
import styles from './ColorPickerConverter.st.css';
import Tooltip from '../Tooltip';
import { DataHooks } from './constants';

function getContrastColor(bg, light = '#ffffff', dark = '#162d3d') {
  try {
    const color = Color(bg);
    const luminosity = color.luminosity();

    if (luminosity > 0.5) {
      return dark;
    } else {
      return light;
    }
  } catch (err) {}
}

class ColorPickerConverterViewer extends PureComponent {
  static propTypes = {
    color: object,
    onAdd: func,
    addTooltipContent: node,
  };

  onAddClick = () => {
    const { color, onAdd } = this.props;
    const noColorSelected = color.alpha() === 0;

    !!onAdd && !noColorSelected && onAdd(color.hex());
  };

  addTooltip = element => {
    const { addTooltipContent } = this.props;

    return (
      <Tooltip
        disabled={!addTooltipContent}
        content={addTooltipContent}
        size="small"
      >
        {element}
      </Tooltip>
    );
  };

  render() {
    const { color, onAdd, focusableOnFocus, focusableOnBlur } = this.props;
    const noColorSelected = color.alpha() === 0;
    const clickable = !!onAdd && !noColorSelected;

    const styleProps = {
      clickable,
      noColorSelected,
    };

    const viewer = React.createElement(
      clickable ? 'button' : 'div',
      {
        style: {
          backgroundColor: noColorSelected ? undefined : color.hex(),
        },
        'data-hook': DataHooks.addColor,
        onFocus: focusableOnFocus,
        onBlur: focusableOnBlur,
        ...styles('preview', styleProps, this.props),
        onClick: this.onAddClick,
      },
      clickable && (
        <AddSmall style={{ color: getContrastColor(color.hex()) }} />
      ),
    );

    return clickable ? this.addTooltip(viewer) : viewer;
  }
}

export default withFocusable(ColorPickerConverterViewer);
