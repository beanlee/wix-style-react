export const importExample = `
import { FormField, MultiSelect  } from 'wix-style-react';`;

export const size = `
<Layout cols={1}>
  <Cell>
    <FormField label="Small">
    <MultiSelect
      size="small"
      tags={[{size: "tiny", id: '1', label: "tag 1"},{size: "tiny", id: '2', label: "tag 2"}]}
    />
    </FormField>
  </Cell>
  <Cell>
    <FormField label="Medium">
    <MultiSelect
      tags={[
        {id: '1', label: "tag 1", thumb:(<Avatar name="Sarah" size="size18"/>)},
        {id: '2', label: "tag 2", thumb:(<Avatar name="Sarah" size="size18"/>)}
      ]}
    />
    </FormField>
  </Cell>
  <Cell>
    <FormField label="Large">
    <MultiSelect
      size="large"
      tags={[
        {size: "large", id: '1', label: "tag 1", thumb:(<Avatar name="Sarah" size="size24"/>)},
        {size: "large", id: '2', label: "tag 2", thumb:(<Avatar name="Hanks" size="size24"/>)}
      ]}
    />
    </FormField>
  </Cell>
</Layout>
`;

export const mode = `
<Layout cols={1}>
  <Cell>
    <FormField label="Select a value">
      <MultiSelect
        mode="select"
        options={[
          {id: '1', value: 'tag 1'},{id: '2', value: 'tag 2'},
        ]}
        placeholder="Choose from a list"
      />
    </FormField>
  </Cell>
  <Cell>
    <FormField label="Enter a value">
      <MultiSelect
        options={[
          {id: '1', value: 'tag 1'},{id: '2', value: 'tag 2'},
        ]}
        placeholder="Enter or choose from a list"
      />
    </FormField>
  </Cell>
</Layout>
`;

export const customValues = `
<FormField label="Enter the keywords">
  <MultiSelect
    options={[
      {id: '1', value: 'Traveling'},{id: '2', value: 'Cooking'},{id: '3', value: 'Opinions'},
    ]}
    placeholder="Create new keywords or select existing options from a list"
  />
</FormField>
`;

export const action = `
<FormField label="Tag input">
  <MultiSelect
    options={[
      {id: '1', value: 'tag 1'},{id: '2', value: 'tag 2'},{id: '3', value: 'tag 3'},
    ]}
    customSuffix={<TextButton>+ New Tag</TextButton>}
  />
</FormField>
`;

export const required = `
<FormField label="Tag input" required>
  <MultiSelect
    options={[
      {id: '1', value: 'tag 1'},{id: '2', value: 'tag 2'},{id: '3', value: 'tag 3'},
    ]}
    placeholder="Enter the tags"
  />
</FormField>
`;

export const labelPosition = `
<Layout>
  <Cell>
    <FormField label="On the top" infoContent="Tooltip text" required>
      <MultiSelect placeholder="Placeholder" />
    </FormField>
  </Cell>
  <Cell>
    <FormField label="At the start" infoContent="Tooltip text" labelPlacement="left" required>
      <MultiSelect placeholder="Placeholder" />
    </FormField>
  </Cell>
  <Cell>
    <FormField infoContent="Tooltip text" required>
      <MultiSelect placeholder="Placeholder" />
    </FormField>
  </Cell>
</Layout>
`;

export const reordable = `
class ExampleReorderable extends React.Component {
  options = [
    { id: '1', value: 'One' },
    { id: '2', value: 'Two' },
    { id: '3', value: 'Three' },
    { id: '4', value: 'Four' },
  ];

  state = {
    tags: [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ],
  };

  handleOnSelect = (option) => {
    const newTag = {
      id: option.id,
      label: option.value,
    };
    this.setState({ tags: [...this.state.tags, newTag] });
  }

  handleOnRemoveTag = (tagId) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag.id !== tagId),
    });
  }

  render() {
    const { tags } = this.state;
    return (
      <FormField label="Reorderable Numbers">
        <MultiSelect
          mode="select"
          tags={this.state.tags}
          onSelect={this.handleOnSelect}
          onRemoveTag={this.handleOnRemoveTag}
          onReorder={({ addedIndex, removedIndex }) => {
            const nextTags = tags.slice();
            nextTags.splice(addedIndex, 0, ...nextTags.splice(removedIndex, 1));
            this.setState({
              tags: nextTags,
            });
          }}
          options={this.options}
        />
      </FormField>
    );
  }
}
`;

export const customList = `
class ExampleCustomList extends React.Component {
  options = [
    {
      id: '1',
      prefix: <Avatar size="size30" name="John Smith" />,
      title: 'John Smith',
      subtitle: 'john@example.com',
    },
    {
      id: '2',
      prefix: <Avatar size="size30" name="David" />,
      title: 'David',
      subtitle: 'david@example.com',
    },
    {
      id: '3',
      prefix: <Avatar size="size30" name="John Doe" />,
      title: 'John Doe',
      subtitle: 'john.doe@example.com',
    },
  ];

  state = {
    tags: [
      { id: '1', label: 'john@example.com (John Smith)' },
    ],
    inputValue: '',
  };

  handleOnSelect = (option) => {
    const { title, subtitle } = this.options.find(({ id }) => id === option.id);
    const newTag = {
      id: option.id,
      label: \`\${subtitle} (\${title})\`,
    };
    this.setState({ tags: [...this.state.tags, newTag] });
  }

  handleOnRemoveTag = (tagId) => {
    this.setState({
      tags: this.state.tags.filter(tag => tag.id !== tagId),
    });
  }

  handleOnChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handlePredicate = (option) => {
    const { title, subtitle } = this.options.find(({ id }) => id === option.id);
    return [title, subtitle].join(' ')
      .toLowerCase()
      .includes(this.state.inputValue.toLowerCase());
  }

  render() {
    const { tags } = this.state;
    return (
      <FormField label="Custom Options">
        <MultiSelect
          highlight={false}
          tags={this.state.tags}
          onSelect={this.handleOnSelect}
          onRemoveTag={this.handleOnRemoveTag}
          onChange={this.handleOnChange}
          value={this.state.inputValue}
          predicate={this.handlePredicate}
          options={this.options.map(option => listItemSelectBuilder(option))}
        />
      </FormField>
    );
  }
}
`;
