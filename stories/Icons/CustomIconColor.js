import React from 'react';
import Duplicate from 'wix-ui-icons-common/Duplicate';
import s from './style.scss';

export default () => {
  return (
    <div className={s.iconList}>
      <div className={s.singleIconView}>
        <Duplicate style={{ color: 'blue' }} />
        <Duplicate className={s.customIconColorDuplicate} />
      </div>
    </div>
  );
};
