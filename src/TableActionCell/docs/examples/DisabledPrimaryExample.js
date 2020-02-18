import React from 'react';
import TableActionCell from 'wix-style-react/TableActionCell';

import style from '../TableActionCell.story.st.css';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      dataHook="story-primary-disabled"
      primaryAction={{
        text: 'Edit',
        disabled: true,
        skin: 'standard',
        onClick: () => window.alert('Primary action was triggered!'),
      }}
    />
  </div>
);

export default Example;
