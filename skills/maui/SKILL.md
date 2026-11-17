---
name: maui
description: Conventions for installing, updating, and consuming the Maui design system. Use when changing the Maui package or building UI with Maui tokens, components, patterns, or purse-styles.
---

# Maui

- When installing or updating the Maui package, read [installing_maui.md](references/installing_maui.md).
- For Maui UI work, read [design_conventions.md](references/design_conventions.md) and all matching references below.

Use Maui components. When one can't do what you need, build from the matching `react-aria-components` element with that component's exported styles (`buttonStyles`, `listBoxStyles`, …).

## Foundation

- [Tokens](references/tokens.md) — `purse-styles`, motion, layout, theme.

## Interactions

- [Pressable](references/interactions/pressable.md) — custom press handling and trigger targets.

## Components

- [Avatar](references/components/avatar.md)
- [Badge](references/components/badge.md)
- [Banner](references/components/banner.md)
- [Buttons](references/components/buttons.md) — `Button`, `Overlay`, `Dialog`.
- [Tab bar](references/components/tab-bar.md)
- [Drawer](references/components/drawer.md)
- [Prose](references/components/prose.md) — `Prose`, `H1`–`H4`, `P`, lists, `Label`, `Link`.
- [Editor / MarkdownEditor](references/components/editor.md) — optional TipTap peers; separate imports.
- [Thinking](references/components/thinking.md)
- [Activity indicator](references/components/activity-indicator.md)
- [Crossfade](references/components/crossfade.md)
- [Loading screen](references/components/loading-screen.md)
- [Text](references/components/text.md)
- [Form controls](references/components/form-controls.md)
- [Select](references/components/select.md)
- [List box](references/components/list-box.md)
- [Table](references/components/table.md)
- [Menu / context menu](references/components/menu.md)
- [Tooltip](references/components/tooltip.md)
- [Layout utilities](references/components/layout-utilities.md)
- [FuzzyString](references/components/fuzzy-string.md)
- [Icons](references/components/icons.md)
- [Code](references/components/code.md)

## Patterns

- [Inbox](references/patterns/inbox.md) — mail thread list with unread dot, hover actions, selection.
- [Message list](references/patterns/message-list.md) — thread of raised message cards (avatar + Prose body).
- [Assistant message](references/patterns/assistant-message.md) — streaming markdown reply (Streamdown + Maui prose + CodeBlock).
- [Sidebar](references/patterns/sidebar.md) — 240px nav: sections, active item, optional icon and trailing badge.

## Apps

- [Calendar](references/apps/calendar.md) — three-pane schedule (mini month, week grid, event details).
- [Email client](references/apps/email-client.md) — two-pane inbox + reading pane.
- [AI chat](references/apps/ai-chat.md) — mock streaming chat (MarkdownEditor + AssistantMessage + Thinking).
