import React from 'react';
import PropTypes from 'prop-types';
import styles from './LinearProgressBar.st.css';
import { LinearProgressBar as CoreLinearProgressBar } from 'wix-ui-core/dist/src/components/linear-progress-bar';
import ToggleOn from 'wix-ui-icons-common/system/ToggleOn';
import StatusIndicator from '../StatusIndicator';
import { dataHooks } from './constants';

/**
 * This component is used for indicating a progress along a process.*/
class LinearProgressBar extends React.PureComponent {
  render() {
    const {
      errorMessage,
      skin,
      light,
      dataHook,
      error,
      shouldLoadAsync,
      ...otherProps
    } = this.props;

    return (
      <CoreLinearProgressBar
        data-hook={dataHook}
        {...styles('root', { light, skin }, this.props)}
        data-skin={skin}
        {...otherProps}
        error={error}
        successIcon={<ToggleOn />}
        errorIcon={
          <StatusIndicator
            dataHook={dataHooks.errorIcon}
            status="error"
            message={errorMessage}
          />
        }
      />
    );
  }
}

LinearProgressBar.displayName = 'LinearProgressBar';

LinearProgressBar.propTypes = {
  /** Hook for testing purposes. */
  dataHook: PropTypes.string,

  /** Use to apply error styles */
  error: PropTypes.bool,

  /** Message to display when an error happens */
  errorMessage: PropTypes.string,

  /** Use light theme instead of dark theme */
  light: PropTypes.bool,

  /** Use to display a percentage progress.*/
  showProgressIndication: PropTypes.bool,

  /** The number of the percentage progress */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Sets the skin of the Linear Progress Bar. */
  skin: PropTypes.oneOf(['standard', 'success']),
};

LinearProgressBar.defaultProps = {
  skin: 'standard',
};

export default LinearProgressBar;
