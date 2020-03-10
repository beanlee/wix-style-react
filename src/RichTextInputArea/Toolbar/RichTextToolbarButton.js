import React from 'react';
import classNames from 'classnames';

import styles from './RichTextToolbarButton.scss';
import Tooltip from '../../Tooltip';

const RichTextToolbarButton = ({
  dataHook,
  onClick,
  tooltipText,
  isActive,
  isDisabled,
  children,
}) => (
  <Tooltip content={tooltipText}>
    <button
      data-hook={dataHook}
      className={classNames(
        styles.button,
        isDisabled && styles.disabled,
        !isDisabled && isActive && styles.active,
      )}
      onClick={isDisabled ? undefined : onClick}
    >
      {children}
    </button>
  </Tooltip>
);

export default RichTextToolbarButton;
