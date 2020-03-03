import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import DATA_ATTR from './DataAttr';

import styles from './Input.scss';

class ThemedInput extends Input {
  getDataAttr = ({ dataHook, size }) => {
    return {
      'data-hook': dataHook,
      [DATA_ATTR.DATA_SIZE]: size,
    };
  };

  render() {
    const {
      size,
      dataHook,
      rtl,
      status,
      disabled,
      forceHover,
      forceFocus,
      roundInput,
      className,
      noLeftBorderRadius,
      noRightBorderRadius,
      readOnly,
      withSelection,
    } = this.props;

    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: status === Input.StatusError, // Used in mixin
      [styles.hasWarning]: status === Input.StatusWarning, // Used in mixin
      [styles.hasHover]: forceHover, // For testing
      [styles.hasFocus]: forceFocus || this.state.focus, // For testing
      [styles.roundInput]: roundInput,
      [styles.noRightBorderRadius]: noRightBorderRadius === true, // assert boolean type
      [styles.noLeftBorderRadius]: noLeftBorderRadius === true, // assert boolean type
      /* Adding [noRightBorderRadius] and [noLeftBorderRadius] as a string className, is a hack for backward compatibility with
       * a bug that existed in WSR version <= 4.1.0. This should be removed in version 5.x.x.
       */
      [noRightBorderRadius]: typeof noRightBorderRadius === 'string',
      [noLeftBorderRadius]: typeof noLeftBorderRadius === 'string',
    };

    const placeholder = this.props.placeholder;
    return (
      <div
        className={classNames(
          classes,
          styles.root,
          styles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
          { [styles.readOnly]: readOnly },
        )}
        {...this.getDataAttr({ dataHook, size })}
      >
        {super.render({ placeholder })}
      </div>
    );
  }
}

ThemedInput.propTypes = {
  ...Input.propTypes,
};

export default ThemedInput;
