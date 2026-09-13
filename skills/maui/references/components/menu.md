# Menu

Gallery: `/components/menu`. Import from `"maui"`. Related: [select.md](select.md).

Exactly two children on `MenuTrigger`: **trigger**, then **menu**. The trigger should be focusable.

```tsx
<MenuTrigger placement="bottom start">
  <Button>Actions</Button>
  <Menu onAction={(key) => doAction(String(key))}>
    <MenuItem id="rename">Rename</MenuItem>
    <MenuItem id="delete">Delete</MenuItem>
  </Menu>
</MenuTrigger>
```

`placement` defaults to `"bottom start"`. Popover uses `shadow.strong` via `CollectionPopover`.
