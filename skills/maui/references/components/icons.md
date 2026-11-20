# Icons

Gallery: `/components/icons`. Import named icons from `"maui"` or `"maui/icons"`.

```ts
import { Search, Plus, ChevronLeft } from "maui"
import { Text as TextIcon, Badge as BadgeIcon } from "maui/icons"
```

Root-export collisions (use the `*Icon` alias from `"maui"`, or the original name from `"maui/icons"`):

`BadgeIcon`, `BlockquoteIcon`, `CodeIcon`, `H1Icon`, `H2Icon`, `H3Icon`, `LinkIcon`, `MenuIcon`, `PaddingIcon`, `SearchFieldIcon`, `SwitchIcon`, `TextIcon`.

Avoid `import { Icons } from "maui"` in app code — it pulls the full set. The JSX editor catalog uses `Icons.*` because every icon is in scope.

`IconProps`: SVG props + `size?: TextSize` (default `sm`). Size matches the text t-shirt scale (`2xs`–`xl`). Stroke and fill use `currentColor`.

For brand icons where appropriate, such as Google or GitHub sign-in buttons, use artwork from [SVGL](https://svgl.app/). Preserve the brand's fills and viewBox rather than converting it to Maui's current-color stroke style. Render the custom SVG directly beside the Button label, with explicit dimensions and `aria-hidden="true"` when the label already names the provider; no Maui icon wrapper or special Button prop is needed.
