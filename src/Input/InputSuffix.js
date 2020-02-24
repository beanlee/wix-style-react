import React from 'react';
import PropTypes from 'prop-types';
import DropDownArrow from 'wix-ui-icons-common/system/DropDownArrow';
import Search from 'wix-ui-icons-common/Search';

import CloseButton from '../CloseButton';
import ThemedInputErrorSuffix from './ThemedInputErrorSuffix';
import ThemedInputHelpSuffix from './ThemedInputHelpSuffix';
import InputLoaderSuffix from './InputLoaderSuffix';
import Input from './Input';

import styles from './Input.scss';
import InputWarningSuffix from './InputWarningSuffix';

const isFixVisible = fix => fix.isVisible;

const suffixRules = {
  inputLoaderSuffix: ({ status, disabled }) =>
    status === Input.StatusLoading && !disabled,
  inputErrorSuffix: ({ status, disabled }) =>
    status === Input.StatusError && !disabled,
  inputWarningSuffix: ({ status, disabled }) =>
    status === Input.StatusWarning && !disabled,
  inputHelpSuffix: ({ help, disabled }) => help && !disabled,
  magnifyingGlass: ({ magnifyingGlass, isClearButtonVisible, error }) =>
    magnifyingGlass && !isClearButtonVisible && !error,
  clearButton: ({ isClearButtonVisible }) => isClearButtonVisible,
  menuArrow: ({ menuArrow, isClearButtonVisible, magnifyingGlass }) =>
    menuArrow && !isClearButtonVisible && !magnifyingGlass,
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
  help,
  helpMessage,
  onIconClicked,
  magnifyingGlass,
  isClearButtonVisible,
  onClear,
  menuArrow,
  suffix,
  focused,
  tooltipPlacement,
  onTooltipShow,
}) => {
  const error = status === Input.StatusError;

  const suffixes = [
    {
      component: () => (
        <InputWarningSuffix
          theme={theme}
          focused={focused}
          warningMessage={statusMessage}
          tooltipPlacement={tooltipPlacement}
          onTooltipShow={onTooltipShow}
        />
      ),
      isVisible: suffixRules.inputWarningSuffix({ status, disabled }),
    },
    {
      component: () => (
        <ThemedInputErrorSuffix
          theme={theme}
          focused={focused}
          errorMessage={statusMessage}
          tooltipPlacement={tooltipPlacement}
          onTooltipShow={onTooltipShow}
        />
      ),
      isVisible: suffixRules.inputErrorSuffix({ status, disabled }),
    },
    {
      component: () => (
        <InputLoaderSuffix
          theme={theme}
          tooltipMessage={statusMessage}
          tooltipPlacement={tooltipPlacement}
          onTooltipShow={onTooltipShow}
        />
      ),
      isVisible: suffixRules.inputLoaderSuffix({ status, disabled }),
    },
    {
      component: () => (
        <ThemedInputHelpSuffix
          theme={theme}
          help={help}
          helpMessage={helpMessage}
          tooltipPlacement={tooltipPlacement}
          onTooltipShow={onTooltipShow}
        />
      ),
      isVisible: suffixRules.inputHelpSuffix({ help, disabled }),
    },
    {
      component: () => (
        <div
          className={styles.magnifyingGlass}
          disabled={disabled}
          onClick={onIconClicked}
        >
          <Search />
        </div>
      ),
      isVisible: suffixRules.magnifyingGlass({
        magnifyingGlass,
        isClearButtonVisible,
        error,
      }),
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
        magnifyingGlass,
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
  help: PropTypes.bool,
  helpMessage: PropTypes.node,
  onIconClicked: PropTypes.func,
  magnifyingGlass: PropTypes.bool,
  isClearButtonVisible: PropTypes.bool,
  onClear: PropTypes.func,
  menuArrow: PropTypes.bool,
  suffix: PropTypes.node,
  focused: PropTypes.bool,
  tooltipPlacement: PropTypes.string,
  onTooltipShow: PropTypes.func,
};

export default InputSuffix;
export { getVisibleSuffixCount };
