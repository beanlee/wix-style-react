import React from 'react';
import PropTypes from 'prop-types';

import Heading from '../../Heading';
import Tooltip from '../../Tooltip';

import DataHooks from './dataHooks';
import styles from './AdaptiveHeading.st.css';

/** AdaptiveHeading */
class AdaptiveHeading extends React.PureComponent {
  static displayName = 'AdaptiveHeading';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Usual (long) version of header*/
    text: PropTypes.string.isRequired,
    /** Short version text */
    textInShort: PropTypes.string,
    /** Tag name: H1-H6 */
    appearance: PropTypes.string,
    /** Use light theme */
    light: PropTypes.bool,
    /** Render empty content when there is not enough space for short text */
    emptyLast: PropTypes.bool,
  };

  render() {
    const {
      dataHook,
      text,
      appearance = 'H1',
      light,
      emptyLast,
      textInShort,
    } = this.props;

    if (!textInShort) {
      if (emptyLast) {
        return (
          <Heading
            {...styles('headerWrapper', { appearance }, this.props)}
            dataHook={dataHook}
            appearance={appearance}
            light={light}
          >
            <span className={styles.headerShort}>&nbsp;</span>
            <span data-hook={DataHooks.text} className={styles.headerFull}>
              {text}
            </span>
          </Heading>
        );
      }

      return (
        <Heading
          dataHook={dataHook}
          appearance={appearance}
          light={light}
          ellipsis
        >
          <span data-hook={DataHooks.text}>{text}</span>
        </Heading>
      );
    }

    if (emptyLast) {
      return (
        <Heading
          {...styles('headerWrapper', { appearance }, this.props)}
          dataHook={dataHook}
          appearance={appearance}
          light={light}
        >
          <div className={styles.headerShort}>
            <div
              aria-hidden="true"
              {...styles('headerWrapper', { appearance }, this.props)}
            >
              <span className={styles.headerShort}>&nbsp;</span>
              <span
                className={styles.headerFull}
                data-hook={DataHooks.textInShort}
                title={text}
              >
                {textInShort}
              </span>
            </div>
          </div>
          <span data-hook={DataHooks.text} className={styles.headerFull}>
            {text}
          </span>
        </Heading>
      );
    }

    return (
      <Heading
        {...styles('headerWrapper', { appearance }, this.props)}
        dataHook={dataHook}
        appearance={appearance}
        light={light}
      >
        <div className={styles.headerShort}>
          <span
            data-hook={DataHooks.textInShort}
            aria-hidden="true"
            title={text}
          >
            <Tooltip content={text}>
              <div className={styles.ellipsis}>{textInShort}</div>
            </Tooltip>
          </span>
        </div>
        <span data-hook={DataHooks.text} className={styles.headerFull}>
          {text}
        </span>
      </Heading>
    );
  }
}

export default AdaptiveHeading;
