import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './EmptyState.scss';

import Heading from '../Heading';
import Text from '../Text';
import { madeforBold } from '../FontUpgrade/utils';

/**
 * Representing a state of an empty page, section, table, etc.
 */
const EmptyState = ({
  theme,
  title,
  subtitle,
  image,
  classNames: classNamesProp,
  children,
  dataHook,
  align,
}) => (
  <div
    className={classNames(
      styles.wrapper,
      styles[theme],
      styles[`align-${align}`],
    )}
    data-hook={dataHook}
  >
    <div className={styles.container}>
      {image && (
        <div
          className={classNames(
            styles.imageContainer,
            styles[`align-${align}`],
            (classNamesProp && classNamesProp.imageContainer) || '',
          )}
          data-hook="empty-state-image-container"
        >
          {typeof image === 'string' ? (
            <img
              className={styles.imageElement}
              src={image}
              data-hook="image-element"
            />
          ) : (
            React.cloneElement(image, {
              'data-hook': 'image-node',
            })
          )}
        </div>
      )}

      {title && (
        <div
          className={styles.titleContainer}
          data-hook="empty-state-title-container"
        >
          {theme === 'section' ? (
            <Text weight={madeforBold('normal')}>{title}</Text>
          ) : (
            <Heading appearance="H3">{title}</Heading>
          )}
        </div>
      )}

      <div
        className={styles.subtitleContainer}
        data-hook="empty-state-subtitle-container"
      >
        <Text secondary>{subtitle}</Text>
      </div>

      {children && (
        <div
          className={classNames(
            styles.childrenContainer,
            styles[`align-${align}`],
          )}
          data-hook="empty-state-children-container"
        >
          {children}
        </div>
      )}
    </div>
  </div>
);

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** The theme of the EmptyState */
  theme: PropTypes.oneOf(['page', 'page-no-border', 'section']),

  /** Content for the title of the Empty State */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Content for the subtitle of the Empty State */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** The Empty State image, can be either a string representing the image URL, or a node to render instead */
  image: PropTypes.node,

  /** The Empty State image bottom margin. If not specified, use the default padding defined in the css */
  classNames: PropTypes.shape({
    imageContainer: PropTypes.string,
  }),

  /** Children to render below the subtitle, ideally an action of some type (Button or TextButton for instance) */
  children: PropTypes.node,

  dataHook: PropTypes.string,

  align: PropTypes.oneOf(['start', 'center', 'end']),
};

EmptyState.defaultProps = {
  theme: 'section',
  image: null,
  children: null,
  align: 'center',
};

export default EmptyState;
