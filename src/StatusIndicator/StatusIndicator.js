import React from 'react';
import PropTypes from 'prop-types';

import styles from './StatusIndicator.st.css';
import Tooltip from '../Tooltip';
import FormFieldWarningFilled from 'wix-ui-icons-common/system/FormFieldWarningFilled';
import FormFieldErrorFilled from 'wix-ui-icons-common/system/FormFieldErrorFilled';
import Loader from '../Loader';
import { dataHooks, STATUS } from './constants';

/** StatusIndicator */
class StatusIndicator extends React.PureComponent {
  _renderStatus = () => {
    switch (this.props.status) {
      case STATUS.WARNING:
        return <FormFieldWarningFilled />;
      case STATUS.LOADING:
        return <Loader size="tiny" />;
      case STATUS.ERROR:
      default:
        return <FormFieldErrorFilled />;
    }
  };

  render() {
    const { dataHook, status, message, tooltipPlacement } = this.props;

    return (
      <div
        {...styles('root', { status }, this.props)}
        data-hook={dataHook}
        data-status={status}
      >
        {message ? (
          <Tooltip
            dataHook={dataHooks.tooltip}
            appendTo="window"
            placement={tooltipPlacement}
            exitDelay={100}
            content={message}
            maxWidth={250}
          >
            {this._renderStatus()}
          </Tooltip>
        ) : (
          this._renderStatus()
        )}
      </div>
    );
  }
}

StatusIndicator.displayName = 'StatusIndicator';

StatusIndicator.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** The indication type */
  status: PropTypes.oneOf(['error', 'warning', 'loading']),

  /** A tooltip message */
  message: PropTypes.string,

  /** The tooltip Placement */
  tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

StatusIndicator.defaultProps = {
  status: 'error',
  tooltipPlacement: 'top',
};

export default StatusIndicator;
