import React from 'react';
import classNames from 'classnames';
import omit from 'omit';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import inputStyles from '../Input/Input.scss';
import styles from './NoBorderInput.scss';
import Text from '../Text';
import dataHooks from './dataHooks';

class NoBorderInput extends React.Component {
  static StatusError = Input.StatusError;

  constructor(props) {
    super(props);
    this.state = {
      focus: !!props.autoFocus,
    };
  }

  render() {
    const {
      id,
      size,
      dataHook,
      label,
      disabled,
      onFocus,
      onBlur,
      status,
      statusMessage,
      className,
      value,
    } = this.props;

    const rejectedProps = [
      'prefix',
      'className',
      'statusMessage',
      'roundInput',
      'noLeftBorderRadius',
      'noRightBorderRadius',
    ];
    const wsrInputProps = omit(rejectedProps, this.props);

    const hasValue =
      (value && value.length) ||
      (this.wsrInput && this.wsrInput.input && !!this.wsrInput.input.value);
    const conditionalClasses = {
      [styles.disabled]: disabled,
      [styles.hasError]: status === NoBorderInput.StatusError,
      [styles.hasFocus]: this.state.focus,
      [styles.hasValue]: hasValue,
      [styles.noLabel]: !label,
    };

    const renderStatusLine = () =>
      !disabled &&
      status &&
      statusMessage && (
        <Text
          dataHook={dataHooks.statusMessage}
          size="tiny"
          weight="thin"
          skin="error"
        >
          {statusMessage}
        </Text>
      );

    return (
      <div
        className={classNames(
          conditionalClasses,
          styles.root,
          inputStyles[`size-${size}`],
          className,
        )}
        data-hook={dataHook}
      >
        <label
          data-hook={dataHooks.label}
          className={styles.label}
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          className={styles.nbinput}
          {...wsrInputProps}
          ref={wsrInput => (this.wsrInput = wsrInput)}
          onFocus={e => {
            this.setState({ focus: true });
            if (typeof onFocus === 'function') {
              onFocus(e);
            }
          }}
          onBlur={e => {
            this.setState({ focus: false });
            if (typeof onBlur === 'function') {
              onBlur(e);
            }
          }}
        />
        <div
          className={classNames(
            styles.activationIndicator,
            styles.activationIndicatorActive,
          )}
        />
        {renderStatusLine()}
      </div>
    );
  }
}

NoBorderInput.displayName = 'NoBorderInput';

NoBorderInput.defaultProps = {
  autoSelect: true,
  size: 'normal',
  statusMessage: '',
  textOverflow: 'clip',
  maxLength: 524288,
};

NoBorderInput.propTypes = {
  /** The label displayed above the input when focused and as the input text when there is none */
  label: PropTypes.string,
  ...Input.propTypes,
  /** Input status - use to display an status indication for the user. for example: 'error' */
  status: PropTypes.oneOf([NoBorderInput.StatusError]),
};

export default NoBorderInput;
