import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import { Hash } from './components/Hash';
import { ColorViewer } from './components/ColorViewer';

import { validateHex, normalizeHexInput } from './hex-helpers';

class ColorInput extends React.Component {
  static displayName = 'ColorInput';

  static propTypes = {
    /** placeholder to display */
    placeholder: PropTypes.string,
    /** when set to true this component is disabled */
    disabled: PropTypes.bool,
    /** Sets UI to indicate a status */
    status: PropTypes.oneOf(['error', 'warning', 'loading']),
    /** The status message to display when hovering the status icon, if not given or empty there will be no tooltip */
    statusMessage: PropTypes.node,
    /** input size */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** colorpicker popover placement */
    popoverPlacement: PropTypes.oneOf([
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ]),
    /** colorpicker popover calculation to a dom element */
    popoverAppendTo: PropTypes.oneOf([
      'window',
      'scrollParent',
      'viewport',
      'parent',
    ]),
    /** input value */
    value: PropTypes.string.isRequired,
    /** returns confirmed value */
    onConfirm: PropTypes.func,
    /** returns last confirmed value which is from user prop - value */
    onCancel: PropTypes.func,
    /** returns either input's or colorpicker's changed value */
    onChange: PropTypes.func,
    /** Children to render in <ColorPicker /> component */
    colorPickerChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /** Callback called with color `hex` string when add color button pressed */
    onAddColor: PropTypes.func,
    /** Content to show in color picker add button tooltip */
    addTooltipContent: PropTypes.node,
    /** Popover props */
    popoverProps: PropTypes.object,
  };

  static defaultProps = {
    placeholder: '',
    size: 'medium',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    onChange: () => {},
    onConfirm: () => {},
    onCancel: () => {},
    popoverProps: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      previous: props.value,
      value: '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.active && props.value !== state.value) {
      return {
        value: normalizeHexInput(props.value),
      };
    }
    return {};
  }

  _renderPrefix = () => {
    const { disabled, size } = this.props;
    const { active, value } = this.state;
    const hash = (
      <Input.Affix>
        <Hash disabled={disabled} size={size} />
      </Input.Affix>
    );
    return active || value ? hash : undefined;
  };

  _renderSuffix = () => {
    const { value, active } = this.state;
    const {
      size,
      popoverPlacement,
      popoverAppendTo,
      disabled,
      colorPickerChildren,
      onAddColor,
      addTooltipContent,
      placeholder,
      popoverProps,
    } = this.props;
    return (
      <ColorViewer
        value={value}
        active={active}
        disabled={disabled}
        size={size}
        placement={popoverPlacement}
        appendTo={popoverAppendTo}
        onClick={this.click}
        onChange={this._onPickerChange}
        onCancel={this.cancel}
        onConfirm={this.confirm}
        onClickOutside={this.confirm}
        children={colorPickerChildren}
        onAddColor={onAddColor}
        addTooltipContent={addTooltipContent}
        placeholder={placeholder}
        popoverProps={popoverProps}
      />
    );
  };

  _onChange = evt => {
    const { onChange } = this.props;
    const value = normalizeHexInput(evt.target.value);
    this.setState({ value }, () => onChange(value));
  };

  _onPickerChange = value => {
    const { onChange } = this.props;
    this.setState({ active: true, value }, () => onChange(value));
  };

  _onFocus = () => this.setState({ active: true });

  _keyDown = e => {
    e.stopPropagation();
    e.key === 'Enter' && this.confirm();
    e.key === 'Escape' && this.cancel();
  };

  click = () => {
    this.input.focus();
    this.setState({ active: true });
  };

  confirm = () => {
    const { onConfirm, onChange } = this.props;
    const value = validateHex(this.state.value);
    this.setState({ active: false, value, previous: value }, () => {
      onConfirm(value);
      onChange(value);
    });
  };

  cancel = () => {
    const { onCancel, onChange } = this.props;
    const { previous } = this.state;

    this.setState({ active: false, value: previous }, () => {
      onCancel(previous);
      onChange(previous);
    });
  };

  render() {
    const { placeholder, size, ...rest } = this.props;
    const { active, value } = this.state;
    return (
      <Input
        {...rest}
        ref={input => (this.input = input)}
        placeholder={active ? '' : placeholder}
        size={size}
        onKeyDown={this._keyDown}
        onChange={this._onChange}
        onFocus={this._onFocus}
        onInputClicked={this.click}
        value={value.replace('#', '')}
        prefix={this._renderPrefix()}
        suffix={this._renderSuffix()}
      />
    );
  }
}

export default ColorInput;
