export const trigger = `
<PopoverMenu 
    triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}> 
  <PopoverMenu.MenuItem 
    text="option 1" 
  /> 
  <PopoverMenu.MenuItem 
    text="option 2" 
  />
  <PopoverMenu.MenuItem 
    text="option 3" 
  />
</PopoverMenu>
`;

export const renderprops = `
<PopoverMenu 
    triggerElement={({toggle, open, close}) => 
    <IconButton onClick={toggle} onMouseEnter={open} onMouseLeave={close} 
    priority="secondary"><Icons.More /></IconButton>}> 
  <PopoverMenu.MenuItem text="Add" /> 
  <PopoverMenu.MenuItem text="Edit"
  />
  <PopoverMenu.MenuItem text="Delete" />
</PopoverMenu>
  `;

export const wrap = `
<Layout cols={2} gap={0} justifyItems="center">
  <PopoverMenu 
    ellipsis
    triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}
  > 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    /> 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
  </PopoverMenu>
  <PopoverMenu 
    triggerElement={<IconButton priority="secondary"><Icons.More /></IconButton>}
  > 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    /> 
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
    <PopoverMenu.MenuItem 
    text="very long message very long" 
    />
  </PopoverMenu>
</Layout>
`;
