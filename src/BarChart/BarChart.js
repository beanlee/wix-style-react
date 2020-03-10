import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';
import Heading from '../Heading';
import AdaptiveHeading from '../utils/AdaptiveHeading';

import styles from './BarChart.st.css';
import dataHooks from './dataHooks';

class BarChart extends React.PureComponent {
  static displayName = 'BarChart';

  static defaultProps = {
    items: [],
  };

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /**
     * Array of items
     *  * `value` - This prop is used for sorting bars. Displayed as big text on a bar, when there is no caption prop.
     *  * `label` -  Displayed as big text on a bar.
     *  * `labelShort` - Is shown instead of a `label` when there is not enough space.
     *  * `description` - short label under the bar.
     *  * `descriptionInfo` - long description.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        label: PropTypes.node,
        labelShort: PropTypes.node,
        description: PropTypes.node,
        descriptionInfo: PropTypes.node,
      }),
    ),

    /** Used to calculate space for bars inside a widget. Should be specified if the actual total is different from the sum of values of all items */
    total: PropTypes.number,

    /** Callback called every time when descriptionInfo tooltip is shown*/
    onDescriptionInfoShown: PropTypes.func,

    /** Use old color scheme
     * @deprecated
     */
    deprecatedColors: PropTypes.bool,
  };

  MIN_BAR_WIDTH = 50;

  state = {
    width: 0,
  };

  componentDidMount() {
    this.setState({
      width: this.node.offsetWidth,
    });
  }

  _getCalculatedTotal() {
    return this.props.items.reduce((a, b) => a + b.value, 0);
  }

  _renderValue = ({ descriptionInfo, value, label, labelShort, showText }) => {
    const text = String(label || value);
    const { onDescriptionInfoShown } = this.props;

    const headingProps = {
      text,
      textInShort: labelShort,
      dataHook: dataHooks.value,
      appearance: 'H3',
      light: true,
    };

    return descriptionInfo ? (
      <Tooltip
        textAlign="start"
        dataHook={dataHooks.tooltip}
        content={descriptionInfo}
        onShow={onDescriptionInfoShown}
        zIndex={5999}
      >
        <div className={styles.value}>
          {showText && <AdaptiveHeading {...headingProps} emptyLast />}
        </div>
      </Tooltip>
    ) : (
      <div className={styles.value}>
        {showText && <AdaptiveHeading {...headingProps} />}
      </div>
    );
  };

  _renderItem = (
    { value, label, labelShort, description, descriptionInfo },
    key,
  ) => {
    const { width } = this.state;
    const { total, deprecatedColors } = this.props;
    const calculatedTotal = this._getCalculatedTotal();
    const coefficient = total ? calculatedTotal / total : 1;
    const showText =
      width === 0 ||
      (value * width) / (calculatedTotal * coefficient) > this.MIN_BAR_WIDTH;

    return (
      <div
        {...styles('item', { deprecatedColors }, this.props)}
        key={key}
        data-hook={dataHooks.bar}
        style={{
          // avoid too big numbers from getting into a css
          '--barValue': value / 10 ** (calculatedTotal.toString().length - 1),
        }}
      >
        {this._renderValue({
          descriptionInfo,
          value,
          label,
          labelShort,
          showText,
        })}
        <div className={styles.description}>
          <Heading ellipsis data-hook={dataHooks.description} appearance="H5">
            {showText && description}
          </Heading>
        </div>
      </div>
    );
  };

  render() {
    const { dataHook, items, total } = this.props;
    const calculatedTotal = this._getCalculatedTotal();
    const width = total ? (calculatedTotal / total) * 100 : 100;

    return (
      <div
        data-hook={dataHook}
        ref={elem => (this.node = elem)}
        className={styles.wrapper}
      >
        <div
          className={styles.root}
          style={{
            width: `${width}%`,
          }}
        >
          {items
            .slice()
            .sort((a, b) => b.value - a.value)
            .map(this._renderItem)}
        </div>
      </div>
    );
  }
}

export default BarChart;
