import React from 'react';
import PropTypes from 'prop-types';

import StatisticsItem from './StatisticsItem';
import styles from './StatisticsWidget.st.css';

class StatisticsWidget extends React.PureComponent {
  static displayName = 'StatisticsWidget';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /**
     * Array of statistic items
     *  * `value` - Value of the statistic. Displayed as big text in the first row.
     *  * `valueInShort` - Short version of value. Will be applied when there is no space for long value. If not specified, part of the value will be hidden with ellipsis
     *  * `description` - Description of the statistic. Displayed in the second row.
     *  * `descriptionInfo` - More info about the description. Displayed as an info icon with this text inside a tooltip
     *  * `percentage` - Change in percents. Positive number - arrow up, negative - arrow down
     *  * `invertedPercentage` - When set to true renders positive percentage in red and negative in green.
     *  * `onClick` - Callback to be executed on click (also on Enter/Space key press)
     *  * `children` - Node to render on bottom of section.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        valueInShort: PropTypes.string,
        description: PropTypes.string,
        descriptionInfo: PropTypes.string,
        percentage: PropTypes.number,
        invertedPercentage: PropTypes.bool,
        onClick: PropTypes.func,
        children: PropTypes.node,
      }),
    ),
  };

  _renderStat = (stat, key) => <StatisticsItem {...stat} key={key} />;

  render() {
    const { dataHook } = this.props;
    let { items } = this.props;

    items = items || [];

    if (items.length > 5) {
      // eslint-disable-next-line
      console.warn(
        `${items.length} items were passed in items array. StatisticsWidget will display only the first 5.`,
      );
    }
    const firstFive = items.slice(0, 5);

    return (
      <div className={styles.root} data-hook={dataHook}>
        {firstFive.map(this._renderStat)}
      </div>
    );
  }
}

export default StatisticsWidget;
