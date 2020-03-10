import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Button from '../Button';
import TextButton from '../TextButton';
import Text from '../Text';
import Heading from '../Heading';
import Proportion from '../Proportion';
import Tooltip from '../Tooltip';
import MediaOverlay from '../MediaOverlay';
import { DataHook } from './constants';
import styles from './CardGalleryItem.st.css';

class CardGalleryItem extends React.PureComponent {
  static displayName = 'CardGalleryItem';
  static propTypes = {
    /** Card badge. */
    badge: PropTypes.node,

    /** Card title. */
    title: PropTypes.node,

    /** Card subtitle. */
    subtitle: PropTypes.node,

    /** Background image URL. */
    backgroundImageUrl: PropTypes.string,

    /** Background image node. */
    backgroundImageNode: PropTypes.node,

    /** Properties for primary action button. */
    primaryActionProps: PropTypes.shape({
      /** Label of primary action button */
      label: PropTypes.node,
      /** On click handler of primary action button and of the whole card */
      onClick: PropTypes.func,
      /** Disable the primary action button */
      disabled: PropTypes.bool,
      /** Message to be displayed when primary action button is disabled */
      disabledMessage: PropTypes.string,
    }).isRequired,

    /** Properties for secondary action text button. */
    secondaryActionProps: PropTypes.shape({
      /** Label of secondary action text button */
      label: PropTypes.node,
      /** On click handler of secondary action text button */
      onClick: PropTypes.func,
    }).isRequired,

    /** Menu to be displayed on hover. */
    settingsMenu: PropTypes.node,

    /** Hook for testing purposes. */
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    primaryActionProps: {
      onClick: () => {},
    },
    secondaryActionProps: {
      onClick: () => {},
    },
  };

  state = {
    isHovered: false,
  };

  _onMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  _onMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  _hasFooter() {
    const { title, subtitle } = this.props;
    return !!(title || subtitle);
  }

  _renderBadge() {
    return (
      <div className={styles.badgeWrapper} data-hook={DataHook.Badge}>
        {this.props.badge}
      </div>
    );
  }

  _renderFooter() {
    const { title, subtitle } = this.props;
    return (
      <>
        <Card.Divider />
        <div className={styles.footer}>
          <Heading appearance="H3" ellipsis dataHook={DataHook.Title}>
            {title}
          </Heading>
          <Text size="small" secondary ellipsis dataHook={DataHook.Subtitle}>
            {subtitle}
          </Text>
        </div>
      </>
    );
  }

  _renderActions() {
    const {
      primaryActionProps: { label, disabled, disabledMessage },
      secondaryActionProps,
    } = this.props;

    const primaryAction = (
      <Button dataHook={DataHook.PrimaryAction} disabled={disabled}>
        {label}
      </Button>
    );

    return (
      <div className={styles.primaryAction} data-hook={DataHook.HoverContent}>
        {disabled && disabledMessage ? (
          <Tooltip disabled={!disabled} content={disabledMessage}>
            {primaryAction}
          </Tooltip>
        ) : (
          primaryAction
        )}

        <div className={styles.secondaryAction}>
          <TextButton
            skin="light"
            onClick={event => {
              secondaryActionProps.onClick(event);
              event.stopPropagation();
            }}
            dataHook={DataHook.SecondaryAction}
          >
            {secondaryActionProps.label}
          </TextButton>
        </div>
      </div>
    );
  }

  _renderSettingsMenu() {
    return (
      <div data-hook={DataHook.SettingsMenu}>{this.props.settingsMenu}</div>
    );
  }

  render() {
    const {
      primaryActionProps,
      dataHook,
      badge,
      backgroundImageUrl,
      backgroundImageNode,
      settingsMenu,
    } = this.props;

    return (
      <Proportion dataHook={dataHook}>
        <div
          {...styles('root', { withFooter: !!this._hasFooter() }, this.props)}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onClick={primaryActionProps.onClick}
          data-hook={DataHook.Container}
        >
          <Card stretchVertically>
            <MediaOverlay
              media={backgroundImageUrl || backgroundImageNode || ''}
              className={styles.overlay}
              hoverSkin="dark"
              hovered={this.state.isHovered}
              dataHook={DataHook.HoverComponent}
            >
              <MediaOverlay.Content visible="hover">
                {this._renderActions()}
              </MediaOverlay.Content>
              {settingsMenu && (
                <MediaOverlay.Content visible="hover" placement="top-end">
                  {this._renderSettingsMenu()}
                </MediaOverlay.Content>
              )}
            </MediaOverlay>
            {badge && this._renderBadge()}
            {this._hasFooter() && this._renderFooter()}
          </Card>
        </div>
      </Proportion>
    );
  }
}

export default CardGalleryItem;
