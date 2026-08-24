import { Avatar } from "../../components/Avatar"
import { Badge } from "../../components/Badge"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/Checkbox"
import { Code, Kbd } from "../../components/Code"
import { CodeBlock } from "../../components/CodeBlock"
import { Dialog } from "../../components/Dialog"
import { FuzzyString } from "../../components/FuzzyString"
import { Icons } from "../../components/Icons"
import {
	NumberField,
	QuietTextField,
	SearchField,
	TextField,
} from "../../components/Input"
import { ListBox, ListBoxItem } from "../../components/ListBox"
import { Menu, MenuItem, MenuTrigger } from "../../components/Menu"
import { Overlay } from "../../components/Overlay"
import { Panel } from "../../components/Panel"
import { Prose } from "../../components/Prose"
import { RadioOption, RadioOptionGroup } from "../../components/Radio"
import { Select, SelectItem } from "../../components/Select"
import { Slider } from "../../components/Slider"
import { Switch } from "../../components/Switch"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "../../components/Table"
import { Text } from "../../components/Text"
import { Tooltip } from "../../components/Tooltip"
import {
	Blockquote,
	H1,
	H2,
	H3,
	H4,
	Label,
	Li,
	Link,
	Ol,
	P,
	Ul,
} from "../../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../../components/Utils"
import { backgroundColor } from "../../tokens/background"
import { borderColor } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { radius } from "../../tokens/radius"
import { spacing } from "../../tokens/spacing"

export type AttributeCompletion = {
	name: string
	info?: string
	values?: string[]
	boolean?: boolean
	object?: boolean
}

export type CatalogComponent = {
	name: string
	info: string
	attributes: AttributeCompletion[]
	html?: boolean
	svg?: boolean
}

const spaceValues = ["1", "2", "3", "4", "6", "8", "12", "16"]
const textSizes = ["2xs", "xs", "sm", "md", "lg", "xl"]
const textWeights = ["400", "500", "600", "700"]
const textColors = ["lowContrast", "highContrast", "accent", "onAccent"]
const alignItems = ["start", "center", "end", "stretch", "baseline"]

export const iconNames = Object.keys(Icons)

export const catalog: CatalogComponent[] = [
	{
		name: "Flex",
		info: "Row or column flex layout. gap and p/px/py/pt/pb are spacing steps, not pixels.",
		attributes: [
			{ name: "row", boolean: true, info: "Horizontal direction" },
			{ name: "column", boolean: true, info: "Vertical direction" },
			{ name: "gap", values: spaceValues, info: "Spacing scale step" },
			{ name: "p", values: spaceValues, info: "Padding on all sides" },
			{ name: "px", values: spaceValues, info: "Horizontal padding" },
			{ name: "py", values: spaceValues, info: "Vertical padding" },
			{ name: "pt", values: spaceValues, info: "Padding top" },
			{ name: "pb", values: spaceValues, info: "Padding bottom" },
			{ name: "alignItems", values: alignItems },
			{
				name: "border",
				values: ["border", "outline", "accent"],
				info: "1px ring. Skipped when shadow is set — shadows already include a ring.",
			},
			{
				name: "shadow",
				values: ["subtle", "medium", "strong"],
				info: "Elevation. Includes a 1px ring; do not also set border.",
			},
			{
				name: "radius",
				values: ["none", "2xs", "xs", "sm", "md", "lg", "pill", "circle"],
			},
			{
				name: "style",
				object: true,
				info: "React style object, e.g. {{ color: 'red' }}",
			},
		],
	},
	{
		name: "Padding",
		info: "Padding box using the spacing scale.",
		attributes: [
			{ name: "xy", values: spaceValues },
			{ name: "x", values: spaceValues },
			{ name: "y", values: spaceValues },
			{ name: "top", values: spaceValues },
			{ name: "right", values: spaceValues },
			{ name: "bottom", values: spaceValues },
			{ name: "left", values: spaceValues },
		],
	},
	{
		name: "Gap",
		info: "Fixed-size spacer. Pass width or height as a spacing step.",
		attributes: [
			{ name: "width", values: spaceValues },
			{ name: "height", values: spaceValues },
		],
	},
	{
		name: "Spacer",
		info: "Flexible spacer that fills remaining space in a Flex.",
		attributes: [],
	},
	{
		name: "Divider",
		info: "Horizontal rule.",
		attributes: [],
	},
	{
		name: "Text",
		info: "Inline span. Type styles are attributes.",
		html: true,
		attributes: [
			{ name: "size", values: textSizes },
			{ name: "fontWeight", values: textWeights },
			{ name: "color", values: textColors },
			{ name: "monospace", boolean: true },
		],
	},
	{
		name: "H1",
		info: "Heading 1. Children are a string.",
		attributes: [],
	},
	{
		name: "H2",
		info: "Heading 2. Children are a string.",
		attributes: [],
	},
	{
		name: "H3",
		info: "Heading 3. Children are a string.",
		attributes: [],
	},
	{
		name: "H4",
		info: "Heading 4. Children are a string.",
		attributes: [],
	},
	{
		name: "P",
		info: "Paragraph.",
		attributes: [],
	},
	{
		name: "Label",
		info: "Form label.",
		html: true,
		attributes: [{ name: "htmlFor" }],
	},
	{
		name: "Blockquote",
		info: "Quoted text. Children are a string.",
		attributes: [],
	},
	{
		name: "Ul",
		info: "Unordered list.",
		attributes: [],
	},
	{
		name: "Ol",
		info: "Ordered list.",
		attributes: [],
	},
	{
		name: "Li",
		info: "List item.",
		attributes: [],
	},
	{
		name: "Link",
		info: "Text link. Children are a string.",
		html: true,
		attributes: [{ name: "href" }],
	},
	{
		name: "Code",
		info: "Inline code.",
		html: true,
		attributes: [],
	},
	{
		name: "Kbd",
		info: "Keyboard key.",
		html: true,
		attributes: [],
	},
	{
		name: "CodeBlock",
		info: "Syntax-highlighted block. Children are a string.",
		attributes: [
			{
				name: "lang",
				values: ["typescript", "tsx", "javascript", "css", "json"],
			},
		],
	},
	{
		name: "Button",
		info: "Button. Optional quiet variant.",
		html: true,
		attributes: [
			{ name: "variant", values: ["default", "quiet"] },
			{ name: "aria-label" },
			{ name: "disabled", boolean: true },
		],
	},
	{
		name: "Badge",
		info: "Compact count or status label.",
		html: true,
		attributes: [],
	},
	{
		name: "Avatar",
		info: "Initials avatar from a name.",
		attributes: [
			{ name: "name" },
			{ name: "size", values: textSizes },
			{ name: "className" },
		],
	},
	{
		name: "Panel",
		info: "Raised preview surface.",
		attributes: [],
	},
	{
		name: "Icons",
		info: "Icon set. Use as <Icons.Plus size=\"sm\" />. The Icons namespace is not tree-shakeable.",
		svg: true,
		attributes: [
			{ name: "size", values: textSizes },
			{ name: "width" },
			{ name: "height" },
			{ name: "className" },
		],
	},
	{
		name: "TextField",
		info: "Text input.",
		html: true,
		attributes: [
			{ name: "placeholder" },
			{ name: "value" },
			{ name: "aria-label" },
		],
	},
	{
		name: "SearchField",
		info: "Search input.",
		html: true,
		attributes: [
			{ name: "placeholder" },
			{ name: "value" },
			{ name: "aria-label" },
		],
	},
	{
		name: "QuietTextField",
		info: "Borderless text input.",
		html: true,
		attributes: [
			{ name: "placeholder" },
			{ name: "value" },
			{ name: "aria-label" },
		],
	},
	{
		name: "NumberField",
		info: "Numeric input.",
		html: true,
		attributes: [
			{ name: "value" },
			{ name: "aria-label" },
		],
	},
	{
		name: "Checkbox",
		info: "Needs checked and setChecked.",
		html: true,
		attributes: [{ name: "label" }, { name: "checked" }],
	},
	{
		name: "Switch",
		info: "Toggle switch.",
		html: true,
		attributes: [{ name: "label" }],
	},
	{
		name: "Slider",
		info: "Range slider.",
		attributes: [],
	},
	{
		name: "Select",
		info: "Select menu. Pair with SelectItem.",
		attributes: [{ name: "label" }, { name: "selectedKey" }],
	},
	{
		name: "SelectItem",
		info: "Select option.",
		attributes: [{ name: "id" }],
	},
	{
		name: "Tooltip",
		info: "Hover tooltip.",
		attributes: [{ name: "label" }],
	},
	{
		name: "Prose",
		info: "Long-form rhythm wrapper for headings and paragraphs.",
		attributes: [],
	},
]

export const previewScope: Record<string, unknown> = {
	Avatar,
	Badge,
	Button,
	Checkbox,
	Code,
	Kbd,
	CodeBlock,
	Dialog,
	FuzzyString,
	Icons,
	NumberField,
	QuietTextField,
	SearchField,
	TextField,
	ListBox,
	ListBoxItem,
	Menu,
	MenuItem,
	MenuTrigger,
	Overlay,
	Panel,
	Prose,
	RadioOption,
	RadioOptionGroup,
	Select,
	SelectItem,
	Slider,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Text,
	Tooltip,
	Blockquote,
	H1,
	H2,
	H3,
	H4,
	Label,
	Li,
	Link,
	Ol,
	P,
	Ul,
	Divider,
	Flex,
	Gap,
	Padding,
	Spacer,
	colors,
	backgroundColor,
	borderColor,
	radius,
	spacing,
}

export const defaultJsx = `<Flex column gap={6}>
  <Flex row gap={4} alignItems="center">
    <Avatar name="Ada Lovelace" size="md" />
    <Flex column gap={1}>
      <Text size="lg" fontWeight={600}>Ada Lovelace</Text>
      <Text size="sm" color="lowContrast">Mathematician</Text>
    </Flex>
    <Spacer />
    <Badge>Active</Badge>
  </Flex>
  <Text color="lowContrast">
    Edit this JSX to compose Maui. Components are in scope — no imports.
  </Text>
  <Flex row gap={3} alignItems="center">
    <Button>
      <Icons.Plus size="sm" />
      Create
    </Button>
    <Button variant="quiet">Cancel</Button>
  </Flex>
</Flex>
`
