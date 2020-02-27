import React from 'react';
import PropTypes from 'prop-types';
import DropDownArrow from 'wix-ui-icons-common/system/DropDownArrow';
import CloseButton from '../CloseButton';
import StatusIndicator from '../StatusIndicator';
import styles from './Input.scss';
import Box from '../Box';
import { dataHooks } from './constants';

const isFixVisible = fix => fix.isVisible;

const suffixRules = {
  inputStatusSuffix: ({ status, disabled }) => status && !disabled,
  clearButton: ({ isClearButtonVisible }) => isClearButtonVisible,
  menuArrow: ({ menuArrow, isClearButtonVisible }) =>
    menuArrow && !isClearButtonVisible,
  customSuffix: ({ suffix }) => !!suffix,
};

const getVisibleSuffixCount = args =>
  Object.keys(suffixRules)
    .map(key => suffixRules[key])
    .map(fn => fn(args))
    .filter(x => x).length;

const InputSuffix = ({
  theme,
  statusMessage,
  status,
  disabled,
  onIconClicked,
  isClearButtonVisible,
  onClear,
  menuArrow,
  suffix,
  tooltipPlacement,
  onTooltipShow,
}) => {
  const suffixes = [
    {
      component: () => (
        <Box margin={1} lineHeight="initial">
          <StatusIndicator
            dataHook={dataHooks.status}
            status={status}
            message={statusMessage}
            tooltipPlacement={tooltipPlacement}
            onTooltipShow={onTooltipShow}
          />
        </Box>
      ),
      isVisible: suffixRules.inputStatusSuffix({ status, disabled }),
    },
    {
      component: () => (
        <div className={styles.clearButton}>
          <CloseButton
            dataHook="input-clear-button"
            size="medium"
            onClick={onClear}
          />
        </div>
      ),
      isVisible: suffixRules.clearButton({ isClearButtonVisible }),
    },
    {
      component: () => suffix,
      isVisible: suffixRules.customSuffix({ suffix }),
    },
    {
      component: () => (
        <div
          className={styles.menuArrow}
          disabled={disabled}
          onClick={onIconClicked}
        >
          <DropDownArrow />
        </div>
      ),
      isVisible: suffixRules.menuArrow({
        menuArrow,
        isClearButtonVisible,
      }),
    },
  ].filter(isFixVisible);

  return (
    <div className={styles.suffixes}>
      {suffixes.map((s, i) => (
        <div key={i} className={styles.suffix}>
          {s.component()}
        </div>
      ))}
    </div>
  );
};

InputSuffix.propTypes = {
  suffixes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      isVisible: PropTypes.bool.isRequired,
    }),
  ),
  theme: PropTypes.oneOf([
    'normal',
    'tags',
    'paneltitle',
    'material',
    'amaterial',
    'flat',
    'flatdark',
  ]),
  statusMessage: PropTypes.node,
  status: PropTypes.oneOf(['loading', 'error', 'warning']),
  disabled: PropTypes.bool,
  onIconClicked: PropTypes.func,
  isClearButtonVisible: PropTypes.bool,
  onClear: PropTypes.func,
  menuArrow: PropTypes.bool,
  suffix: PropTypes.node,
  tooltipPlacement: PropTypes.string,
  onTooltipShow: PropTypes.func,
};

export default InputSuffix;
export { getVisibleSuffixCount };
