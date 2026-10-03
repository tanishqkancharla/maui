# Tab bar

Gallery: `/components/tab-bar`. Import from `"maui"`.

`TabBar` is a controlled, horizontally scrollable workspace tab toolbar. The selected tab uses Maui’s default outlined `Button` treatment. Unselected tabs are quiet and separated by hairlines. Optional icons, closing, adding, and dragging are built in.

```tsx
const [selectedId, setSelectedId] = useState("changes")

<TabBar
  aria-label="Workspace tabs"
  items={[
    { id: "changes", label: "Changes", icon: <FileText />, isDraggable: true },
    { id: "pull-request", label: "PR #34", icon: <GitPullRequest />, isClosable: true, isDraggable: true },
  ]}
  selectedId={selectedId}
  onSelectionChange={setSelectedId}
  onClose={(id) => closeTab(id)}
  onReorder={(activeId, overId) => reorder(activeId, overId)}
  onAdd={() => addTab()}
  addLabel="New session"
/>
```

| Prop | Notes |
| --- | --- |
| `items` | `{ id, label, icon?, isClosable?, isDraggable? }[]` |
| `selectedId` | Controlled selected item ID |
| `onSelectionChange` | Called when a tab is pressed or selected with the keyboard |
| `onClose` | Enables a close control for every item where `isClosable` is true. Selected tabs show it persistently; unselected tabs reveal it on hover |
| `onReorder` | When set, tabs accept drops: called with the dragged id and the tab it was dropped on |
| `onItemDragStart` / `onItemDragEnd` | Fire for tabs marked `isDraggable`. Use `onItemDragStart` to set `dataTransfer` when dragging onto a caller-owned target (e.g. moving a tab into another pane) |
| `onAdd` | Shows an icon-only add button |
| `addLabel` | Accessible add-button label; defaults to `"New tab"` |
| `aria-label` | Required accessible label for the tab toolbar |

Tabs marked `isDraggable` are HTML drag sources (the dragged tab dims). Provide `onReorder` for within-bar reordering, `onItemDragStart`/`onItemDragEnd` to drive an external drop target, or both. When `onReorder` is not set, the bar leaves drops to bubble to an ancestor.

Left/Right arrows wrap through tabs (and respect RTL). Home/End select the first/last tab. Delete or Backspace calls `onClose` for a selected closable tab.
