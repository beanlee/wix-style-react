import ReactTestUtils from 'react-dom/test-utils';
import styles from './DropdownLayout.scss';
import values from '../utils/operators/values';
import { isClassExists } from '../../test/utils';

const dropdownLayoutDriverFactory = ({ element }) => {
  const contentContainer = element.childNodes[0];
  const infiniteScrollContainer = element.querySelector(
    '[data-hook=infinite-scroll-container]',
  );
  const optionElementsContainer = element.querySelector(
    '[data-hook=dropdown-layout-options]',
  );
  const optionElements = infiniteScrollContainer
    ? infiniteScrollContainer
    : optionElementsContainer;

  const optionElementAt = position => optionElements.childNodes[position];
  const optionsLength = () => optionElements.childNodes.length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, () =>
      createOptionDriver(optionElementAt(position)),
    );

  return {
    classes: () => optionElementsContainer.className,
    clickAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.click(optionElementAt(position)),
      ),
    clickAtOptionWithValue: value => {
      const option = values(optionElements.childNodes).find(
        _option => _option.innerHTML === value,
      );
      option && ReactTestUtils.Simulate.click(option);
    },
    exists: () => !!element,
    hasTopArrow: () => !!element.querySelector(`.${styles.arrow}`),
    isDown: () => isClassExists(contentContainer, styles.down),
    isLinkOption: position =>
      optionElementAt(position).tagName.toLowerCase() === 'a',
    isOptionADivider: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), styles.divider),
      ),
    isOptionExists: optionText =>
      [].filter.call(
        optionElements.childNodes,
        opt => opt.textContent === optionText,
      ).length > 0,
    /** returns if an option is hovered. notice that it checks by index and __not__ by id */
    isOptionHovered: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), styles.hovered),
      ),
    isOptionSelected: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), styles.selected),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'wixstylereactHovered'),
      ),
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'wixstylereactSelected'),
      ),
    isOptionHeightSmall: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), styles.smallHeight),
      ),
    isOptionHeightBig: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), styles.bigHeight),
      ),
    isShown: () => isClassExists(contentContainer, styles.shown),
    isUp: () => isClassExists(contentContainer, styles.up),
    mouseClickOutside: () =>
      document.body.dispatchEvent(new Event('mouseup', { cancelable: true })),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseEnterAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseEnter(optionElementAt(position)),
      ),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseLeave(optionElementAt(position)),
      ),
    /** @deprecated Use optionDriver*/
    optionAt: optionElementAt,
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: hook => {
      const option = optionElements.querySelector(`[data-hook=${hook}]`);
      if (!option) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }
      return createOptionDriver(option);
    },
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    optionContentAt: position =>
      doIfOptionExists(position, () => optionElementAt(position).textContent),
    /** Get option driver given an option index */
    optionDriver: createOptionDriver,
    /** Get an array of all options including dividers (drivers) */
    options: () => {
      const drivers = [];
      for (let position = 0; position < optionsLength(); position++) {
        drivers.push(getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: () =>
      values(optionElements.childNodes).map(option => option.textContent),

    markedOption: async () => {
      const hoveredOption = optionElements.querySelector(`.${styles.hovered}`);
      return (
        (hoveredOption && createOptionDriver(hoveredOption).content()) || null
      );
    },

    optionsLength: () => optionsLength(),
    /** @deprecated should be private */
    optionsScrollTop: () => optionElements.scrollTop,
    pressDownKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowDown' }),
    pressUpKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowUp' }),
    pressEnterKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Enter' }),
    pressSpaceKey: () => ReactTestUtils.Simulate.keyDown(element, { key: ' ' }),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(element, { key: 'Tab' }),
    pressEscKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Escape' }),
    tabIndex: () => element.tabIndex,
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(option),
  mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(option),
  isHovered: () => isClassExists(option, styles.hovered),
  isSelected: () => isClassExists(option, styles.selected),
  isHoveredWithGlobalClassName: () =>
    isClassExists(option, 'wixstylereactHovered'),
  isSelectedWithGlobalClassName: () =>
    isClassExists(option, 'wixstylereactSelected'),
  content: () => option.textContent,
  click: () => ReactTestUtils.Simulate.click(option),
  isDivider: () => isClassExists(option, styles.divider),
  isDisabled: () => isClassExists(option, styles.disabled),
});

export default dropdownLayoutDriverFactory;
