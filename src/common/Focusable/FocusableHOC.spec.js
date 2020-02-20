import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

import { withFocusable, focusableStates } from './FocusableHOC';

const focusableDriver = ({ element, eventTrigger }) => ({
  focus: () => eventTrigger.focus(element),
  blur: () => eventTrigger.blur(element),
  hasFocusState: () => !!element.getAttribute('data-focus'),
  hasFocusVisibleState: () => !!element.getAttribute('data-focus-visible'),
});

describe('FocusableHOC', () => {
  const render = Comp =>
    mount(Comp, { attachTo: document.createElement('div') });

  // Pure component without state
  class PureChildComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.boundMethod = this.boundMethod.bind(this);
    }

    static propTypes = {
      id: PropTypes.string,
    };

    static staticVariable = 'staticVariable';

    static staticMethod() {
      return 'staticMethod';
    }

    unboundMethod() {
      return 'unboundMethod';
    }

    boundMethod() {
      return this.id;
    }
    render() {
      return (
        <div
          onFocus={this.props.focusableOnFocus} // eslint-disable-line react/prop-types
          onBlur={this.props.focusableOnBlur} // eslint-disable-line react/prop-types
          {...focusableStates(this.props)}
        >
          Hello
        </div>
      );
    }
  }

  const pureChildDriverFactory = ({ element, eventTrigger }) => {
    return {
      ...focusableDriver({
        element,
        getFocusableElement: () => element,
        eventTrigger,
      }),
    };
  };

  const WithFocusableComp = withFocusable(PureChildComponent);

  describe('Pure component HOC', () => {
    it('should render the wrapped component', () => {
      const wrapper = render(<WithFocusableComp />);
      expect(wrapper.children().instance()).toBeInstanceOf(PureChildComponent);
    });

    describe('hoisting', () => {
      it('should hoist static methods', () => {
        expect(WithFocusableComp.staticMethod()).toEqual('staticMethod');
      });

      it('should hoist static variables', () => {
        expect(WithFocusableComp.staticVariable).toEqual('staticVariable');
      });

      it('should hoist prototype methods from child to HOC and bind them', () => {
        const wrapper = render(<WithFocusableComp id="some_id" />);
        expect(wrapper.instance().unboundMethod()).toEqual('unboundMethod');
        expect(wrapper.instance().boundMethod()).toEqual('some_id');
      });
    });
  });

  describe('Focusable', () => {
    const driverFactory = createDriverFactory(pureChildDriverFactory);

    const createDriver = Component => {
      const driver = driverFactory(Component);
      const fireMouseDown = () =>
        window.dispatchEvent(new window.Event('mousedown'));
      const fireMouseUp = () =>
        window.dispatchEvent(new window.Event('mouseup'));
      const fireKeyDown = () =>
        window.dispatchEvent(new window.Event('keydown'));
      const fireKeyUp = () => window.dispatchEvent(new window.Event('keyup'));
      const tabOut = () => {
        fireKeyDown();
        driver.blur();
        fireKeyUp();
      };
      const tabIn = () => {
        fireKeyDown();
        driver.focus();
        fireKeyUp();
      };

      const click = () => {
        fireMouseDown();
        driver.focus();
        fireMouseUp();
      };

      return {
        ...driver,
        fireMouseDown,
        fireKeyDown,
        fireKeyUp,
        tabOut,
        tabIn,
        click,
      };
    };

    const expectKeyboardFocused = (driver, msg) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(true, `${prefix}hasFocusState`);
      expect(driver.hasFocusVisibleState()).toBe(
        true,
        `${prefix}hasFocusVisibleState`,
      );
    };

    const expectNotFocused = (driver, msg) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(false, `${prefix}hasFocusState`);
      expect(driver.hasFocusVisibleState()).toBe(
        false,
        `${prefix}hasFocusVisibleState`,
      );
    };

    const expectMouseFocused = (driver, msg) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(true, `${prefix}hasFocusState`);
      expect(driver.hasFocusVisibleState()).toBe(
        false,
        `${prefix}hasFocusVisibleState`,
      );
    };

    let WithFocusableComp2;
    let focusableModule;

    beforeEach(() => {
      // Resetting modules, in order to reset the FocusableHOC.InputMethod.method state.
      jest.resetModules();
      focusableModule = require('./FocusableHOC');
      WithFocusableComp2 = focusableModule.withFocusable(PureChildComponent);
      // TODO: find a way to reset the eventHandlers which are added to the window.
    });

    it('should not have focus nor focus-visible [given] initial render', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      expectNotFocused(driver);
    });

    it('should have focus and focus-visible [when] focused programmatically', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.focus();
      // Default input is keyboard
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in without keyDown', () => {
      // This test case checks a scenario when the focus is on the browser's
      // url input, and we press tab. The keyDown is not fired.
      const driver = createDriver(<WithFocusableComp2 />);

      driver.focus();
      driver.fireKeyUp();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not have focus nor focus-visible [when] blurred programmatically [given] keyboard focused', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');

      driver.blur();
      expectNotFocused(driver, 'after blur');
    });

    it('should have focus but not focus-visible [when] clicked', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.click();
      expectMouseFocused(driver, 'after click');
    });

    it('should have focus but not focus-visible [when] focused programmatically [given] current input method is mouse', () => {
      // This test must be here , after a test which finishes with the input method = mouse.
      // this test is only to test that we are resetting the FocusableHOC global state properly,
      // using the jest.resetModules() call.
      const driver = createDriver(<WithFocusableComp2 />);

      driver.focus();
      expectKeyboardFocused(driver, 'after click');
    });

    /**
     * This test checks that the InputMethod.method state is updated to `keyboard` after
     * is was set to `mouse`.
     */
    it('should have focus and focus-visible [when] focused [given] mouseDown and blur', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.blur();
      expectNotFocused(driver, 'after blur');

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not be focused [when] tabbed out [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.tabOut();
      expectNotFocused(driver, 'after tab');
    });

    it('should have focus and focus-visible, when: any keyboard key pressed [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.fireKeyDown();
      expectKeyboardFocused(driver, 'after pressing space');
    });
  });
});
