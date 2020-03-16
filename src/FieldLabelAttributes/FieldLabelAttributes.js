import React from 'react';
import { bool, node } from 'prop-types';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';
import styles from './FieldLabelAttributes.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Tooltip from '../Tooltip';

class FieldLabelAttributes extends WixComponent {
  static tooltipDefaultProps = {
    moveBy: { x: 0, y: -1 },
    minWidth: '150px',
  };

  infoIcon = (
    <span data-hook="info" className={styles.icon}>
      <InfoCircle />
    </span>
  );

  getTooltip = () => {
    if (this.props.info) {
      return React.createElement(Tooltip, {
        ...this.tooltipDefaultProps,
        content: this.props.info,
        children: this.infoIcon,
      });
    } else if (this.props.tooltip) {
      return React.cloneElement(this.props.tooltip, {
        ...this.tooltipDefaultProps,
        children: this.props.tooltip.props.children || this.infoIcon,
      });
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={styles.root} data-hook="field-label-attributes">
        {this.props.required && (
          <span data-hook="required" className={styles.required}>
            *
          </span>
        )}

        {this.getTooltip()}
      </div>
    );
  }
}

FieldLabelAttributes.defaultProps = {
  required: false,
  info: '',
  appendToParent: true,
  tooltip: null,
};

FieldLabelAttributes.propTypes = {
  required: bool,
  info: node,
  appendToParent: bool,
  tooltip: node,
};

export default FieldLabelAttributes;
