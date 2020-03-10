import React from 'react';
import PropTypes from 'prop-types';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';
import InfoCircleSmall from 'wix-ui-icons-common/InfoCircleSmall';

import Tooltip from '../Tooltip';
import styles from './InfoIcon.st.css';
import { getTooltipDataHook } from './utils';

const iconComponentBySizeMap = {
  small: InfoCircleSmall,
  medium: InfoCircle,
};

const InfoIcon = ({ dataHook, content, size, tooltipProps, ...otherProps }) => {
  const Icon = iconComponentBySizeMap[size];
  return (
    <div
      {...styles('root', {}, otherProps)}
      data-size={size}
      data-hook={dataHook}
    >
      <Tooltip
        {...tooltipProps}
        content={content}
        dataHook={getTooltipDataHook(dataHook)}
      >
        <Icon className={styles.icon} />
      </Tooltip>
    </div>
  );
};

InfoIcon.displayName = 'InfoIcon';

InfoIcon.propTypes = {
  /** Hook for testing purposes. */
  dataHook: PropTypes.string,

  /** Icon size. */
  size: PropTypes.oneOf(['small', 'medium']),

  /** Tooltip content. */
  content: PropTypes.node.isRequired,

  /** Props for `<Tooltip/>` component. */
  tooltipProps: PropTypes.shape(Tooltip.propTypes),
};

InfoIcon.defaultProps = {
  size: 'medium',
};

export default InfoIcon;
