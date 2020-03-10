import React, { cloneElement, Component } from 'react';
import { bool, func, node, object, oneOf, oneOfType, string } from 'prop-types';
import { iconChildSize, SIZES } from './constants';
import styles from './ToggleButton.st.css';
import Tooltip from '../Tooltip';
import { ButtonNext } from 'wix-ui-core/dist/src/components/button-next';

const childSize = iconChildSize[SIZES.medium];

class ToggleButton extends Component {
  static displayName = 'ToggleButton';

  static propTypes = {
    /** render as some other component or DOM tag */
    as: oneOfType([func, object, string]),
    /** Used for passing any wix-style-react icon. For external icon make sure to follow ux sizing guidelines */
    children: node,
    /** Button skins */
    skin: oneOf(['standard', 'dark']),
    /** Click event handler  */
    onClick: func,
    /** Applies selected styles */
    selected: bool,
    /** Applies disabled styles */
    disabled: bool,
    /** String based data hook */
    dataHook: string,
    /** Tooltip content that will appear on hover */
    tooltipContent: node,
    /** Tooltip props */
    tooltipProps: object,
  };

  static defaultProps = {
    skin: 'standard',
    disabled: false,
    tooltipContent: '',
    tooltipProps: {
      placement: 'top',
    },
  };

  render() {
    const {
      skin,
      children,
      selected,
      dataHook,
      tooltipContent,
      tooltipProps,
      ...rest
    } = this.props;

    return (
      <Tooltip
        {...tooltipProps}
        size="small"
        content={tooltipContent}
        data-hook={dataHook}
      >
        <ButtonNext
          {...rest}
          {...styles('root', { skin, selected }, rest)}
          data-hook="togglebutton-trigger"
          data-selected={selected}
          data-skin={skin}
        >
          {children &&
            cloneElement(children, {
              width: childSize,
              height: childSize,
            })}
        </ButtonNext>
      </Tooltip>
    );
  }
}

export default ToggleButton;
