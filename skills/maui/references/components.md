# Components

Props, composition, and copy-paste usage for everything on the `"maui"` barrel. Import from `"maui"` unless noted. Layout tokens and `purse-styles` are in [tokens.md](tokens.md).

Gallery-only: `Panel` is a preview frame in the docs site. It is **not** exported. Use `Flex` + `shadow` + `radius` instead.

---

## Layout

### `Flex`

Row **or** column (exactly one of `row` / `column` is required).

```tsx
<Flex row gap={4} alignItems="center">
  <Avatar name="Ada Lovelace" size="md" />
  <Text size="lg" fontWeight={600}>Ada Lovelace</Text>
  <Spacer />
  <Badge>Active</Badge>
</Flex>
```

| Prop | Notes |
| --- | --- |
| `row` / `column` | Required, mutually exclusive |
| `gap` | Spacing step |
| `p` / `padding` | All-side padding step |
| `px` `py` `pt` `pb` | Axis / side padding |
| `alignItems` | CSS `align-items` |
| `border` | `true` (outline) or `"border" \| "outline" \| "accent"`. **Skipped when `shadow` is set** |
| `shadow` | `"subtle" \| "medium" \| "strong"` — includes a ring; do not also set `border` |
| `radius` | Token key (`sm`, `lg`, `pill`, …) |
| `style` | React style object |

### `Padding`

`xy` (all), `x` / `y`, or `top` `right` `bottom` `left`. Spacing steps.

### `Gap`

Fixed spacer: `{ width: Space }` **or** `{ height: Space }`. Does not grow.

### `Spacer`

`flex: 1 1 auto` — fills leftover space in a `Flex`.

### `Divider`

Full-width `<hr>` (`gray[5]`, 1.5px). Has vertical margin (~1.5rem). For tight lists, prefer `gap: 1px` between rows instead.

---

## Typography

Typography components have **no margin and no max-width**. Spacing belongs to the parent (`Flex` gap or `Prose`).

### `Text`

Inline `<span>`. Defaults: `size="md"`, `fontWeight={400}`, `color="highContrast"`.

```tsx
<Text size="sm" color="lowContrast">Secondary</Text>
<Text size="lg" fontWeight={600} monospace>src/maui.ts</Text>
```

Also accepts native span props except `color` (that axis is the token).

### `H1` `H2` `H3` `H4` `Blockquote` `Link`

**Children must be a `string`.** `Link` also needs `href`.

Outside `Prose` they use the app `text` scale (`H1` xl/700, `H2` lg/600, `H3`/`H4` md/600). Inside `Prose` they switch to the prose scale.

### `P` `Ul` `Ol` `Li` `Label`

`P` / lists / `Li` take `ReactNode`. `Label` forwards `<label>` attributes (`htmlFor`, …) and uses xs/500/lowContrast, non-selectable (`labelText`).

```tsx
<Flex column gap={3}>
  <Label htmlFor="name">Name</Label>
  <TextField id="name" aria-label="Name" />
</Flex>
```

### `Prose`

Long-form column: `maxWidth: 72ch` (`proseMaxWidth`) plus vertical rhythm. `size?: "sm" | "md" | "lg"` (default `md`) is inherited via `useProseSize()`.

```tsx
<Prose size="md">
  <H2>Shipping notes</H2>
  <P>Body copy with <Link href="/docs">a link</Link>.</P>
  <Ul>
    <Li>First</Li>
    <Li>Second</Li>
  </Ul>
</Prose>
```

Do not wrap app chrome (sidebars, toolbars, forms) in `Prose`.

### `Editor`

Unchromed TipTap markdown surface. Wrap it for padding, elevation, and actions (see [AI chat](apps.md#ai-chat)).

```tsx
<Editor
  content={draft}
  onChange={setDraft}
  onSubmit={send}          // ⌘/Ctrl+Enter
  placeholder="Write…"
  size="sm"                // ProseSize: sm | md | lg
  editable={!streaming}
  aria-label="Compose message"
/>
```

- `content` is markdown; updates apply when the string changes.
- `onChange` receives markdown.
- CommonMark shortcuts (`#`, `**`, `-`, `>`).
- No chrome, no submit button — parent owns those.

---

## Buttons and forms

### `Button`

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

### Fields

All fields are 28px tall, full width of the parent, `shadow.subtle` except `QuietTextField`. They take React Aria field props (`value`, `onChange`, `placeholder`, `isDisabled`, `isInvalid`, `aria-label`, `id`, …).

```tsx
<TextField aria-label="Title" placeholder="Title" value={v} onChange={setV} />
<SearchField aria-label="Search" value={q} onChange={setQ} />   // clear button when non-empty
<NumberField aria-label="Count" value={n} onChange={setN} minValue={0} maxValue={10} />
<QuietTextField aria-label="Filter" placeholder="Filter" value={f} onChange={setF} />
```

Invalid (unfocused) adds a red 1px ring on top of `shadow.subtle`. Placeholders are italic `gray[8]`. Cap width in the parent (`maxWidth: 240px` is the gallery default).

### `Checkbox`

Controlled only: `checked` + `setChecked`. Optional `label`.

```tsx
<Checkbox label="Subscribe" checked={on} setChecked={setOn} />
```

### `Switch`

Controlled: `selected` + `onChange`. **`label` is required.**

```tsx
<Switch label="Enable notifications" selected={on} onChange={setOn} />
```

### `Slider`

`label` required. React Aria slider props: `value`, `onChange`, `minValue`, `maxValue`, `step`. Default width 240px. Shows the formatted value as `<output>`.

```tsx
<Slider label="Volume" value={v} onChange={setV} minValue={0} maxValue={100} />
```

### `RadioOptionGroup` / `RadioOption`

```tsx
<RadioOptionGroup label="Plan" value={plan} onChange={setPlan}>
  <RadioOption value="free">Free</RadioOption>
  <RadioOption value="pro">Pro</RadioOption>
</RadioOptionGroup>
```

`RadioOption` must be nested. Group also accepts React Aria radio-group props (`isDisabled`, …).

### `Select` / `SelectItem`

Trigger + `CollectionPopover` + `ListBox`. Width 100% of parent.

```tsx
<Select
  label="Favorite fruit"
  placeholder="Choose a fruit"
  selectedKey={key}
  onSelectionChange={(k) => setKey(String(k))}
>
  <SelectItem id="apple">Apple</SelectItem>
  <SelectItem id="banana">Banana</SelectItem>
</Select>
```

React Aria also accepts `value` / `onChange` on some versions; `selectedKey` / `onSelectionChange` is the usual collection API. Optional `description`, `errorMessage`, `items` + child render function.

Selected items show an accent checkmark on the right (`ListBoxItem`).

---

## Collections and overlays

### `ListBox` / `ListBoxItem`

Persistent selectable list (not a popup). Wrap in a raised, padded panel.

```tsx
<ListBox
  aria-label="Inboxes"
  selectionMode="single"
  selectedKeys={keys}
  onSelectionChange={setKeys}
  disallowEmptySelection
>
  <ListBoxItem id="inbox">Inbox</ListBoxItem>
  <ListBoxItem id="sent">Sent</ListBoxItem>
</ListBox>
```

Hover/focus uses `elementHover` with **no** background transition. Selected: accent text + trailing ✓.

`textValue` is inferred from string children; pass it when children are not a string.

### `MenuTrigger` / `Menu` / `MenuItem`

Exactly two children: **trigger**, then **menu**. The trigger should be focusable.

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

### `CollectionPopover`

Shared RAC `Popover` for Select and Menu. Default `placement="bottom start"`, `offset={6}`, min-width = trigger width, max-height 280px, `shadow.strong`. Use it for a custom collection overlay.

### `Tooltip`

Wraps the trigger in an inline-block `<span>`. Child should contain something focusable.

```tsx
<Tooltip content="Previous" placement="top" delay={500}>
  <Button variant="quiet" aria-label="Previous">
    <ChevronLeft size="sm" />
  </Button>
</Tooltip>
```

`placement`: `top` | `bottom` | `left` | `right`. Adjacent tooltips skip enter animation (warm group); only the first/last animate.

### `Overlay`

Full-viewport portal. `onClickOutside` fires when the backdrop itself is the mousedown target.

```tsx
{open && (
  <Overlay onClickOutside={() => setOpen(false)}>
    {/* centered panel */}
  </Overlay>
)}
```

### `Dialog`

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

---

## Display

### `Avatar`

Initials from `name` (first letters of up to two words). `size` matches `TextSize` (default `sm` = 18px). Color is hashed from the name (accent / green / orange / pink). `aria-hidden`.

```tsx
<Avatar name="Maya Chen" size="lg" />
```

### `Badge`

Compact pill count/status (`grayAlpha[3]`, 18px tall, tabular nums). Children are the label.

```tsx
<Badge>12</Badge>
```

### `Code` / `Kbd` / `CodeBlock`

```tsx
<Code>proseMaxWidth</Code>
<Kbd>⌘</Kbd><Kbd>K</Kbd>
<CodeBlock lang="ts">{`const n = 1`}</CodeBlock>
```

`CodeBlock` highlights with Shiki using the resolved theme. `lang` is required. Unsupported langs / pending highlight render a plain `<pre>`.

### `Table`

React Aria table. Columns live **directly** in `TableHeader` (no header `TableRow`).

```tsx
<Table aria-label="Invoices">
  <TableHeader>
    <TableHead isRowHeader>Invoice</TableHead>
    <TableHead>Status</TableHead>
    <TableHead align="end">Amount</TableHead>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id} id={row.id}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell align="end">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow id="total">
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell align="end">$2,500.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
<TableCaption>Recent invoices.</TableCaption>
```

Rules:

- Mark the identifying column with `isRowHeader` (name/id, not a checkbox).
- `align` on `TableHead` / `TableCell`: `"start"` | `"center"` | `"end"`.
- Selection is **opt-in**. Without `selectionMode`, rows do not highlight on hover.
- `selectionMode="multiple"` inserts a leading checkbox column (select-all in the header). Hover/selected washes follow `data-selection-mode`.
- `TableBody` default empty state is “No results.” Pass `renderEmptyState`.
- Put `TableCaption` **after** `Table` (often inside a `<figure>`).
- `TableFooter` uses `gray[2]`.

### `FuzzyString`

Renders highlight segments. **Not a plain string.**

```tsx
type FuzzyMatch = Array<{ match: string } | { skip: string }>

<FuzzyString match={[{ skip: "Em" }, { match: "ail" }, { skip: " client" }]} />
```

Matched spans use `accent[11]`. The matcher is **not** on the package barrel — build `{ match | skip }[]` in the app (first matching subsequence is enough). Drop items that do not match; sort by a score if you have one.

### `Thinking`

3×3 Game of Life, text-sized. `size` is a CSS length (default `1em`). `variant`: `"primary"` (currentColor) | `"accent"` | `"muted"`.

```tsx
<Flex row alignItems="center" gap={4}>
  <Thinking size="0.75em" variant="muted" />
  <Text size="xs" color="lowContrast">Thinking</Text>
</Flex>
```

### `Crossfade`

When `contentKey` changes, the previous view fades out along `direction`, then the next view fades in from the opposite side. Sequential (`mode="wait"`). Offset is spacing step 6.

```tsx
<Crossfade direction="up" contentKey={label}>
  <Text>{label}</Text>
</Crossfade>
```

- `direction` is required: `"up" | "down" | "left" | "right"`.
- `contentKey` is required. **Do not** put `key` on `Crossfade` itself or the exit is skipped.
- Reduced motion: opacity only.

### `LoadingScreen`

Fills available width and height (`flex: 1`, `width/height: 100%`). Centered `Thinking` (accent, `0.8em`).

```tsx
<LoadingScreen />
<LoadingScreen progressLabel="Indexing files" />
```

| First paint | Later `progressLabel` |
| --- | --- |
| Label present | Thinking + label fade in together. Later labels Crossfade `up`. Missing `...` / `…` is appended |
| No label | Thinking waits **2s**, then fades in. A label before 2s fades both in immediately. A label after 2s animates in and shifts Thinking so the pair stays centered |

`role="status"` `aria-busy` `aria-live="polite"`.

### `navigationItem`

Style object (not a component) for current-page nav rows: sm text, `radius.sm`, hover `elementHover`, `[aria-current="page"]` accent + weight 500. Used by the Sidebar recipe.

---

## Icons

```ts
import { Search, Plus, ChevronLeft } from "maui"
import { Text as TextIcon, Badge as BadgeIcon } from "maui/icons"
```

Root-export collisions (use the `*Icon` alias from `"maui"`, or the original name from `"maui/icons"`):

`BadgeIcon`, `BlockquoteIcon`, `CodeIcon`, `H1Icon`, `H2Icon`, `H3Icon`, `LinkIcon`, `MenuIcon`, `PaddingIcon`, `SearchFieldIcon`, `SwitchIcon`, `TextIcon`.

Avoid `import { Icons } from "maui"` in app code — it pulls the full set. The JSX editor catalog uses `Icons.*` because every icon is in scope.

`IconProps`: SVG props + `size?: TextSize` (default `sm`).
