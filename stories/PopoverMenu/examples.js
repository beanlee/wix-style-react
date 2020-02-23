export const importExample = `
import PopoverMenu from 'wix-style-react/PopoverMenu';
import IconButton from 'wix-style-react/IconButton';
`;

export const basic = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu
        triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Open Menu</TextButton>}>
      <PopoverMenu.MenuItem
        text="Add"
      />
      <PopoverMenu.MenuItem
        text="Edit"
      />
      <PopoverMenu.MenuItem
        text="Delete"
      />
  </PopoverMenu>
</Layout>
`;

export const skins = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Skins</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add"
        skin="dark"
      />
      <PopoverMenu.MenuItem
        text="Edit"
        skin="dark"
      />
      <PopoverMenu.MenuItem
        text="Delete"
        skin="destructive"
      />
  </PopoverMenu>
</Layout>
`;

export const prefix = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Prefix</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add"
        prefixIcon={<Icons.Add />}
      />
      <PopoverMenu.MenuItem
        text="Edit"
        prefixIcon={<Icons.Edit />}
      />
      <PopoverMenu.MenuItem
        text="Delete"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu>
</Layout>
`;

export const size = `
<Layout  cols={2} gap={0} justifyItems="center">
<PopoverMenu
  textSize="medium"
  triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Medium Menu</TextButton>}
>
    <PopoverMenu.MenuItem
      text="Add"
      prefixIcon={<Icons.Add />}
    />
    <PopoverMenu.MenuItem
      text="Edit"
      prefixIcon={<Icons.Edit />}
    />
    <PopoverMenu.MenuItem
      text="Delete"
      prefixIcon={<Icons.Delete />}
      skin="destructive"
    />
</PopoverMenu>
  <PopoverMenu
      textSize="small"
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}> Menu</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add"
        prefixIcon={<Icons.AddSmall />}
      />
      <PopoverMenu.MenuItem
        text="Edit"
        prefixIcon={<Icons.EditSmall />}
      />
      <PopoverMenu.MenuItem
        text="Delete"
        prefixIcon={<Icons.DeleteSmall />}
        skin="destructive"
      />
  </PopoverMenu>
</Layout>
`;

export const divider = `
<Layout  cols={1} justifyItems="center">
  <PopoverMenu
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Divider</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add"
        prefixIcon={<Icons.Add />}
      />
      <PopoverMenu.MenuItem
        text="Edit"
        prefixIcon={<Icons.Edit/>}
      />
      <PopoverMenu.MenuItem
        text="Delete"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
      <PopoverMenu.Divider/>
      <PopoverMenu.MenuItem
        text="Settings"
        prefixIcon={<Icons.Settings />}
      />
  </PopoverMenu>
</Layout>
`;

export const wrap = `
<Layout  cols={2} gap={0} justifyItems="center">
<PopoverMenu
  textSize="medium"
  maxWidth={150}
  ellipsis
  triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Ellipsis</TextButton>}
>
    <PopoverMenu.MenuItem
      text="Add New Items"
      prefixIcon={<Icons.Add />}
    />
    <PopoverMenu.MenuItem
      text="Edit This Item"
      prefixIcon={<Icons.Edit />}
    />
    <PopoverMenu.MenuItem
      text="Delete This Item"
      prefixIcon={<Icons.Delete />}
      skin="destructive"
    />
</PopoverMenu>
  <PopoverMenu
      maxWidth={150}
      wrapText
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>Text Wraps</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add New Items"
        prefixIcon={<Icons.Add />}
      />
      <PopoverMenu.MenuItem
        text="Edit This Item"
        prefixIcon={<Icons.Edit />}
      />
      <PopoverMenu.MenuItem
        text="Delete This Item"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu>
</Layout>
`;

export const placement = `
<Layout  cols={4} gap={0} justifyItems="center">
<PopoverMenu
  placement="left"
  triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>left</TextButton>}
>
    <PopoverMenu.MenuItem
      text="Add New Items"
      prefixIcon={<Icons.Add />}
    />
    <PopoverMenu.MenuItem
      text="Edit This Item"
      prefixIcon={<Icons.Edit />}
    />
    <PopoverMenu.MenuItem
      text="Delete This Item"
      prefixIcon={<Icons.Delete />}
      skin="destructive"
    />
</PopoverMenu>
  <PopoverMenu
      placement="right"
      triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>right</TextButton>}
  >
      <PopoverMenu.MenuItem
        text="Add New Items"
        prefixIcon={<Icons.Add />}
      />
      <PopoverMenu.MenuItem
        text="Edit This Item"
        prefixIcon={<Icons.Edit />}
      />
      <PopoverMenu.MenuItem
        text="Delete This Item"
        prefixIcon={<Icons.Delete />}
        skin="destructive"
      />
  </PopoverMenu>
  <PopoverMenu
  placement="top"
  triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>top</TextButton>}
>
  <PopoverMenu.MenuItem
    text="Add New Items"
    prefixIcon={<Icons.Add />}
  />
  <PopoverMenu.MenuItem
    text="Edit This Item"
    prefixIcon={<Icons.Edit />}
  />
  <PopoverMenu.MenuItem
    text="Delete This Item"
    prefixIcon={<Icons.Delete />}
    skin="destructive"
  />
</PopoverMenu>
<PopoverMenu
placement="bottom"
triggerElement={<TextButton suffixIcon={<Icons.ChevronDown/>}>bottom</TextButton>}
>
<PopoverMenu.MenuItem
  text="Add New Items"
  prefixIcon={<Icons.Add />}
/>
<PopoverMenu.MenuItem
  text="Edit This Item"
  prefixIcon={<Icons.Edit />}
/>
<PopoverMenu.MenuItem
  text="Delete This Item"
  prefixIcon={<Icons.Delete />}
  skin="destructive"
/>
</PopoverMenu>
</Layout>
`;
