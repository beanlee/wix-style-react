import s from './PageHeader.scss';
import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import Breadcrumbs from '../Breadcrumbs';
import Text from '../Text';
import Heading from '../Heading';
import { Animator } from 'wix-animations';
import IconButton from '../IconButton';

const isDarkTheme = (hasBackgroundImage, minimized) =>
  !minimized && hasBackgroundImage;

const getBreadcrumbsTheme = (hasBackgroundImage, minimized) =>
  isDarkTheme(hasBackgroundImage, minimized)
    ? 'onDarkBackground'
    : 'onGrayBackground';

const getTitle = (title, minimized) =>
  typeof title === 'function' ? title(minimized) : title;

const generateDefaultBreadcrumbs = (title, hasBackgroundImage, minimized) => (
  <Breadcrumbs
    items={[{ id: '1', value: getTitle(title, minimized) }]}
    activeId="1"
    size="medium"
    theme={getBreadcrumbsTheme(hasBackgroundImage, minimized)}
    onClick={() => {}}
  />
);

const generateThemedBreadcrumbs = (
  breadcrumbs,
  title,
  hasBackgroundImage,
  minimized,
) => {
  if (breadcrumbs) {
    return React.cloneElement(breadcrumbs, {
      theme: getBreadcrumbsTheme(hasBackgroundImage, minimized),
    });
  }

  return generateDefaultBreadcrumbs(title, hasBackgroundImage, minimized);
};

/**
 * A header that sticks at the top of the container which minimizes on scroll
 */
export default class PageHeader extends WixComponent {
  constructor(props) {
    super(props);

    const { breadcrumbs, title, hasBackgroundImage, minimized } = props;
    this.state = {
      themedBreadcrumbs: generateThemedBreadcrumbs(
        breadcrumbs,
        title,
        hasBackgroundImage,
        minimized,
      ),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { breadcrumbs, title, hasBackgroundImage, minimized } = this.props;
    const newBreadcrumbs = nextProps.breadcrumbs;
    const newTitle = nextProps.title;
    const newHasBackgroundImage = nextProps.hasBackgroundImage;
    const newMinimized = nextProps.minimized;

    if (
      breadcrumbs !== newBreadcrumbs ||
      title !== newTitle ||
      hasBackgroundImage !== newHasBackgroundImage ||
      minimized !== newMinimized
    ) {
      const themedBreadcrumbs = generateThemedBreadcrumbs(
        newBreadcrumbs,
        newTitle,
        newHasBackgroundImage,
        newMinimized,
      );
      this.setState({ themedBreadcrumbs });
    }
  }

  _animateComponent = (show, useEnterDelay, content) => {
    if (show) {
      return content;
    }

    return useEnterDelay ? (
      <Animator show={show} opacity timing="medium" delay={{ enter: 100 }}>
        {content}
      </Animator>
    ) : (
      <Animator show={show} opacity timing="medium">
        {content}
      </Animator>
    );
  };

  render() {
    const {
      breadcrumbs,
      onBackClicked,
      title,
      subtitle,
      minimized,
      actionsBar,
      showBackButton,
      hasBackgroundImage,
      className,
    } = this.props;

    const breadcrumbsExists = !!breadcrumbs;
    const { themedBreadcrumbs } = this.state;
    const _title = getTitle(title, minimized);

    return (
      <div className={classNames(s.headerContainer, className)}>
        <div className={s.header}>
          <div>
            {this._animateComponent(
              breadcrumbsExists || minimized,
              !breadcrumbsExists,
              <div
                className={classNames(s.breadcrumbsContainer, {
                  [s.absolute]: !breadcrumbsExists,
                  [s.minimized]: minimized,
                })}
                data-hook="page-header-breadcrumbs"
              >
                {themedBreadcrumbs}
              </div>,
            )}
          </div>
          <div
            className={classNames(s.titleContainer, {
              [s.minimized]: minimized,
            })}
          >
            {showBackButton &&
              onBackClicked &&
              this._animateComponent(
                !minimized,
                !breadcrumbsExists,
                <div
                  className={classNames(s.backButton, {
                    [s.minimized]: minimized,
                    [s.darkTheme]: isDarkTheme(hasBackgroundImage, minimized),
                  })}
                >
                  <IconButton
                    dataHook="page-header-backbutton"
                    onClick={onBackClicked}
                  >
                    <ChevronLeft className={s.backButtonIcon} />
                  </IconButton>
                </div>,
              )}
            <div className={s.titleColumn}>
              {title &&
                this._animateComponent(
                  !minimized,
                  !breadcrumbsExists,
                  <div
                    className={classNames(s.title, {
                      [s.minimized]: minimized,
                    })}
                    data-hook="page-header-title"
                  >
                    <Heading
                      ellipsis={typeof _title === 'string'}
                      light={isDarkTheme(hasBackgroundImage, minimized)}
                    >
                      {_title}
                    </Heading>
                  </div>,
                )}
              {subtitle &&
                this._animateComponent(
                  !minimized,
                  !breadcrumbsExists,
                  <div
                    className={classNames({ [s.minimized]: minimized })}
                    data-hook="page-header-subtitle"
                  >
                    <Text
                      ellipsis={typeof subtitle === 'string'}
                      light={isDarkTheme(hasBackgroundImage, minimized)}
                      secondary={!isDarkTheme(hasBackgroundImage, minimized)}
                    >
                      {subtitle}
                    </Text>
                  </div>,
                )}
            </div>
          </div>
        </div>
        {actionsBar && (
          <div
            className={classNames(s.actionsBar, {
              [s.minimized]: minimized,
              [s.withBreadcrumbs]: breadcrumbsExists,
            })}
            data-hook="page-header-actionbar"
          >
            {typeof actionsBar === 'function'
              ? actionsBar({ minimized, hasBackgroundImage })
              : actionsBar}
          </div>
        )}
      </div>
    );
  }
}

PageHeader.displayName = 'Page.Header';

PageHeader.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,
  /** This property is being supplied by the Page component, it's value changes by the state of the scrolled content */
  minimized: PropTypes.bool,
  /** This property is being supplied by the Page component, it's value reflects if the Page has a background image or not */
  hasBackgroundImage: PropTypes.bool,
  /** A css class to be applied to the component's root element */
  className: PropTypes.string,
  /** Wix-Style-React Breadcrumbs component */
  breadcrumbs: PropTypes.node,
  /** The main title text */
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /** The subtitle text */
  subtitle: PropTypes.node,
  /** Should show a back button */
  showBackButton: PropTypes.bool,
  /** The callback when back button is clicked */
  onBackClicked: PropTypes.func,
  /** A placeholder for a component that can contain actions / anything else. It should be a React component that receives `minimized` and `hasBackgroundImage` props. */
  actionsBar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

PageHeader.defaultProps = {
  minimized: false,
};
