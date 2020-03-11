export const importExample =
  "import { Sidebar, SidebarHeader, SidebarDivider, SidebarSectionTitle, SidebarSectionItem, SidebarBackButton  } from 'wix-style-react';";

export const businessManagerSidebar = `
class DesignedSidebar extends React.Component {
  _renderUpgradeButton = () => (
    <Box align="center" margin="24px 30px">
      <Button size="small" skin="premium">
        Upgrade
      </Button>
    </Box>
  );

  _renderTimer = () => (
    <Box align="space-between" verticalAlign="middle" margin="9px 24px" color="D80">
      <Box inline verticalAlign="middle">
        <Box
          width="8px"
          height="8px"
          borderRadius="50%"
          backgroundColor="G10"
          marginRight="10px"
        ></Box>
        <Text size="tiny" light>
          17:45
        </Text>
      </Box>
      <Icons.Sound />
    </Box>
  );

  _renderEditButton = () => (
    <Box align="center" margin="18px 0">
      <TextButton prefixIcon={<Icons.Edit />} size="small" weight="normal">
        Edit Site
      </TextButton>
    </Box>
  );

  render() {
    return (
      <Box height="800px">
        <Sidebar selectedKey={'dashboard'}>
          <Sidebar.PersistentHeader>
            <Box direction="vertical">
              <SidebarHeader title="Site Name" subtitle="Role: Owner" />
              <SidebarDivider fullWidth />
            </Box>
          </Sidebar.PersistentHeader>

          <Sidebar.Item itemKey={'dashboard'}>
            <SidebarSectionItem selected>Dashboard</SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.Item itemKey={'video-library'}>
            <SidebarSectionItem>Video Library</SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.Item itemKey={'rest-menus'}>
            <SidebarSectionItem>Rest. Menus</SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.Item itemKey={'rest-reservations'}>
            <SidebarSectionItem>Rest. Reservations</SidebarSectionItem>
          </Sidebar.Item>

          <SidebarDivider />

          <SidebarSectionTitle>Ascend by Wix</SidebarSectionTitle>

          <Sidebar.Item itemKey={'customer-management'}>
            <SidebarSectionItem>Customer Management</SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.Item itemKey={'marketing-tools'}>
            <SidebarSectionItem>Marketing Tools</SidebarSectionItem>
          </Sidebar.Item>

          <SidebarDivider />

          <Sidebar.Item itemKey={'settings'}>
            <SidebarSectionItem>Settings</SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.Item
            itemKey={'apps'}
            innerMenu={[
              <Sidebar.BackButton>
                <SidebarBackButton>Main Menu</SidebarBackButton>
              </Sidebar.BackButton>,
              <SidebarSectionTitle>Apps</SidebarSectionTitle>,
              <Sidebar.Item itemKey={'app-market'}>
                <SidebarItemContextConsumer>
                  {({ selected }) => (
                    <SidebarSectionItem selected={selected}>App Market</SidebarSectionItem>
                  )}
                </SidebarItemContextConsumer>
              </Sidebar.Item>,
              <SidebarSectionItem suffix={<CounterBadge skin="danger"><SystemIcons.FormFieldErrorSmall /></CounterBadge>}>
                Manage Apps
              </SidebarSectionItem>,
            ]}
          >
            <SidebarSectionItem drillable>
              Apps
            </SidebarSectionItem>
          </Sidebar.Item>

          <Sidebar.PersistentFooter>
            <Box direction="vertical">
              {this._renderUpgradeButton()}
              <SidebarDivider fullWidth />
              {this._renderTimer()}
              <SidebarDivider fullWidth />
              {this._renderEditButton()}
            </Box>
          </Sidebar.PersistentFooter>
        </Sidebar>
      </Box>
    );
  }
}
`;

export const accountManagerSidebar = `
<Box height="800px">
<Sidebar skin="light">
  <Sidebar.PersistentHeader>
    <SidebarHeader>
      <TextButton prefixIcon={<Icons.ArrowLeft />} size="tiny" weight="normal" skin="dark">Back to Site Dashboard</TextButton>
      <Box direction="vertical" align="center" marginTop={5}>
          <Avatar size="size72" />
          <Box direction="vertical" align="center" marginTop={2}>
            <Text size="small" secondary weight="bold">Owner</Text>
            <Text size="tiny" secondary light weight="normal">owner@something.com</Text>
          </Box>
      </Box>
    </SidebarHeader>
  </Sidebar.PersistentHeader>

  <Sidebar.Item itemKey={'account-settings'}>
    <SidebarSectionItem selected>Account Settings</SidebarSectionItem>
  </Sidebar.Item>

  <SidebarDivider />

  <Sidebar.Item itemKey={'subscriptions'}>
    <SidebarSectionItem>Subscriptions</SidebarSectionItem>
  </Sidebar.Item>

  <Sidebar.Item itemKey={'billing-history'}>
    <SidebarSectionItem disabled>Billing History</SidebarSectionItem>
  </Sidebar.Item>

  <Sidebar.Item itemKey={'vouchers'}>
    <SidebarSectionItem>Vouchers</SidebarSectionItem>
  </Sidebar.Item>

  <Sidebar.Item itemKey={'domains'}>
    <SidebarSectionItem>Domains</SidebarSectionItem>
  </Sidebar.Item>

  <Sidebar.Item itemKey={'mailboxes'}>
    <SidebarSectionItem>Mailboxes</SidebarSectionItem>
  </Sidebar.Item>

  <SidebarDivider />

  <Sidebar.Item itemKey={'hire-an-expert'}>
    <SidebarSectionItem>Hire an Expert</SidebarSectionItem>
  </Sidebar.Item>
</Sidebar>
</Box>
`;
