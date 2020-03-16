/* eslint-disable */
import React from 'react';
import Box from 'wix-style-react/Box';
import Checkbox from "wix-style-react/Checkbox";

class NoHeaderExample extends React.Component {
  render() {
    return (
      <Box>
        <CustomModalLayout
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          sideActions={(<Checkbox>Checkbox</Checkbox>)}
          footnote="footnote"
        >
          <Text>
            If you leave now, changes you have made here won't be saved. Are you
            sure you want to leave?
          </Text>
        </CustomModalLayout>
      </Box>
    );
  }
}
