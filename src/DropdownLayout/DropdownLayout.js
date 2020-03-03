import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import Loader from '../Loader/Loader';
import InfiniteScroll from '../utils/InfiniteScroll';
import scrollIntoView from '../utils/scrollIntoView';
import * as DataAttr from './DataAttr';
import styles from './DropdownLayout.scss';

const modulu = (n, m) => {
  const remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

const getUnit = value => {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
};

const NOT_HOVERED_INDEX = -1;
export const DIVIDER_OPTION_VALUE = '-';

class DropdownLayout extends WixComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: NOT_HOVERED_INDEX,
      selectedId: props.selectedId,
    };

    this._onSelect = this._onSelect.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClose = this._onClose.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  _isControlled() {
    return (
      typeof this.props.selectedId !== 'undefined' &&
      typeof this.props.onSelect !== 'undefined'
    );
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.focusOnSelectedOption) {
      this._focusOnSelectedOption();
    }
    this._markOptionByProperty(this.props);
  }

  _focusOnSelectedOption() {
    if (this.selectedOption) {
      this.options.scrollTop = Math.max(
        this.selectedOption.offsetTop - this.selectedOption.offsetHeight,
        0,
      );
    }
  }

  _setSelectedOptionNode(optionNode, option) {
    if (option.id === this.state.selectedId) {
      this.selectedOption = optionNode;
    }
  }

  onClickOutside(event) {
    const { visible, onClickOutside } = this.props;
    if (visible && onClickOutside) {
      onClickOutside(event);
    }
  }

  _markOption(index, options) {
    const { onOptionMarked } = this.props;
    options = options || this.props.options;

    this.setState({ hovered: index });
    onOptionMarked && onOptionMarked(options[index] || null);
  }

  _onSelect(index, e) {
    const { options, onSelect } = this.props;
    const chosenOption = options[index];

    if (chosenOption) {
      const sameOptionWasPicked = chosenOption.id === this.state.selectedId;
      if (onSelect) {
        e.stopPropagation();
        onSelect(chosenOption, sameOptionWasPicked);
      }
    }
    if (!this._isControlled()) {
      this.setState({ selectedId: chosenOption && chosenOption.id });
    }
    return !!onSelect && chosenOption;
  }

  _onMouseEnter(index) {
    if (this._isSelectableOption(this.props.options[index])) {
      this._markOption(index);
    }
  }

  _onMouseLeave() {
    this._markOption(NOT_HOVERED_INDEX);
  }

  _getMarkedIndex() {
    const { options } = this.props;
    const useHoverIndex = this.state.hovered > NOT_HOVERED_INDEX;
    const useSelectedIdIndex = typeof this.state.selectedId !== 'undefined';

    let markedIndex;
    if (useHoverIndex) {
      markedIndex = this.state.hovered;
    } else if (useSelectedIdIndex) {
      markedIndex = options.findIndex(
        option => option.id === this.state.selectedId,
      );
    } else {
      markedIndex = NOT_HOVERED_INDEX;
    }

    return markedIndex;
  }

  _markNextStep(step) {
    const { options } = this.props;

    if (!options.some(this._isSelectableOption)) {
      return;
    }

    let markedIndex = this._getMarkedIndex();

    do {
      markedIndex = Math.abs(
        modulu(Math.max(markedIndex + step, -1), options.length),
      );
    } while (!this._isSelectableOption(options[markedIndex]));
    this._markOption(markedIndex);
    const menuElement = this.options;
    const hoveredElement = this.props.infiniteScroll
      ? this.options.childNodes[0].childNodes[markedIndex]
      : this.options.childNodes[markedIndex];
    scrollIntoView(menuElement, hoveredElement);
  }

  /**
   * Handle keydown events for the DropdownLayout, mostly for accessibility
   *
   * @param {SyntheticEvent} event - The keydown event triggered by React
   * @returns {boolean} - Whether the event was handled by the component
   */
  _onKeyDown(event) {
    if (!this.props.visible || this.props.isComposing) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown': {
        this._markNextStep(1);
        event.preventDefault();
        break;
      }

      case 'ArrowUp': {
        this._markNextStep(-1);
        event.preventDefault();
        break;
      }

      case ' ':
      case 'Spacebar':
      case 'Enter': {
        if (!this._onSelect(this.state.hovered, event)) {
          return false;
        }
        break;
      }

      case 'Tab': {
        if (this.props.closeOnSelect) {
          return this._onSelect(this.state.hovered, event);
        } else {
          if (this._onSelect(this.state.hovered, event)) {
            event.preventDefault();
            return true;
          } else {
            return false;
          }
        }
        break;
      }

      case 'Escape': {
        this._onClose();
        break;
      }

      default: {
        return false;
      }
    }
    event.stopPropagation();
    return true;
  }

  _onClose() {
    this._markOption(NOT_HOVERED_INDEX);

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _renderNode(node) {
    return node ? <div className={styles.node}>{node}</div> : null;
  }

  _wrapWithInfiniteScroll = scrollableElement => (
    <InfiniteScroll
      useWindow
      dataHook={DataAttr.DATA_HOOKS.INFINITE_SCROLL_CONTAINER}
      scrollElement={this.options}
      loadMore={this.props.loadMore}
      hasMore={this.props.hasMore}
      loader={
        <div className={styles.loader}>
          <Loader dataHook={'dropdownLayout-loader'} size={'small'} />
        </div>
      }
    >
      {scrollableElement}
    </InfiniteScroll>
  );

  _getDataAttributes = () => {
    const { visible } = this.props;
    return {
      'data-hook': DataAttr.DATA_HOOKS.CONTENT_CONTAINER,
      [DataAttr.DATA_SHOWN]: visible,
    };
  };

  render() {
    const {
      options,
      visible,
      dropDirectionUp,
      tabIndex,
      onMouseEnter,
      onMouseLeave,
      fixedHeader,
      withArrow,
      fixedFooter,
      inContainer,
      overflow,
    } = this.props;

    const renderedOptions = options.map((option, idx) =>
      this._renderOption({ option, idx }),
    );
    const contentContainerClassName = classNames({
      [styles.contentContainer]: true,
      [styles.shown]: visible,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp,
      [styles.withArrow]: withArrow,
      [styles.containerStyles]: !inContainer,
    });
    return (
      <div
        tabIndex={tabIndex}
        className={classNames(styles.wrapper)}
        onKeyDown={this._onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          {...this._getDataAttributes()}
          className={contentContainerClassName}
          style={{
            overflow,
            maxHeight: getUnit(this.props.maxHeightPixels),
            minWidth: getUnit(this.props.minWidthPixels),
          }}
        >
          {this._renderNode(fixedHeader)}
          <div
            className={styles.options}
            style={{
              maxHeight: getUnit(parseInt(this.props.maxHeightPixels, 10) - 35),
              overflow,
            }}
            ref={_options => (this.options = _options)}
            data-hook={DataAttr.DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS}
          >
            {this.props.infiniteScroll
              ? this._wrapWithInfiniteScroll(renderedOptions)
              : renderedOptions}
          </div>
          {this._renderNode(fixedFooter)}
        </div>
        {this._renderTopArrow()}
      </div>
    );
  }

  _renderOption({ option, idx }) {
    const { value, id, disabled, title, overrideStyle, linkTo } = option;
    if (value === DIVIDER_OPTION_VALUE) {
      return this._renderDivider(idx, `dropdown-divider-${id || idx}`);
    }

    const content = this._renderItem({
      option,
      idx,
      selected: id === this.state.selectedId,
      hovered: idx === this.state.hovered,
      disabled: disabled || title,
      title,
      overrideStyle,
      dataHook: `dropdown-item-${id}`,
    });

    return linkTo ? (
      <a key={idx} data-hook={DataAttr.DATA_HOOKS.LINK_ITEM} href={linkTo}>
        {content}
      </a>
    ) : (
      content
    );
  }

  _renderDivider(idx, dataHook) {
    return <div key={idx} className={styles.divider} data-hook={dataHook} />;
  }

  _renderItem({
    option,
    idx,
    selected,
    hovered,
    disabled,
    title,
    overrideStyle,
    dataHook,
  }) {
    const { itemHeight, selectedHighlight } = this.props;

    const optionClassName = classNames({
      [styles.option]: !overrideStyle,
      [styles.selected]: selected && !overrideStyle && selectedHighlight,
      wixstylereactSelected: selected && overrideStyle, //global class for items that use the overrideStyle
      [styles.hovered]: hovered && !overrideStyle,
      wixstylereactHovered: hovered && overrideStyle, //global class for items that use the overrideStyle
      [styles.disabled]: disabled,
      [styles.title]: title,
      [styles.smallHeight]: itemHeight === 'small',
      [styles.bigHeight]: itemHeight === 'big',
    });

    return (
      <div
        className={optionClassName}
        ref={node => this._setSelectedOptionNode(node, option)}
        onClick={!disabled ? e => this._onSelect(idx, e) : null}
        key={idx}
        onMouseEnter={() => this._onMouseEnter(idx)}
        onMouseLeave={this._onMouseLeave}
        data-hook={dataHook}
      >
        {typeof option.value === 'function'
          ? option.value({ selected, hovered, disabled })
          : option.value}
      </div>
    );
  }

  _renderTopArrow() {
    const { withArrow, visible, dropDirectionUp } = this.props;
    const arrowClassName = classNames({
      [styles.arrow]: true,
      [styles.up]: dropDirectionUp,
      [styles.down]: !dropDirectionUp,
    });
    return withArrow && visible ? <div className={arrowClassName} /> : null;
  }

  _markOptionByProperty(props) {
    if (this.state.hovered === NOT_HOVERED_INDEX && props.markedOption) {
      const selectableOptions = props.options.filter(this._isSelectableOption);
      if (selectableOptions.length) {
        const idToMark =
          props.markedOption === true
            ? selectableOptions[0].id
            : props.markedOption;
        this._markOption(
          this.findIndex(props.options, item => item.id === idToMark),
          props.options,
        );
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this._markOption(NOT_HOVERED_INDEX);
    }

    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({ selectedId: nextProps.selectedId });
    }

    // make sure the same item is hovered if options changed
    if (
      this.state.hovered !== NOT_HOVERED_INDEX &&
      (!nextProps.options[this.state.hovered] ||
        this.props.options[this.state.hovered].id !==
          nextProps.options[this.state.hovered].id)
    ) {
      this._markOption(
        this.findIndex(
          nextProps.options,
          item => item.id === this.props.options[this.state.hovered].id,
        ),
      );
    }

    this._markOptionByProperty(nextProps);
  }

  findIndex(arr, predicate) {
    return (Array.isArray(arr) ? arr : []).findIndex(predicate);
  }

  _isSelectableOption(option) {
    return option && option.value !== '-' && !option.disabled && !option.title;
  }
}

const optionPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])
    .isRequired,
  disabled: PropTypes.bool,
  overrideStyle: PropTypes.bool,
});

export function optionValidator(props, propName, componentName) {
  const option = props[propName];

  // Notice: We don't use Proptypes.oneOf() to check for either option OR divider, because then the failure message would be less informative.
  if (typeof option === 'object' && option.value === DIVIDER_OPTION_VALUE) {
    return;
  }

  const optionError = PropTypes.checkPropTypes(
    { option: optionPropTypes },
    { option },
    'option',
    componentName,
  );

  if (optionError) {
    return optionError;
  }

  if (option.id && option.id.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.id` should be non-empty after trimming in `DropdownLayout`.',
    );
  }

  if (option.value && option.value.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.value` should be non-empty after trimming in `DropdownLayout`.',
    );
  }
}

DropdownLayout.propTypes = {
  dropDirectionUp: PropTypes.bool,
  focusOnSelectedOption: PropTypes.bool,
  onClose: PropTypes.func,
  /** Callback function called whenever the user selects a different option in the list */
  onSelect: PropTypes.func,
  /** Callback function called whenever an option becomes focused (hovered/active). Receives the relevant option object from the original props.options array. */
  onOptionMarked: PropTypes.func,
  /** Set overflow of container */
  overflow: PropTypes.string,
  visible: PropTypes.bool,
  /** Array of objects. Objects must have an Id and can can include value and node. If value is '-', a divider will be rendered instead (dividers do not require and id). */
  options: PropTypes.arrayOf(optionValidator),
  /** The id of the selected option in the list  */
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.number,
  onClickOutside: PropTypes.func,
  /** A fixed header to the list */
  fixedHeader: PropTypes.node,
  /** A fixed footer to the list */
  fixedFooter: PropTypes.node,
  maxHeightPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidthPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withArrow: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  itemHeight: PropTypes.oneOf(['small', 'big']),
  selectedHighlight: PropTypes.bool,
  inContainer: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  /** Sets the default hover behavior when:
   *  1. `false` means no default
   *  2. `true` means to hover the first selectable option
   *  3. Any number/string represents the id of option to hover
   */
  markedOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

DropdownLayout.defaultProps = {
  options: [],
  tabIndex: 0,
  maxHeightPixels: 260,
  closeOnSelect: true,
  itemHeight: 'small',
  selectedHighlight: true,
  inContainer: false,
  infiniteScroll: false,
  loadMore: null,
  hasMore: false,
  markedOption: false,
  overflow: 'auto',
};

DropdownLayout.NONE_SELECTED_ID = NOT_HOVERED_INDEX;

export default DropdownLayout;
