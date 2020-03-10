import React from 'react';
import { CircularProgressBar as CoreCircularProgressBar } from 'wix-ui-core/dist/src/components/circular-progress-bar';
import CircleLoaderCheck from 'wix-ui-icons-common/system/CircleLoaderCheck';
import CircleLoaderCheckSmall from 'wix-ui-icons-common/system/CircleLoaderCheckSmall';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import FormFieldErrorSmall from 'wix-ui-icons-common/system/FormFieldErrorSmall';
import Tooltip from '../Tooltip';
import style from './CircularProgressBar.st.css';
import PropTypes from 'prop-types';
import { dataHooks, Size, sizesMap } from './constants';

const sizeToSuccessIcon = {
  [Size.small]: <CircleLoaderCheckSmall />,
  [Size.medium]: <CircleLoaderCheck />,
  [Size.large]: <CircleLoaderCheck />,
};

const sizeToErrorIcon = {
  [Size.small]: <FormFieldErrorSmall />,
  [Size.medium]: <FormFieldError />,
  [Size.large]: <FormFieldError />,
};

class CircularProgressBar extends React.PureComponent {
  _renderProgressBar() {
    const { light, size, ...otherProps } = this.props;

    return (
      <CoreCircularProgressBar
        {...style('progressBar', { light, size }, this.props)}
        {...otherProps}
        data-hook={dataHooks.circularProgressBar}
        size={sizesMap[size]}
        data-size={size}
        successIcon={sizeToSuccessIcon[size]}
        errorIcon={sizeToErrorIcon[size]}
      />
    );
  }

  render() {
    const { dataHook, error, errorMessage } = this.props;

    return (
      <div data-hook={dataHook} {...style('root', {}, this.props)}>
        {error && errorMessage ? (
          <Tooltip content={errorMessage} dataHook={dataHooks.tooltip}>
            {this._renderProgressBar()}
          </Tooltip>
        ) : (
          this._renderProgressBar()
        )}
      </div>
    );
  }
}

CircularProgressBar.displayName = 'CircularProgressBar';

CircularProgressBar.defaultProps = {
  size: 'medium',
};

CircularProgressBar.propTypes = {
  /** Should be true if had failure during the progress */
  error: PropTypes.bool,

  /** Label to display when an error happens */
  errorLabel: PropTypes.string,

  /** Message to display when an error happens */
  errorMessage: PropTypes.string,

  /** Use light theme instead of dark theme */
  light: PropTypes.bool,

  /** Use to display a percentage progress */
  showProgressIndication: PropTypes.bool,

  /** Size of the bar */
  size: PropTypes.string,

  /** The number of the percentage progress */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  dataHook: PropTypes.string,
};

export default CircularProgressBar;
