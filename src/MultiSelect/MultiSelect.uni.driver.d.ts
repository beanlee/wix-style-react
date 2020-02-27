import { InputWithOptionsUniDriver } from '../InputWithOptions/InputWithOptions.uni.driver';
import { TextSize, TextWeight } from '../Text';
import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { TagUniDriver } from '../Tag/Tag.uni.driver';
import { OmitPolyfill } from '../common';

export interface MultiSelectUniDriver
  extends OmitPolyfill<InputWithOptionsUniDriver, 'driver'> {
  driver: {
    getMaxHeight: () => Promise<any>;
    clickOnInputWrapper: () => Promise<void>;
    inputWrapperHasFocus: () => Promise<any>;
    inputWrapperIsDisabled: () => Promise<any>;
    numberOfTags: () => Promise<number>;
    getTagLabelAt: (index: number) => Promise<string>;
    pressCommaKey: () => Promise<void>;
    getTagDriverByTagId: (
      tagId: string,
    ) => Promise<
      TagUniDriver & {
        isCloseButtonSmall: () => Promise<boolean>;
        isCloseButtonLarge: () => Promise<boolean>;
        getTextSize: () => TextSize;
        getTextWeight: () => TextWeight;
        isClickable: () => Promise<boolean>;
      }
    >;
    customSuffixExists: () => Promise<any>;
  } & Pick<InputWithOptionsUniDriver, 'driver'> &
    BaseUniDriver;
}
