import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import FormFieldErrorSmall from 'wix-ui-icons-common/system/FormFieldErrorSmall';
import ToggleOn from 'wix-ui-icons-common/system/ToggleOn';
import CircleLoaderCheck from 'wix-ui-icons-common/system/CircleLoaderCheck';
import CircleLoaderCheckSmall from 'wix-ui-icons-common/system/CircleLoaderCheckSmall';
import Arc from './Arc';
import css from './Loader.scss';
import Heading from '../Heading';
import Tooltip from '../Tooltip';

const arcsAngles = {
  tiny: {
    light: 216,
    dark: 144,
  },
  small: {
    light: 216,
    dark: 144,
  },
  medium: {
    light: 108,
    dark: 108,
  },
  large: {
    light: 180,
    dark: 180,
  },
};
const strokeWidths = {
  tiny: 3,
  small: 4,
  medium: 4,
  large: 4,
};
const sizesInPx = {
  tiny: 18,
  small: 30,
  medium: 54,
  large: 102,
};

const FULL_CIRCLE_ANGLE = 359;

const sizeToSuccessIcon = {
  tiny: <ToggleOn />,
  small: <CircleLoaderCheckSmall />,
  medium: <CircleLoaderCheck />,
  large: <CircleLoaderCheck />,
};

const sizeToErrorIcon = {
  tiny: <FormFieldError />,
  small: <FormFieldErrorSmall />,
  medium: <FormFieldError />,
  large: <FormFieldError />,
};

class Loader extends React.PureComponent {
  static displayName = 'Loader';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** The size of the loader */
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),

    /** The color of the loader */
    color: PropTypes.oneOf(['blue', 'white']),

    /** Node (usually text) to be shown below the loader */
    text: PropTypes.node,

    /** The status of the loader */
    status: PropTypes.oneOf(['loading', 'success', 'error']),

    /** Text to be shown in the tooltip **/
    statusMessage: PropTypes.string,
  };

  static defaultProps = {
    size: 'medium',
    color: 'blue',
    status: 'loading',
    shouldLoadAsync: false,
  };

  render() {
    const { dataHook, size, color, text, status, statusMessage } = this.props;
    const sizeInPx = sizesInPx[size];
    const shouldShowFullCircle = status !== 'loading';
    const lightArcAngle = !shouldShowFullCircle
      ? arcsAngles[size].light
      : FULL_CIRCLE_ANGLE;
    const darkArcAngle = !shouldShowFullCircle
      ? arcsAngles[size].dark
      : FULL_CIRCLE_ANGLE;
    const shouldShowText = size !== 'tiny';
    const successIcon = sizeToSuccessIcon[size];
    const errorIcon = sizeToErrorIcon[size];
    const strokeWidth = strokeWidths[size];

    const loader = (
      <div
        className={css.arcsContainer}
        style={{
          width: `${sizeInPx}px`,
          height: `${sizeInPx}px`,
        }}
      >
        <Arc
          angle={lightArcAngle}
          className={css.lightArc}
          strokeWidth={strokeWidth}
          viewBoxSize={sizeInPx}
        />
        <Arc
          angle={darkArcAngle}
          className={css.darkArc}
          strokeWidth={strokeWidth}
          viewBoxSize={sizeInPx}
        />
        {status !== 'loading' && (
          <div className={css.statusIndicator}>
            {status === 'success' && successIcon}
            {status === 'error' && errorIcon}
          </div>
        )}
      </div>
    );

    return (
      <div
        data-hook={dataHook}
        className={classNames(
          css.loaderContainer,
          css[size],
          css[color],
          css[status],
        )}
      >
        {statusMessage ? (
          <Tooltip
            upgrade
            content={statusMessage}
            appendTo="window"
            dataHook="loader-tooltip"
          >
            {loader}
          </Tooltip>
        ) : (
          loader
        )}

        {/* Footer Text */}
        {shouldShowText && text && (
          <div className={css.text}>
            <Heading appearance="H6" dataHook="loader-text">
              {this.props.text}
            </Heading>
          </div>
        )}
      </div>
    );
  }
}

export default Loader;
