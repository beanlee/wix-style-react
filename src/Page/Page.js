import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ResizeSensor } from 'css-element-queries';
import s from './Page.scss';
import WixComponent from '../BaseComponents/WixComponent';
import { PageContext } from './PageContext';
import PageHeader from '../PageHeader';
import Content from './Content';
import Tail from './Tail';
import { PageSticky } from './PageSticky';

import {
  PAGE_SIDE_PADDING_PX,
  PAGE_BOTTOM_PADDING_PX,
  BACKGROUND_COVER_CONTENT_PX,
  MINIMIZED_HEADER_WRAPPER_HEIGHT_PX,
  MINIMIZED_HEADER_WRAPPER_WITH_TAIL_HEIGHT_PX,
  HEADER_BOTTOM_PADDING_PX,
} from './constants';
import {
  mainContainerMinWidthPx as GRID_MIN_WIDTH,
  mainContainerMaxWidthPx as GRID_MAX_WIDTH,
} from '../Grid/constants';

/*
 * Page structure without mini-header-overlay:
 *
 * + PageWrapper (Horizontal Scroll) --
 * | +- Page --------------------------
 * | | +--  ScrollableContainer (Vertical Scroll)
 * | | | +--  MinimizationPlaceholder
 * | | | |
 * | | | +---------------------------
 * | | | +-- HeaderContainer ------ (position: fixed - when minimized)
 * | | | | +-- Page.Header ------------
 * | | | | |
 * | | | | +---------------------------
 * | | | | +-- Page.Tail ----------------
 * | | | | |
 * | | | | +-----------------------------
 * | | | +-----------------------------
 * | | | +-- ContentWrapper------------
 * | | | | +-- Page.FixedContent (Deprecated)
 * | | | | |
 * | | | | +---------------------------
 * | | | | +-- Page.Content -----------
 * | | | | |
 * | | | | +---------------------------
 * | | | +-----------------------------
 * | | +-------------------------------
 * | +--------------------------------- (Page - End)
 * +----------------------------------- (PageWrapper - End)
 *
 * -  ScrollableContainer has a data-classnamed 'scrollable-content', and should NOT be renamed, since
 * Tooltip is hard-coded-ly using a selector like this: [data-class="page-scrollable-content"]
 */

class Page extends WixComponent {
  static defaultProps = {
    minWidth: GRID_MIN_WIDTH,
    maxWidth: GRID_MAX_WIDTH,
  };

  constructor(props) {
    super(props);

    this._handleScroll = this._handleScroll.bind(this);
    this._handleWidthResize = this._handleWidthResize.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
    this._calculateComponentsHeights = this._calculateComponentsHeights.bind(
      this,
    );

    this.state = {
      headerContainerHeight: 0,
      headerWrapperHeight: 0,
      tailHeight: 0,
      scrollBarWidth: 0,
      minimized: false,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this._calculateComponentsHeights();
    this.contentResizeListener = new ResizeSensor(
      this._getScrollContainer().childNodes[0],
      this._handleWidthResize,
    );
    this._handleWidthResize();
    window.addEventListener('resize', this._handleWindowResize);

    // TODO: Hack to fix cases where initial measurement of headerWrapperHeight is not correct (need to investigate)
    // Happens in PageTestStories -> PageWithScroll -> 5. Scroll - Trigger Mini Header
    // Maybe there is a transition
    const ARBITRARY_SHORT_DURATION_MS = 100;
    setTimeout(this._calculateComponentsHeights, ARBITRARY_SHORT_DURATION_MS);
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    this._calculateComponentsHeights();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener('resize', this._handleWindowResize);
    this.contentResizeListener.detach(this._handleResize);
  }

  _getNamedChildren() {
    return getChildrenObject(this.props.children);
  }

  _calculateComponentsHeights() {
    const {
      headerContainerHeight,
      headerWrapperHeight,
      tailHeight,
      pageHeight,
      minimized,
    } = this.state;

    const newHeaderWrapperHeight =
      this.headerWrapperRef && !minimized
        ? this.headerWrapperRef.getBoundingClientRect().height
        : headerWrapperHeight;

    const newHeaderContainerHeight =
      this.headerWrapperRef && !minimized
        ? this.headerContainerRef.getBoundingClientRect().height
        : headerContainerHeight;

    const newTailHeight = this.pageHeaderTailRef
      ? this.pageHeaderTailRef.offsetHeight
      : 0;
    const newPageHeight = this.pageRef ? this.pageRef.offsetHeight : 0;

    if (
      headerContainerHeight !== newHeaderContainerHeight ||
      headerWrapperHeight !== newHeaderWrapperHeight ||
      tailHeight !== newTailHeight ||
      pageHeight !== newPageHeight
    ) {
      this.setState({
        headerContainerHeight: newHeaderContainerHeight,
        headerWrapperHeight: newHeaderWrapperHeight,
        tailHeight: newTailHeight,
        pageHeight: newPageHeight,
      });
    }
  }

  _setScrollContainer(scrollableContainerRef) {
    this.scrollableContentRef = scrollableContainerRef;

    this.props.scrollableContentRef &&
      this.props.scrollableContentRef(scrollableContainerRef);
  }

  _getScrollContainer() {
    return this.scrollableContentRef;
  }

  _getMinimizedHeaderWrapperHeight() {
    return this._hasTail()
      ? MINIMIZED_HEADER_WRAPPER_WITH_TAIL_HEIGHT_PX
      : MINIMIZED_HEADER_WRAPPER_HEIGHT_PX;
  }

  _getMinimizationDiff() {
    const { headerWrapperHeight } = this.state;
    return headerWrapperHeight
      ? headerWrapperHeight - this._getMinimizedHeaderWrapperHeight()
      : null;
  }

  _handleScroll() {
    const containerScrollTop = this._getScrollContainer().scrollTop;

    const { minimized } = this.state;

    const minimizationDiff = this._getMinimizationDiff();
    const nextDisplayMiniHeader =
      minimizationDiff && containerScrollTop >= minimizationDiff;

    if (minimized !== nextDisplayMiniHeader) {
      this.setState({
        minimized: nextDisplayMiniHeader,
      });
    }
  }

  _handleWidthResize() {
    // Fixes width issues when scroll bar is present in windows
    const scrollContainer = this._getScrollContainer();
    const scrollBarWidth =
      scrollContainer &&
      scrollContainer.offsetWidth - scrollContainer.clientWidth;

    if (this.state.scrollBarWidth !== scrollBarWidth) {
      this.setState({ scrollBarWidth });
    }
  }

  _handleWindowResize() {
    // TODO: Optimize : https://developer.mozilla.org/en-US/docs/Web/Events/resize

    // Taken from here: https://github.com/kunokdev/react-window-size-listener/blob/d64c077fba4d4e0ce060464078c5fc19620528e6/src/index.js#L66
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    if (this.state.windowHeight !== windowHeight) {
      // We are not using windowHeight directly, since we need to measure the `<Page/>`'s height,
      // But we hold it in the state to avoid rendering when only window.width changes
      this.setState({ windowHeight });
    }
  }

  _safeGetChildren(element) {
    if (!element || !element.props || !element.props.children) {
      return [];
    }

    return element.props.children;
  }

  _getPageDimensionsStyle() {
    const { maxWidth, sidePadding } = this.props;
    // TODO: Simplify - maxWidth is always truthy (from defaultProp)
    if (!maxWidth && !sidePadding && sidePadding !== 0) {
      return null;
    }

    const styles = {};
    if (maxWidth) {
      styles.maxWidth = `${maxWidth}px`;
    }

    if (sidePadding || sidePadding === 0) {
      styles.paddingLeft = `${sidePadding}px`;
      styles.paddingRight = `${sidePadding}px`;
    }

    return styles;
  }

  _hasBackgroundImage() {
    return !!this.props.backgroundImageUrl;
  }

  _hasGradientClassName() {
    return !!this.props.gradientClassName && !this.props.backgroundImageUrl;
  }

  _renderContentHorizontalLayout(props) {
    const { PageContent } = this._getNamedChildren();
    const contentFullScreen = PageContent && PageContent.props.fullScreen;

    const { className, ...rest } = props;
    const mergedClassNames = classNames(className, s.contentHorizontalLayout, {
      [s.contentFullWidth]: contentFullScreen,
    });

    const pageDimensionsStyle = this._getPageDimensionsStyle();
    const style = contentFullScreen ? null : pageDimensionsStyle;

    return (
      <div className={mergedClassNames} style={style} {...rest}>
        {props.children}
      </div>
    );
  }

  _renderHeader() {
    const { minimized } = this.state;
    const { PageHeader: PageHeaderChild } = this._getNamedChildren();
    const dataHook = 'page-header-wrapper';

    return (
      PageHeaderChild && (
        <div
          data-hook={dataHook}
          key={dataHook}
          className={classNames(s.headerWrapper, {
            [s.minimized]: minimized,
          })}
          ref={ref => {
            this.headerWrapperRef = ref;
          }}
        >
          {React.cloneElement(PageHeaderChild, {
            minimized,
            hasBackgroundImage: this._hasBackgroundImage(),
          })}
        </div>
      )
    );
  }

  _renderHeaderContainer() {
    const { minimized, scrollBarWidth } = this.state;

    return (
      <div
        data-hook="page-header-container"
        className={classNames(s.pageHeaderContainer, {
          [s.minimized]: minimized,
          [s.hasTail]: this._hasTail(),
        })}
        ref={ref => (this.headerContainerRef = ref)}
        onWheel={event => {
          event.preventDefault();
          this._getScrollContainer().scrollTop =
            this._getScrollContainer().scrollTop + event.deltaY;
        }}
        style={{ width: `calc(100% - ${minimized ? scrollBarWidth : 0}px)` }}
      >
        {this._renderContentHorizontalLayout({
          children: [this._renderHeader(), this._renderTail()],
        })}
      </div>
    );
  }

  _renderScrollableContainer() {
    return (
      <div
        className={classNames(s.scrollableContainer, {
          [s.hasTail]: this._hasTail(),
        })}
        data-hook="page-scrollable-content"
        data-class="page-scrollable-content"
        ref={r => this._setScrollContainer(r)}
        onScroll={this._handleScroll}
      >
        {this._renderScrollableBackground()}
        {this._renderMinimizationPlaceholder()}
        {this._renderHeaderContainer()}
        {this._renderContentContainer()}
      </div>
    );
  }

  _hasTail() {
    return !!this._getNamedChildren().PageTail;
  }

  _renderMinimizationPlaceholder() {
    const { headerContainerHeight, minimized } = this.state;
    return (
      <div
        style={{
          height: `${minimized ? headerContainerHeight : 0}px`,
        }}
      />
    );
  }

  _renderScrollableBackground() {
    const { headerContainerHeight, tailHeight } = this.state;

    const backgroundHeight = `${headerContainerHeight -
      tailHeight +
      (this._hasTail() ? 0 : BACKGROUND_COVER_CONTENT_PX)}px`;

    if (this._hasBackgroundImage()) {
      return (
        <div
          className={s.imageBackgroundContainer}
          style={{ height: backgroundHeight }}
          data-hook="page-background-image"
        >
          <div
            className={s.imageBackground}
            style={{ backgroundImage: `url(${this.props.backgroundImageUrl})` }}
          />
        </div>
      );
    }

    if (this._hasGradientClassName()) {
      return (
        <div
          data-hook="page-gradient-class-name"
          className={`${s.gradientBackground} ${this.props.gradientClassName}`}
          style={{ height: backgroundHeight }}
        />
      );
    }
  }

  _renderTail() {
    const { PageTail } = this._getNamedChildren();
    const dataHook = 'page-tail';

    return (
      PageTail && (
        <div
          data-hook={dataHook}
          key={dataHook}
          className={s.tail}
          ref={r => (this.pageHeaderTailRef = r)}
        >
          {PageTail}
        </div>
      )
    );
  }

  _renderContentContainer() {
    const { children } = this.props;
    const childrenObject = getChildrenObject(children);
    const { PageContent, PageFixedContent } = childrenObject;

    const { headerWrapperHeight, tailHeight } = this.state;

    const { pageHeight } = this.state;

    const pageContentMarginTop = tailHeight ? HEADER_BOTTOM_PADDING_PX : 0;

    const stretchToHeight =
      pageHeight -
      headerWrapperHeight -
      tailHeight -
      pageContentMarginTop -
      PAGE_BOTTOM_PADDING_PX;

    return (
      <PageContext.Provider
        value={{
          stickyStyle: {
            top: `${this._getMinimizedHeaderWrapperHeight() +
              this.state.tailHeight}px`,
          },
        }}
      >
        {this._renderContentHorizontalLayout({
          className: s.contentContainer,
          children: (
            <div
              style={{
                minHeight: `${stretchToHeight}px`,
              }}
              className={s.contentFloating}
            >
              {PageFixedContent && (
                <PageSticky data-hook="page-fixed-content">
                  {React.cloneElement(PageFixedContent)}
                </PageSticky>
              )}
              {this._safeGetChildren(PageContent)}
            </div>
          ),
        })}
      </PageContext.Provider>
    );
  }

  render() {
    const { className, minWidth, zIndex, height } = this.props;

    return (
      <div
        data-hook="wsr-page-wrapper"
        className={classNames(s.pageWrapper, className)}
        style={{ zIndex, height }}
      >
        <div
          data-hook="page"
          className={s.page}
          style={{
            minWidth: minWidth + 2 * PAGE_SIDE_PADDING_PX,
          }}
          ref={ref => (this.pageRef = ref)}
        >
          {this._renderScrollableContainer()}
        </div>
      </div>
    );
  }
}

const FixedContent = props => props.children;
FixedContent.displayName = 'Page.FixedContent';
FixedContent.propTypes = {
  children: PropTypes.element.isRequired,
};

Page.displayName = 'Page';
Page.Header = PageHeader;
Page.Content = Content;
Page.FixedContent = FixedContent; // TODO: deprecate, use Page.Sticky instead
Page.Tail = Tail;
Page.Sticky = PageSticky;

const allowedChildren = [
  Page.Header,
  Page.Content,
  Page.FixedContent,
  Page.Tail,
];

Page.propTypes = {
  /** Background image url of the header background */
  backgroundImageUrl: PropTypes.string,
  /** Sets the max width of the content (Both in header and body) NOT including the page padding */
  maxWidth: PropTypes.number,
  /** Sets the min width of the content (Both in header and body) NOT including the page padding */
  minWidth: PropTypes.number,
  /** Sets the height of the page (in px/vh/etc.) */
  height: PropTypes.string,
  /** Sets padding of the sides of the page */
  sidePadding: PropTypes.number,
  /** A css class to be applied to the component's root element */
  className: PropTypes.string,
  /** Header background color class name, allows to add a gradient to the header */
  gradientClassName: PropTypes.string,
  /** Is called with the Page's scrollable content ref **/
  scrollableContentRef: PropTypes.func,

  /** Accepts these components as children: `Page.Header`, `Page.Tail`, `Page.Content`, `Page.FixedContent`. Order is insignificant. */
  children: PropTypes.arrayOf((children, key) => {
    const child = children[key];
    if (!child) {
      return;
    }

    const allowedDisplayNames = allowedChildren.map(c => c.displayName);
    const childDisplayName = child.type.displayName;
    if (!allowedDisplayNames.includes(childDisplayName)) {
      return new Error(
        `Page: Invalid Prop children, unknown child ${child.type}`,
      );
    }
  }).isRequired,

  /** z-index of the Page */
  zIndex: PropTypes.number,
};

function getChildrenObject(children) {
  return React.Children.toArray(children).reduce((acc, child) => {
    switch (child.type.displayName) {
      case 'Page.Header': {
        acc.PageHeader = child;
        break;
      }
      case 'Page.Content': {
        acc.PageContent = child;
        break;
      }
      case 'Page.FixedContent': {
        acc.PageFixedContent = child;
        break;
      }
      case 'Page.Tail': {
        acc.PageTail = child;
        break;
      }
      default: {
        break;
      }
    }
    return acc;
  }, {});
}

export default Page;
