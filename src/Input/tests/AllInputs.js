import React from 'react';
import PropTypes from 'prop-types';
import Input from '..';
import DateSmall from 'wix-ui-icons-common/DateSmall';
import Date from 'wix-ui-icons-common/Date';

export default class AllInputs extends React.Component {
  static propTypes = {
    rtl: PropTypes.bool,
  };
  render() {
    const { rtl } = this.props;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gridGap: '20px',
          margin: '20px',
        }}
        dir={rtl ? 'rtl' : 'ltr'}
      >
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          size="small"
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          size="small"
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />

        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />

        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          size="large"
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          size="large"
          prefix={<Input.Affix>https://</Input.Affix>}
          suffix={<Input.Affix>.com</Input.Affix>}
        />

        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          size="small"
          prefix={
            <Input.IconAffix>
              <DateSmall />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <DateSmall />
            </Input.IconAffix>
          }
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          size="small"
          prefix={
            <Input.IconAffix>
              <DateSmall />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <DateSmall />
            </Input.IconAffix>
          }
        />

        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          prefix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          prefix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
        />

        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          size="large"
          prefix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
        />
        <Input
          status="loading"
          rtl={rtl}
          menuArrow
          roundInput
          size="large"
          prefix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
          suffix={
            <Input.IconAffix>
              <Date />
            </Input.IconAffix>
          }
        />
      </div>
    );
  }
}
