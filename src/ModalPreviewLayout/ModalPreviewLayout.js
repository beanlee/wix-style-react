import React from 'react';
import PropTypes from 'prop-types';
import X from 'wix-ui-icons-common/X';
import Text from '../Text';
import IconButton from '../IconButton';
import Tooltip from '../Tooltip';
import styles from './ModalPreviewLayout.st.css';
import { dataHooks, modalPreviewIDs, arrowsDirection } from './constants';
import NavigationButton from './NavigationButton/NavigationButton';

/** This is a fullscreen modal to present a document to the user overlaying the entire view port */
class ModalPreviewLayout extends React.PureComponent {
  static displayName = 'ModalPreviewLayout';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,
    /** component to be displayed in header strip to preform actions relevant to the displayed content */
    actions: PropTypes.node,
    /** title text to be displayed in the header strip */
    title: PropTypes.string,
    /** modal content displayed mid-screen*/
    children: PropTypes.node.isRequired,
    /** callback for when the modal is closed */
    onClose: PropTypes.func.isRequired,
    /** boolean to determine whether closing the overlay on click */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /** Tooltip close button text */
    closeButtonTooltipText: PropTypes.string,
    /** Tooltip prev button text */
    prevButtonTooltipText: PropTypes.string,
    /** Tooltip next button text */
    nextButtonTooltipText: PropTypes.string,
  };

  static defaultProps = {
    shouldCloseOnOverlayClick: true,
  };

  state = { childIndexDisplayed: 0 };

  shouldClose(id) {
    return (
      this.props.shouldCloseOnOverlayClick &&
      [modalPreviewIDs.overlay, modalPreviewIDs.innerOverlay].includes(id)
    );
  }

  _onArrowClick(direction) {
    const { childIndexDisplayed } = this.state;
    direction === arrowsDirection.rightArrow
      ? this.setState({ childIndexDisplayed: childIndexDisplayed + 1 })
      : this.setState({ childIndexDisplayed: childIndexDisplayed - 1 });
  }

  _onOverlayClick(onClose) {
    return ({ target: { id } }) => {
      if (this.shouldClose(id) && typeof onClose === 'function') {
        onClose();
      }
    };
  }

  _renderNavigationButtons(hasLeft, hasRight) {
    const { prevButtonTooltipText, nextButtonTooltipText } = this.props;

    return (
      <React.Fragment>
        {hasLeft && (
          <NavigationButton
            tooltipText={prevButtonTooltipText}
            dataHook={dataHooks.modalPreviewLeftArrow}
            direction={arrowsDirection.leftArrow}
            onClick={() => this._onArrowClick(arrowsDirection.leftArrow)}
          />
        )}
        {hasRight && (
          <NavigationButton
            tooltipText={nextButtonTooltipText}
            dataHook={dataHooks.modalPreviewRightArrow}
            direction={arrowsDirection.rightArrow}
            onClick={() => this._onArrowClick(arrowsDirection.rightArrow)}
          />
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      dataHook,
      actions,
      title,
      children,
      onClose,
      closeButtonTooltipText,
    } = this.props;
    const { childIndexDisplayed } = this.state;

    const childrenArr = React.Children.toArray(children);
    const hasLeft = childIndexDisplayed > 0;
    const hasRight = childIndexDisplayed < childrenArr.length - 1;

    return (
      <div
        id={modalPreviewIDs.overlay}
        data-hook={dataHook}
        {...styles('root', {}, this.props)}
        onClick={this._onOverlayClick(onClose)}
      >
        <div className={styles.header}>
          <div data-hook={dataHooks.modalPreviewTitle} className={styles.title}>
            <Text light ellipsis>
              {title}
            </Text>
          </div>
          <div
            className={styles.actions}
            data-hook={dataHooks.modalPreviewActions}
          >
            {actions}
          </div>
          <div className={styles.closeButton}>
            {closeButtonTooltipText ? (
              <Tooltip
                className={styles.modalTooltip}
                dataHook={dataHooks.closeButtonTooltip}
                appendTo="scrollParent"
                content={<Text>{closeButtonTooltipText}</Text>}
                placement="bottom"
              >
                <IconButton
                  as="button"
                  onClick={onClose}
                  priority="secondary"
                  skin="transparent"
                  dataHook={dataHooks.modalPreviewCloseButton}
                >
                  <X />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                as="button"
                onClick={onClose}
                priority="secondary"
                skin="transparent"
                dataHook={dataHooks.modalPreviewCloseButton}
              >
                <X />
              </IconButton>
            )}
          </div>
        </div>
        <div
          id={modalPreviewIDs.innerOverlay}
          data-hook={dataHooks.innerOverlay}
          className={styles.innerOverlay}
        >
          <div
            data-hook={dataHooks.modalPreviewContent}
            className={styles.content}
            data-index={childIndexDisplayed}
          >
            {childrenArr[childIndexDisplayed]}
          </div>
          {this._renderNavigationButtons(hasLeft, hasRight)}
        </div>
      </div>
    );
  }
}

export default ModalPreviewLayout;
