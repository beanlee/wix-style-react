/* eslint-disable */
import React from 'react';
import Modal from 'wix-style-react/Modal';
import Button from 'wix-style-react/Button';
import Box from 'wix-style-react/Box';
import CustomModalLayout from "wix-style-react/CustomModalLayout";

class MarketingExample extends React.Component {
  state = {
    isModalOpened: false,
  };

  openModal = () => this.setState({ isModalOpened: true });

  closeModal = () => this.setState({ isModalOpened: false });

  render() {
    const { isModalOpened } = this.state;
    return (
      <>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal isOpen={isModalOpened} onRequestClose={this.closeModal} shouldCloseOnOverlayClick >
          <CustomModalLayout width="800px" removeContentPadding onCloseButtonClick={this.closeModal}>
            <Card>
              <MarketingLayout
                title={
                    <Heading appearance="H2">Wix Unlimited Website Premium Plan</Heading>
                }
                description={
                  <Box direction="vertical">
                    <Text weight={"normal"}>Get a customizable website, designed to match the colors and style of your logo.</Text>
                    <Text weight={"normal"}>The unlimited plan includes:
                      <ul>
                        <li>Free Custom Domain for 1 year</li>
                        <li>Extra storage & unlimited bandwidth</li>
                        <li>Ad vouchers to promote your site</li>
                      </ul>
                    </Text>
                  </Box>
                }
                size="medium"
                image="marketing_illustration.png"
                imageBackgroundColor="B50"
                actions={<Button>Add to Cart</Button>}
              />
            </Card>
          </CustomModalLayout>
        </Modal>
      </>
    );
  }
}

