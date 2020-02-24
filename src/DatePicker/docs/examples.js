export const simple = `
class DatePickerExample extends React.PureComponent {
  state = { value: new Date() };

  render() {
    const { value } = this.state;
    return (
      <DatePicker
        placeholderText="Select Date"
        value={value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}
`;

export const customizations = `
<DatePicker
  value={new Date('08/07/1986')}
  placeholderText="Select Date"
  onChange={event => console.log(event)}
  dateFormat="D/M/YY"
  locale='fr'
  showMonthDropdown
  showYearDropdown
/>
`;

export const filterDate = `
<DatePicker
  value={new Date()}
  placeholderText="Select Date"
  onChange={event => console.log(event)}
  filterDate={date => date < new Date()}
/>
`;

export const status = `
<Layout cols={1}>
  <Cell>
    <DatePicker
      value={new Date()}
      placeholderText="Select Date"
      onChange={event => console.log(event)}
      filterDate={date => date < new Date()}
      status="error"
      statusMessage="Error Message"
    />
  </Cell>
  <Cell>
    <DatePicker
      value={new Date()}
      placeholderText="Select Date"
      onChange={event => console.log(event)}
      filterDate={date => date < new Date()}
      status="warning"
      statusMessage="Warning Message"
    />
  </Cell>
  <Cell>
    <DatePicker
      value={new Date()}
      placeholderText="Select Date"
      onChange={event => console.log(event)}
      filterDate={date => date < new Date()}
      status="loading"
      statusMessage="Loading Message"
    />
  </Cell>
</Layout>
`;

export const rangeSelection = `
<DatePicker
  value={new Date()}
  placeholderText="Select Date Range"
  onChange={event => console.log(event)}
  twoMonths
  selectionMode="range"
  shouldCloseOnSelect={false}
/>
`;
