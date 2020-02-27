import { InputWithOptionsDriver } from '../InputWithOptions/InputWithOptions.driver';
import { TagDriver } from '../Tag/Tag.driver';
import { OmitPolyfill } from '../common';

export interface MultiSelectDriver
  extends OmitPolyfill<InputWithOptionsDriver, 'driver'> {
  driver: InputWithOptionsDriver['driver'] & {
    getMaxHeight: () => string;
    clickOnInputWrapper: () => void;
    inputWrapperHasFocus: () => boolean;
    inputWrapperIsDisabled: () => boolean;
    numberOfTags: () => number;
    customSuffixExists: () => HTMLElement;
    getTagLabelAt: (index: number) => string;
    pressCommaKey: () => void;
    getTagDriverByTagId: (tagId: string) => TagDriver;
  };
}
