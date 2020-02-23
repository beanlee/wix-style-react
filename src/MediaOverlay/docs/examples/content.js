import React from 'react';
import MoreIcon from 'wix-ui-icons-common/More';
import StarIcon from 'wix-ui-icons-common/Star';
import CropIcon from 'wix-ui-icons-common/Crop';

import Box from '../../../Box';
import Text from '../../../Text';
import PopoverMenu from '../../../PopoverMenu';
import IconButton from '../../../IconButton';
import FillPreview from '../../../FillPreview';
import MediaOverlay from '../..';

const moreActionsPopoverMenu = (
  <PopoverMenu
    triggerElement={
      <IconButton priority="secondary" skin="inverted" size="tiny">
        <MoreIcon />
      </IconButton>
    }
  >
    <PopoverMenu.MenuItem text="Edit" />
    <PopoverMenu.MenuItem text="Preview" />
    <PopoverMenu.MenuItem text="Remove" skin="destructive" />
  </PopoverMenu>
);

export const galleryItemWithHoverActions = [
  <MediaOverlay.Content key="actions" placement="top-end" visible="hover">
    <IconButton priority="secondary" skin="inverted" size="tiny">
      <CropIcon />
    </IconButton>
    <IconButton priority="secondary" skin="inverted" size="tiny">
      <StarIcon />
    </IconButton>
    {moreActionsPopoverMenu}
  </MediaOverlay.Content>,
  <MediaOverlay.Content key="title" placement="bottom-start" visible="always">
    <Text size="small" light ellipsis placement="bottom">
      Image Title
    </Text>
  </MediaOverlay.Content>,
];

export const dragHandle = [
  <MediaOverlay.Content key="dragHandle" visible="hover">
    <MediaOverlay.DragHandle />
  </MediaOverlay.Content>,
];

const renderExampleContent = (placement, visible, fill = ['lime', 'lime']) => (
  <MediaOverlay.Content
    key={`${visible}-${placement}`}
    placement={placement}
    visible={visible}
  >
    {fill.map((fillContent, index) => (
      <Box key={index} width="24px">
        <FillPreview key={index} fill={fillContent} />
      </Box>
    ))}
  </MediaOverlay.Content>
);

export const allPlacements = [
  renderExampleContent('top-start', 'always'),
  renderExampleContent('top-end', 'always'),
  renderExampleContent('middle', 'always'),
  renderExampleContent('bottom-start', 'always'),
  renderExampleContent('bottom-end', 'always'),
];

export const topHoverMiddleAlwaysBottomDefault = [
  renderExampleContent('top-start', 'hover'),
  renderExampleContent('top-end', 'hover'),
  renderExampleContent('middle', 'always'),
  renderExampleContent('bottom-start', 'default'),
  renderExampleContent('bottom-end', 'default'),
];

export const numberedPlacements = [
  renderExampleContent('top-start', 'always', [<>0</>, <>1</>]),
  renderExampleContent('top-end', 'always', [<>2</>, <>3</>]),
  renderExampleContent('middle', 'always', [<>4</>, <>5</>]),
  renderExampleContent('bottom-start', 'always', [<>6</>, <>7</>]),
  renderExampleContent('bottom-end', 'always', [<>8</>, <>9</>]),
];
