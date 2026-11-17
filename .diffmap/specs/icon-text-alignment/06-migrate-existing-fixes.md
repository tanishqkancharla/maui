# Migrate existing fixes

[`capCenter`](03-text-cap-center.md), [`size="line"`](04-button-line-size.md) and [`lineBox`](05-icon-line-box.md) are the shared pieces. This page replaces the five copies listed in [Maui history](01-why-its-hard.md#maui-history-five-ad-hoc-fixes).

**Today**

- Four copies of the trim in Maui, each with hand-tuned spacing, plus one in diffmap.
- `TabBar` undoes the Button label trim with `textBox: normal` `[[src/components/TabBar.tsx#L119-L131]]`.

**Proposed**

| Where | Change |
| --- | --- |
| Button label `[[src/components/Button.tsx#L103-L107]]` | `text({ capCenter })`. Check that padding still gives 28px. |
| Avatar `[[src/components/Avatar.tsx#L92-L98]]` | Keep the trim: no line box, so it centers in a fixed circle. Add a comment linking `capCenter`. |
| Calendar mini day `[[src/apps/Calendar/Calendar.tsx#L1465-L1476]]` | Same as Avatar. |
| Banner `[[src/components/Banner.tsx#L59-L74]]` | Icon uses `iconStyles.lineBox`. Text inset unchanged. |
| TabBar | Drop the `textBox: normal` override if the Button label change makes it unnecessary. |
| diffmap `CommentCard` | `Text capCenter` + `Button size="line"`. Delete the selector overrides. |

- One gallery screenshot per component, before and after, light and dark.
- Pixel-diff the Button gallery: expect no visible change at 28px.

```changes

```
