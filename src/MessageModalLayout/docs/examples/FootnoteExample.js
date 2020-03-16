/* eslint-disable */
import React from 'react';
import Checkbox from "wix-style-react/Checkbox";

class FootnoteExample extends React.Component {
  render() {
    return (
      <MessageModalLayout
        primaryButtonText="Leave"
        secondaryButtonText="Cancel"
        title="Leave without saving?"
        sideActions={(<Checkbox>Don't show this again</Checkbox>)}
        illustration={"marketing_illustration.png"}
        footnote={
            <Text size="small">By sending an invite, you agree to the <a>Wix Terms of Use.</a></Text>
        }
      >
        <Text>
          Are you sure you want to leave this page? Your changes won't be saved.
        </Text>
      </MessageModalLayout>
    )
  }
}
