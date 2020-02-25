import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';
import styles from '../RadioGroup.scss';
import { withFocusable, focusableStates } from '../../common/Focusable';
import Text from '../../Text';

class RadioButton extends React.PureComponent {
  static displayName = 'RadioGroup.Radio';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vAlign: PropTypes.oneOf(['center', 'top']),
    name: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any,
    style: PropTypes.object,
    lineHeight: PropTypes.string,
    tabIndex: PropTypes.number,

    /** Selection area emphasises the clickable area, none means no emphasis, hover is when the mouse is on the component, and always will show constantly */
    selectionArea: PropTypes.oneOf(['none', 'hover', 'always']),

    /** optional node to be rendered under label. Clicking it will not trigger `onChange` */
    content: PropTypes.node,
  };

  static defaultProps = {
    vAlign: 'center',
    content: null,
    tabIndex: 0,
  };

  constructor(props) {
    super(props);
    this.id = uniqueId();
  }

  render() {
    const {
      dataHook,
      checked,
      children,
      content,
      disabled,
      lineHeight,
      name,
      onChange,
      style,
      vAlign,
      value,
      tabIndex,
    } = this.props;

    return (
      <div
        data-hook={dataHook}
        className={classnames(styles.radioWrapper, {
          [styles.disabled]: disabled,
          [styles.checked]: checked,
        })}
        style={style}
        tabIndex={disabled ? null : tabIndex}
        onFocus={this.props.focusableOnFocus}
        onBlur={this.props.focusableOnBlur}
        {...focusableStates(this.props)}
      >
        <input
          type="radio"
          name={name}
          value={value}
          id={this.id}
          checked={checked}
          disabled={disabled}
          onChange={() => (!checked && !disabled ? onChange(value) : null)}
        />

        <label
          data-hook="radio-label"
          style={{ lineHeight }}
          htmlFor={this.id}
          className={classnames({
            [styles.vcenter]: vAlign === 'center',
            [styles.vtop]: vAlign === 'top',
          })}
        >
          <div
            style={{ height: lineHeight }}
            className={styles.radioButtonWrapper}
            data-hook="radiobutton-radio"
          >
            <div
              className={classnames(styles.radio, {
                [styles.radioButtonChecked]: checked,
              })}
            />
          </div>

          {children && (
            <Text
              className={styles.children}
              data-hook="radiobutton-children"
              tagName="div"
              size="medium"
              weight="thin"
              secondary
            >
              {children}
            </Text>
          )}
        </label>

        {content && <div data-hook="radio-button-content">{content}</div>}
      </div>
    );
  }
}

export default withFocusable(RadioButton);
