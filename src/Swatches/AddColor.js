import React from 'react';

import ColorPicker from '../ColorPicker';
import Color from 'color';
import Popover from '../Popover';
import FillButton from '../FillButton';

import { dataHooks } from './constants';

const EMPTY_COLOR = Color('#00000000');

class AddColor extends React.PureComponent {
  state = {
    color: EMPTY_COLOR,
    shown: false,
  };

  toggleColorPicker = () =>
    this.setState({
      shown: !this.state.shown,
    });

  hideColorPicker = () =>
    this.setState({
      shown: false,
      color: EMPTY_COLOR,
    });

  setColor = color => {
    this.setState({
      color,
    });
    if (this.props.onChange) {
      this.props.onChange(color.hex());
    }
  };

  confirm = () => {
    this.hideColorPicker();
    this.props.onAdd(this.state.color.hex());
  };

  cancel = () => {
    this.hideColorPicker();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render() {
    const { tooltip, iconSize } = this.props;
    const { shown, color } = this.state;
    const isEmptyColor = color.alpha() === 0;
    const noColorSelected = !shown || isEmptyColor;
    const buttonColor = noColorSelected ? undefined : color.hex();

    return (
      <Popover
        dataHook={dataHooks.addButtonPopover}
        appendTo="window"
        placement="top"
        showArrow
        shown={shown}
        onClickOutside={this.cancel}
      >
        <Popover.Element>
          <FillButton
            dataHook={dataHooks.addButton}
            iconSize={iconSize}
            fill={buttonColor}
            onClick={this.toggleColorPicker}
            tooltipProps={{ disabled: shown, timeout: 0, content: tooltip }}
          />
        </Popover.Element>
        <Popover.Content>
          <ColorPicker
            allowEmpty={false}
            dataHook={dataHooks.addButtonColorPicker}
            onCancel={this.cancel}
            onChange={this.setColor}
            onConfirm={this.confirm}
            showConverter={false}
            showInput={false}
            value={isEmptyColor ? '' : color}
          />
        </Popover.Content>
      </Popover>
    );
  }
}
export default AddColor;
