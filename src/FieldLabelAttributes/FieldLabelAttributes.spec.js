import React from 'react';
import fieldLabelAttributesDriverFactory from './FieldLabelAttributes.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import FieldLabelAttributes from './FieldLabelAttributes';
import Tooltip from '../Tooltip';

describe('FieldLabelAttributes', () => {
  const createDriver = createDriverFactory(fieldLabelAttributesDriverFactory);

  describe('required', () => {
    it('should not exist by default', () => {
      const driver = createDriver(<FieldLabelAttributes />);
      expect(driver.hasRequired()).toBe(false);
    });

    it('should exist', () => {
      const driver = createDriver(<FieldLabelAttributes required />);
      expect(driver.hasRequired()).toBe(true);
    });
  });

  describe('info', () => {
    it('should not exist by default', () => {
      const driver = createDriver(<FieldLabelAttributes />);
      expect(driver.hasInfo()).toBe(false);
    });

    it('should exist', () => {
      const driver = createDriver(
        <FieldLabelAttributes info="help me bla bla" />,
      );
      expect(driver.hasInfo()).toBe(true);
    });

    it('should render tooltip', () => {
      const driver = createDriver(
        <FieldLabelAttributes
          tooltip={<Tooltip content="content" children={false} />}
        />,
      );
      expect(driver.hasInfo()).toBe(true);
    });
  });
});
