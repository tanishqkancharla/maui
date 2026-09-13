# Buttons

Gallery: `/components/buttons`. Import from `"maui"`. Overlay and Dialog live on this page too.

## `Button`

Native `<button>` (default `type="button"`). Height 28px, `shadow.subtle`, `radius` 4px.

```tsx
<Button>Save</Button>
<Button variant="quiet">Cancel</Button>
<Button variant="primary" variantColor="blue">Create</Button>
<Button variant="primary" variantColor="#6366f1">Indigo</Button>
<Button isDisabled>Wait</Button>
<Button aria-label="Search"><Search size="sm" /></Button>
<Button>
  <Plus size="sm" />
  Create
</Button>
```

| Prop | Notes |
| --- | --- |
| `variant` | `"default"` (raised element) \| `"quiet"` (no shadow, transparent) \| `"primary"` (solid fill) |
| `variantColor` | Palette name or opaque `#hex` / `rgb(...)`. Primary default is `"accent"`. Quiet ignores color unless set |
| `isDisabled` | React Aria name. Maps to native `disabled`. **No `disabled` React prop** |
| `children` | Text is wrapped for cap-height trim; SVG icons sit beside text. Icon-only needs `aria-label` |

Primary: fill step 9, hover 10, light text (`onAccent`, or step 12 on amber/lime/mint/sky/yellow). Custom CSS fill drops alpha; hover is `l - 0.04`; text is white or near-black from lightness. Edge is `tintedSubtle`. Quiet + color: 3.5% wash (hover 7%).

`useButton(props)` is exported for custom focus-tracked buttons; prefer `Button`.

## `Overlay`

Full-viewport portal. `onClickOutside` fires when the backdrop itself is the mousedown target.

```tsx
{open && (
  <Overlay onClickOutside={() => setOpen(false)}>
    {/* centered panel */}
  </Overlay>
)}
```

## `Dialog`

`Overlay` + focus lock + scale/fade in. Children are the dialog body (padding 32px, `background.element`, 4px radius). Not React Aria Dialog — you own title and close.

```tsx
{open && (
  <Dialog onClickOutside={() => setOpen(false)}>
    <H3>Confirm</H3>
    <P>This cannot be undone.</P>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Dialog>
)}
```
