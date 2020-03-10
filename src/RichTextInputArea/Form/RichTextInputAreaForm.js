import React from 'react';
import Check from 'wix-ui-icons-common/Check';
import X from 'wix-ui-icons-common/X';

import styles from './RichTextInputAreaForm.scss';
import { RichTextInputAreaContext } from '../RichTextInputAreaContext';
import Tooltip from '../../Tooltip';
import Box from '../../Box';
import IconButton from '../../IconButton';

class RichTextInputAreaForm extends React.PureComponent {
  render() {
    const { dataHook, children, onSubmit, onCancel, isDisabled } = this.props;

    return (
      <RichTextInputAreaContext.Consumer>
        {({ texts }) => (
          <form data-hook={dataHook} onSubmit={onSubmit}>
            {children}
            <div className={styles.footer}>
              <Tooltip content={texts.insertionForm.confirmButtonLabel}>
                <IconButton
                  dataHook="richtextarea-form-confirm-button"
                  type="submit"
                  size="small"
                  onClick={onSubmit}
                  disabled={isDisabled}
                >
                  <Check />
                </IconButton>
              </Tooltip>
              <Box inline marginRight={1} marginLeft={1}>
                <Tooltip content={texts.insertionForm.cancelButtonLabel}>
                  <IconButton
                    dataHook="richtextarea-form-cancel-button"
                    priority="secondary"
                    size="small"
                    onClick={onCancel}
                  >
                    <X />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
          </form>
        )}
      </RichTextInputAreaContext.Consumer>
    );
  }
}

export default RichTextInputAreaForm;
