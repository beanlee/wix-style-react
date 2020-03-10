import React from 'react';
import { node, bool, string } from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';

import Tooltip from '../../Tooltip';
import styles from './ToggleIcon.st.css';

const Icon = ({
  'data-click': dataClick,
  selected,
  onClick,
  focusableOnFocus,
  focusableOnBlur,
  children,
  ...rest
}) => (
  <button
    {...rest}
    {...styles('button', { selected }, rest)}
    data-click={dataClick}
    data-hook="toggle-icon"
    data-selected={selected}
    onClick={onClick}
    onFocus={focusableOnFocus}
    onBlur={focusableOnBlur}
    type="button"
  >
    {children}
  </button>
);

const FocusableIcon = withFocusable(Icon);

class ToggleIcon extends React.Component {
  static displayName = 'SegmentedToggle.Icon';

  static propTypes = {
    children: node,
    selected: bool,
    value: string,
    tooltipText: string,
    disabled: bool,
  };

  render() {
    const {
      children,
      selected,
      tooltipText,
      focusableOnFocus,
      focusableOnBlur,
      onClick,
      dataHook,
      'data-click': dataClick,
      ...rest
    } = this.props;
    return (
      <Tooltip
        {...styles('tooltip', {}, rest)}
        dataHook={dataHook}
        appendTo="window"
        placement="top"
        content={tooltipText}
        timeout={0}
      >
        <FocusableIcon
          {...rest}
          selected={selected}
          data-click={dataClick}
          onClick={onClick}
          onFocus={focusableOnFocus}
          onBlur={focusableOnBlur}
        >
          {children}
        </FocusableIcon>
      </Tooltip>
    );
  }
}

export default ToggleIcon;
