/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  FamilyStructure,
  SingleComponentSideBySide,
  NotDefined,
  NotDeveloped,
  singleComponentSizes,
} from '../sharedComponents';

import { inputsSymbolsToComponents } from '../../../symbolsComponentsMapping/families/inputsFamily';

import {
  createLinkedSymbolName,
  createLinkedComponentsNames,
} from '../sharedComponents/utils';

import {
  inputsSymbols,
  symbolsGroup,
} from '../../../symbolsComponentsMapping/symbols';

//Assets
import Box from 'wix-style-react/Box';
import TextButton from 'wix-style-react/TextButton';
import GoogleMapsClient from 'wix-style-react/clients/GoogleMapsClient';
import GoogleAPILoader from '../../../utils/GoogleAPILoader';

//3. Inputs
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import RichTextInputArea from 'wix-style-react/RichTextInputArea';
import NumberInput from 'wix-style-react/NumberInput';
import TimeInput from 'wix-style-react/TimeInput';
import DateInput from 'wix-style-react/DateInput';
import ColorInput from 'wix-style-react/ColorInput';
import MultiSelect from 'wix-style-react/MultiSelect';
import FormField from 'wix-style-react/FormField';
import GoogleAddressInput from 'wix-style-react/GoogleAddressInput';
import Search from 'wix-style-react/Search';
import ImageViewer from 'wix-style-react/ImageViewer';
import { Category } from '../../../storiesHierarchy';
import VariableInput from 'wix-style-react/VariableInput';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import { Add } from 'wix-ui-icons-common';

const groupSymbol = symbolsGroup.inputs;

const TextInputExample = () => {
  const symbol = inputsSymbols.textInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Text Input">
        <Input placeholder="Value" />
      </FormField>
    </SingleComponentSideBySide>
  );
};

const TextAreaExample = () => {
  const symbol = inputsSymbols.textArea;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Text Area">
        <InputArea placeholder="Value" />
      </FormField>
    </SingleComponentSideBySide>
  );
};

const RichTextAreaExample = () => {
  const symbol = inputsSymbols.richTextArea;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Rich Text Area">
        <RichTextInputArea />
      </FormField>
    </SingleComponentSideBySide>
  );
};

class NumberInputExample extends PureComponent {
  state = { value: '500' };

  onNumberChanged = value => this.setState({ value });

  render() {
    const symbol = inputsSymbols.numberInput;
    const components = inputsSymbolsToComponents[symbol];

    const singleComponentProps = {
      name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
      componentsNames: createLinkedComponentsNames(components),
      size: singleComponentSizes.compact,
    };

    const { value } = this.state;

    return (
      <SingleComponentSideBySide {...singleComponentProps}>
        <FormField label="Number Input">
          <NumberInput onChange={this.onNumberChanged} value={value} />
        </FormField>
      </SingleComponentSideBySide>
    );
  }
}

const NumberRangeExample = () => {
  const symbol = inputsSymbols.numberRangeInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: components,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <NotDeveloped />
    </SingleComponentSideBySide>
  );
};

const IncrementerInputExample = () => {
  const symbol = inputsSymbols.incrementerInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: components,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <NotDefined />
    </SingleComponentSideBySide>
  );
};

const DurationInputExample = () => {
  const symbol = inputsSymbols.durationInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: components,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <NotDeveloped />
    </SingleComponentSideBySide>
  );
};

const TimeInputExample = () => {
  const symbol = inputsSymbols.timeInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Time Input">
        <TimeInput disableAmPm />
      </FormField>
    </SingleComponentSideBySide>
  );
};

const DateInputExample = () => {
  const symbol = inputsSymbols.dateInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Date">
        <DateInput value={new Date().toString()} />
      </FormField>
    </SingleComponentSideBySide>
  );
};

const DateRangeInputExample = () => {
  const symbol = inputsSymbols.dateRangeInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: components,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <NotDeveloped />
    </SingleComponentSideBySide>
  );
};

const ColorInputExample = () => {
  const symbol = inputsSymbols.colorInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <FormField label="Color Input">
        <ColorInput value="" placeholder="Please choose a color" />
      </FormField>
    </SingleComponentSideBySide>
  );
};

class TagsInputExample extends PureComponent {
  constructor(props) {
    super(props);
    this.nextId = 0;
    this.state = {
      tags: [],
      inputValue: '',
    };
  }

  handleOnRemoveTag = tagId => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter(currTag => currTag.id !== tagId),
    });
  };

  handleOnChange = e => this.setState({ inputValue: e.target.value });

  handleOnManuallyInput = values => {
    const { tags } = this.state;
    const newTags = values.map(value => ({
      id: String(this.nextId++),
      label: value,
    }));
    this.setState({ tags: [...tags, ...newTags] });
  };

  render() {
    const symbol = inputsSymbols.tagsInput;
    const components = inputsSymbolsToComponents[symbol];

    const singleComponentProps = {
      name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
      componentsNames: createLinkedComponentsNames(components),
      size: singleComponentSizes.compact,
    };

    const { inputValue, tags } = this.state;

    return (
      <SingleComponentSideBySide {...singleComponentProps}>
        <FormField label="Tag Input">
          <MultiSelect
            value={inputValue}
            onChange={this.handleOnChange}
            tags={tags}
            onManuallyInput={this.handleOnManuallyInput}
            onRemoveTag={this.handleOnRemoveTag}
            customSuffix={<TextButton>+ Add Tag</TextButton>}
            upgrade
          />
        </FormField>
      </SingleComponentSideBySide>
    );
  }
}

class GoogleAddressInputExample extends PureComponent {
  state = { value: '' };

  onAddressChange = e => this.setState({ value: e.target.value });

  onAddressSet = e => this.setState({ value: e.originValue });

  render() {
    const symbol = inputsSymbols.googleAddressInput;
    const components = inputsSymbolsToComponents[symbol];

    const singleComponentProps = {
      name: symbol,
      componentsNames: createLinkedComponentsNames(components),
      size: singleComponentSizes.compact,
    };

    const { value } = this.state;

    return (
      <SingleComponentSideBySide {...singleComponentProps}>
        <FormField label="Google Address Input">
          <GoogleAPILoader>
            <GoogleAddressInput
              value={value}
              onChange={this.onAddressChange}
              onSet={this.onAddressSet}
              Client={GoogleMapsClient}
            />
          </GoogleAPILoader>
        </FormField>
      </SingleComponentSideBySide>
    );
  }
}

const SearchInputExample = () => {
  const symbol = inputsSymbols.searchInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Search placeholder="Search..." />
    </SingleComponentSideBySide>
  );
};

const MediaInputExample = () => {
  const symbol = inputsSymbols.mediaInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <Box>
        <Box flexBasis="0" marginRight="18px">
          <FormField label="Multimedia Input ">
            <ImageViewer />
          </FormField>
        </Box>
        <Box>
          <FormField label="Multimedia Input ">
            <ImageViewer
              imageUrl="https://static.wixstatic.com/media/c78d05b79ede429fb77c9d8ec4443b93.jpg/v1/fit/w_375,h_375/c78d05b79ede429fb77c9d8ec4443b93.jpg"
              onAddImage={() => console.log('onAddImage')}
              onRemoveImage={() => console.log('onRemoveImage')}
              onUpdateImage={() => console.log('onUpdateImage')}
            />
          </FormField>
        </Box>
      </Box>
    </SingleComponentSideBySide>
  );
};
const VariableInputExample = () => {
  const symbol = inputsSymbols.variableInput;
  const components = inputsSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: createLinkedSymbolName({ groupSymbol: Category.INPUTS, symbol }),
    componentsNames: createLinkedComponentsNames(components),
    size: singleComponentSizes.compact,
  };
  let myRef = null;
  return (
    <SingleComponentSideBySide {...singleComponentProps}>
      <div style={{ position: 'relative' }}>
        <FormField label="Variable Input">
          <VariableInput
            initialValue="{{Variable 1}} Text {{Variable 2}} Text"
            variableParser={k => k}
            rows={3}
            size="medium"
            ref={ref => {
              myRef = ref;
            }}
          />
        </FormField>
        <Box position="absolute" top={3} right={0}>
          <PopoverMenu
            triggerElement={
              <TextButton size="tiny" prefixIcon={<Add />}>
                Insert Variable
              </TextButton>
            }
          >
            {['First', 'Second', 'Third', 'Fourth'].map(v => (
              <PopoverMenu.MenuItem
                text={`${v} Option`}
                key={v}
                onClick={() => myRef.insertVariable(`${v} Option`)}
              />
            ))}
          </PopoverMenu>
        </Box>
      </div>
    </SingleComponentSideBySide>
  );
};

const InputFamily = () => (
  <FamilyStructure title={groupSymbol} showPreview>
    <TextInputExample />
    <TextAreaExample />
    <RichTextAreaExample />
    <NumberInputExample />
    <NumberRangeExample />
    <IncrementerInputExample />
    <DurationInputExample />
    <TimeInputExample />
    <DateInputExample />
    <DateRangeInputExample />
    <ColorInputExample />
    <TagsInputExample />
    <GoogleAddressInputExample />
    <SearchInputExample />
    <MediaInputExample />
    <VariableInputExample />
  </FamilyStructure>
);

export default InputFamily;
