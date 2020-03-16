/* eslint-disable */
import React from 'react';
import Checkbox from "wix-style-react/Checkbox";

class BasicExample extends React.Component {
  render() {
    return (
      <CustomModalLayout
        primaryButtonText="Save"
        primaryButtonOnClick={this.closeModal}
        secondaryButtonText="Cancel"
        secondaryButtonOnClick={this.closeModal}
        onCloseButtonClick={this.closeModal}
        title="Create New Coupon"
        subtitle="Make customers come back to your store with coupons"
        sideActions={(<Checkbox>Checkbox</Checkbox>)}
      >
        <Text>
          If you leave now, changes you have made here won't be saved. Are you
          sure you want to leave?
        </Text>
      </CustomModalLayout>
    )
  }
}
