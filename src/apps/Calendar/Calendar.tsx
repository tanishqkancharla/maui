import {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
	type RefObject,
} from "react"
import { style, useStyles, defineVars } from "purse-styles"
import {
	green as greenLight,
	greenDark,
	orange as orangeLight,
	orangeDark,
	pink as pinkLight,
	pinkDark,
} from "@radix-ui/colors"
import { Avatar } from "../../components/Avatar"
import { Button } from "../../components/Button"
import { Kbd } from "../../components/Code"
import { Icons } from "../../components/Icons"
import { SearchField, TextField } from "../../components/Input"
import { Select, SelectItem } from "../../components/Select"
import { Tooltip } from "../../components/Tooltip"
import { FuzzyString } from "../../components/FuzzyString"
import { background, backgroundColor } from "../../tokens/background"
import { borderColor } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { focusRing } from "../../tokens/focusRing"
import { flex, flexItem } from "../../tokens/layout"
import { motion } from "../../tokens/motion"
import { radius } from "../../tokens/radius"
import { shadow } from "../../tokens/shadow"
import { DARK_THEME } from "../../theme/dataTheme"
import { icon } from "../../tokens/sizing"
import { spacing } from "../../tokens/spacing"
import { monospace, text } from "../../tokens/text"
import { memoize } from "../../utils/memoize"
import { fuzzyMatch, fuzzyMatchScore } from "../../utils/fuzzyMatch"
import { randomId } from "../../utils/randomId"

export type EventColor = "accent" | "green" | "orange" | "pink"
export type ViewDays = 1 | 3 | 5 | 7

export type CalendarAccount = {
	id: string
	email: string
	calendars: CalendarSource[]
}

export type CalendarSource = {
	id: string
	name: string
	color: EventColor
}

export type CalendarEvent = {
	id: string
	calendarId: string
	title: string
	date: string
	startMinutes?: number
	endMinutes?: number
	allDay?: boolean
	kind?: "event" | "ooo"
}

const HOUR_HEIGHT = 52
const HOURS = 24
const GRID_HEIGHT = HOUR_HEIGHT * HOURS
const TZ_COL_WIDTH = 36
const GRID_TIME_ZONE = "America/Los_Angeles"
const DISPLAY_TIME_ZONES = ["America/Los_Angeles"] as const
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"]
const VIEW_OPTIONS: { id: ViewDays; label: string }[] = [
	{ id: 1, label: "1 day" },
	{ id: 3, label: "3 days" },
	{ id: 5, label: "5 days" },
	{ id: 7, label: "7 days" },
]

const calendarAccounts: CalendarAccount[] = [
	{
		id: "personal",
		email: "tanishq@gmail.com",
		calendars: [
			{ id: "personal", name: "Personal", color: "accent" },
			{ id: "work", name: "Work", color: "pink" },
			{ id: "ooo", name: "Out of office", color: "orange" },
		],
	},
	{
		id: "family",
		email: "family@icloud.com",
		calendars: [{ id: "family", name: "Family", color: "orange" }],
	},
	{
		id: "partiful",
		email: "partiful.com",
		calendars: [{ id: "partiful", name: "Partiful", color: "green" }],
	},
]

const calendarById = new Map(
	calendarAccounts.flatMap((account) =>
		account.calendars.map((calendar) => [calendar.id, calendar] as const),
	),
)

const defaultEvents: CalendarEvent[] = [
	{
		id: "standup",
		calendarId: "work",
		title: "Standup",
		date: "2026-08-19",
		startMinutes: 9 * 60 + 30,
		endMinutes: 10 * 60,
	},
	{
		id: "deep-work",
		calendarId: "personal",
		title: "Deep work",
		date: "2026-08-19",
		startMinutes: 11 * 60,
		endMinutes: 12 * 60 + 30,
	},
	{
		id: "design-review",
		calendarId: "work",
		title: "Design review",
		date: "2026-08-19",
		startMinutes: 14 * 60,
		endMinutes: 15 * 60,
	},
	{
		id: "yoga",
		calendarId: "personal",
		title: "Yoga",
		date: "2026-08-20",
		startMinutes: 7 * 60 + 30,
		endMinutes: 8 * 60 + 30,
	},
	{
		id: "jonathan-sf",
		calendarId: "work",
		title: "Jonathan @ SF",
		date: "2026-08-25",
		allDay: true,
	},
	{
		id: "lunch-25",
		calendarId: "personal",
		title: "lunch",
		date: "2026-08-25",
		startMinutes: 12 * 60,
		endMinutes: 13 * 60,
	},
	{
		id: "design-sync",
		calendarId: "work",
		title: "Design sync",
		date: "2026-08-25",
		startMinutes: 13 * 60,
		endMinutes: 13 * 60 + 30,
	},
	{
		id: "midweek",
		calendarId: "work",
		title: "Midweek",
		date: "2026-08-26",
		startMinutes: 10 * 60,
		endMinutes: 11 * 60 + 30,
	},
	{
		id: "lunch-26",
		calendarId: "personal",
		title: "lunch",
		date: "2026-08-26",
		startMinutes: 12 * 60,
		endMinutes: 12 * 60 + 45,
	},
	{
		id: "garden-party",
		calendarId: "partiful",
		title: "Garden party",
		date: "2026-08-27",
		startMinutes: 17 * 60,
		endMinutes: 20 * 60,
	},
	{
		id: "friendsgiving",
		calendarId: "partiful",
		title: "Partiful picnic",
		date: "2026-08-28",
		startMinutes: 14 * 60,
		endMinutes: 16 * 60,
	},
	{
		id: "birthday",
		calendarId: "family",
		title: "Maya's birthday",
		date: "2026-08-29",
		allDay: true,
	},
	...["2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28"].map((date) => ({
		id: `ooo-${date}`,
		calendarId: "ooo",
		title: "Out of office",
		date,
		kind: "ooo" as const,
		allDay: true,
	})),
]

type CalendarProps = {
	className?: string
}

export function Calendar({ className }: CalendarProps = {}) {
	const [events, setEvents] = useState(defaultEvents)
	const [selectedDate, setSelectedDate] = useState(() =>
		parseDateKey("2026-08-25"),
	)
	const [focusedMonth, setFocusedMonth] = useState(() =>
		parseDateKey("2026-08-01"),
	)
	const [viewDays, setViewDays] = useState<ViewDays>(5)
	const [selectedEventId, setSelectedEventId] = useState<string | null>(
		"design-sync",
	)
	const [hiddenCalendarIds, setHiddenCalendarIds] = useState<string[]>([])
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [searchQuery, setSearchQuery] = useState("")
	const [meetWith, setMeetWith] = useState("")
	const [now, setNow] = useState(() => new Date())
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const id = window.setInterval(() => setNow(new Date()), 15_000)
		return () => window.clearInterval(id)
	}, [])

	const todayKey = dateKeyFromZoned(now, GRID_TIME_ZONE)
	const nowMinutes = minutesFromZoned(now, GRID_TIME_ZONE)
	const timeZoneLabels = useMemo(
		() => DISPLAY_TIME_ZONES.map((zone) => timeZoneAbbreviation(now, zone)),
		[now],
	)

	const visibleDays = useMemo(
		() => Array.from({ length: viewDays }, (_, index) => addDays(selectedDate, index)),
		[selectedDate, viewDays],
	)
	const visibleKeys = useMemo(
		() => new Set(visibleDays.map(dateKey)),
		[visibleDays],
	)
	const hiddenSet = useMemo(() => new Set(hiddenCalendarIds), [hiddenCalendarIds])

	const visibleEvents = useMemo(
		() =>
			events.filter(
				(event) =>
					visibleKeys.has(event.date) && !hiddenSet.has(event.calendarId),
			),
		[events, hiddenSet, visibleKeys],
	)

	const selectedEvent =
		events.find((event) => event.id === selectedEventId) ?? null

	const monthLabel = visibleDays[0]
		? formatMonthTitle(visibleDays[0], visibleDays[visibleDays.length - 1])
		: ""

	function goToDate(date: Date) {
		setSelectedDate(startOfDay(date))
		setFocusedMonth(startOfMonth(date))
	}

	function goToToday() {
		goToDate(parseDateKey(todayKey))
		scrollToTime(scrollRef.current, nowMinutes)
	}

	function shiftRange(direction: -1 | 1) {
		goToDate(addDays(selectedDate, direction * viewDays))
	}

	function toggleCalendar(id: string) {
		setHiddenCalendarIds((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id],
		)
	}

	function selectEvent(id: string) {
		const event = events.find((item) => item.id === id)
		if (!event) return
		setSelectedEventId(id)
		goToDate(parseDateKey(event.date))
	}

	function createEvent(date: Date, startMinutes: number) {
		const id = `event-${randomId()}`
		const next: CalendarEvent = {
			id,
			calendarId: "personal",
			title: "New event",
			date: dateKey(date),
			startMinutes,
			endMinutes: Math.min(HOURS * 60, startMinutes + 30),
		}
		setEvents((current) => [...current, next])
		setSelectedEventId(id)
	}

	useCalendarHotkeys({
		today: goToToday,
		prev: () => shiftRange(-1),
		next: () => shiftRange(1),
		toggleSidebar: () => setSidebarOpen((open) => !open),
	})

	const didScroll = useRef(false)
	useEffect(() => {
		if (didScroll.current) return
		didScroll.current = true
		scrollToTime(scrollRef.current, nowMinutes)
	}, [nowMinutes])

	const shellClassName = useStyles(
		shellClass,
		sidebarOpen ? shellWithSidebarClass : shellWithoutSidebarClass,
	)
	const iconSmClassName = useStyles(icon("sm"))

	return (
		<div
			className={joinClassNames(shellClassName, className)}
			aria-label="Calendar"
		>
			{sidebarOpen ? (
				<CalendarSidebar
					focusedMonth={focusedMonth}
					selectedDate={selectedDate}
					todayKey={todayKey}
					meetWith={meetWith}
					hiddenCalendarIds={hiddenSet}
					iconClassName={iconSmClassName}
					onMeetWithChange={setMeetWith}
					onToggleSidebar={() => setSidebarOpen(false)}
					onCreateEvent={() => createEvent(selectedDate, 9 * 60)}
					onMonthChange={setFocusedMonth}
					onSelectDate={goToDate}
					onToggleCalendar={toggleCalendar}
				/>
			) : null}

			<section className={useStyles(mainClass)} aria-label="Schedule">
				<header className={useStyles(mainHeaderClass)}>
					<div className={useStyles(mainHeaderStartClass)}>
						{sidebarOpen ? null : (
							<Tooltip content="Show sidebar">
								<Button
									variant="quiet"
									aria-label="Show sidebar"
									onClick={() => setSidebarOpen(true)}
								>
									<Icons.Sidebar className={iconSmClassName} />
								</Button>
							</Tooltip>
						)}
						<h2 className={useStyles(monthTitleClass)}>{monthLabel}</h2>
					</div>
					<div className={useStyles(mainHeaderEndClass)}>
						<Avatar name="Tanishq Kancharla" size="lg" />
						<div className={useStyles(viewSelectWrapClass)}>
							<Select
								aria-label="Calendar view"
								selectedKey={String(viewDays)}
								onSelectionChange={(key) => {
									if (isViewDaysKey(key)) {
										setViewDays(Number(key) as ViewDays)
									}
								}}
							>
								{VIEW_OPTIONS.map((option) => (
									<SelectItem id={String(option.id)} key={option.id}>
										{option.label}
									</SelectItem>
								))}
							</Select>
						</div>
						<Button onClick={goToToday}>Today</Button>
						<Tooltip content="Previous">
							<Button
								variant="quiet"
								aria-label="Previous range"
								onClick={() => shiftRange(-1)}
							>
								<Icons.ChevronLeft className={iconSmClassName} />
							</Button>
						</Tooltip>
						<Tooltip content="Next">
							<Button
								variant="quiet"
								aria-label="Next range"
								onClick={() => shiftRange(1)}
							>
								<Icons.ChevronRight className={iconSmClassName} />
							</Button>
						</Tooltip>
					</div>
				</header>

				<WeekGrid
					days={visibleDays}
					events={visibleEvents}
					todayKey={todayKey}
					nowMinutes={nowMinutes}
					selectedEventId={selectedEventId}
					timeZoneLabels={timeZoneLabels}
					scrollRef={scrollRef}
					onSelectEvent={setSelectedEventId}
					onCreateEvent={createEvent}
				/>
			</section>

			<DetailsPanel
				events={events}
				selectedEvent={selectedEvent}
				searchQuery={searchQuery}
				hiddenCalendarIds={hiddenSet}
				onSearchChange={setSearchQuery}
				onSelectEvent={selectEvent}
			/>
		</div>
	)
}

function CalendarSidebar(props: {
	focusedMonth: Date
	selectedDate: Date
	todayKey: string
	meetWith: string
	hiddenCalendarIds: Set<string>
	iconClassName: string
	onMeetWithChange: (value: string) => void
	onToggleSidebar: () => void
	onCreateEvent: () => void
	onMonthChange: (date: Date) => void
	onSelectDate: (date: Date) => void
	onToggleCalendar: (id: string) => void
}) {
	const sidebarClassName = useStyles(sidebarClass)
	const toolbarClassName = useStyles(sidebarToolbarClass)
	const footerClassName = useStyles(sidebarFooterClass)
	const accountListClassName = useStyles(accountListClass)
	const accountSectionClassName = useStyles(accountSectionClass)
	const accountEmailClassName = useStyles(accountEmailClass)
	const calendarSourceListClassName = useStyles(calendarSourceListClass)

	return (
		<aside className={sidebarClassName} aria-label="Calendar navigation">
			<div className={toolbarClassName}>
				<Tooltip content="Hide sidebar">
					<Button
						variant="quiet"
						aria-label="Hide sidebar"
						onClick={props.onToggleSidebar}
					>
						<Icons.Sidebar className={props.iconClassName} />
					</Button>
				</Tooltip>
				<Tooltip content="New event">
					<Button
						variant="quiet"
						aria-label="New event"
						onClick={props.onCreateEvent}
					>
						<Icons.Plus className={props.iconClassName} />
					</Button>
				</Tooltip>
			</div>

			<MiniCalendar
				month={props.focusedMonth}
				selectedDate={props.selectedDate}
				todayKey={props.todayKey}
				onMonthChange={props.onMonthChange}
				onSelectDate={props.onSelectDate}
			/>

			<TextField
				aria-label="Meet with"
				placeholder="Meet with..."
				value={props.meetWith}
				onChange={props.onMeetWithChange}
			/>

			<div className={accountListClassName}>
				{calendarAccounts.map((account) => (
					<section key={account.id} className={accountSectionClassName}>
						<div className={accountEmailClassName}>{account.email}</div>
						<ul className={calendarSourceListClassName}>
							{account.calendars.map((calendar) => (
								<CalendarSourceRow
									key={calendar.id}
									calendar={calendar}
									visible={!props.hiddenCalendarIds.has(calendar.id)}
									onToggle={() => props.onToggleCalendar(calendar.id)}
								/>
							))}
						</ul>
					</section>
				))}
			</div>

			<div className={footerClassName}>
				<Button variant="quiet">
					<Icons.Plus className={props.iconClassName} />
					Add calendar account
				</Button>
				<Button variant="quiet">
					<Icons.Plus className={props.iconClassName} />
					Add Notion database
				</Button>
			</div>
		</aside>
	)
}

function MiniCalendar(props: {
	month: Date
	selectedDate: Date
	todayKey: string
	onMonthChange: (date: Date) => void
	onSelectDate: (date: Date) => void
}) {
	const cells = useMemo(() => monthCells(props.month), [props.month])
	const selectedKey = dateKey(props.selectedDate)
	const iconSmClassName = useStyles(icon("sm"))
	const calendarClassName = useStyles(miniCalendarClass)
	const headerClassName = useStyles(miniCalendarHeaderClass)
	const navClassName = useStyles(miniCalendarNavClass)
	const weekdayRowClassName = useStyles(miniWeekdayRowClass)
	const weekdayClassName = useStyles(miniWeekdayClass)
	const gridClassName = useStyles(miniGridClass)
	const heading = props.month.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	})

	return (
		<div className={calendarClassName} aria-label={heading}>
			<div className={headerClassName}>
				<div className={navClassName}>
					<Button
						variant="quiet"
						aria-label={`Previous month, ${heading}`}
						onClick={() => props.onMonthChange(addMonths(props.month, -1))}
					>
						<Icons.ChevronLeft className={iconSmClassName} />
					</Button>
					<Button
						variant="quiet"
						aria-label={`Next month, ${heading}`}
						onClick={() => props.onMonthChange(addMonths(props.month, 1))}
					>
						<Icons.ChevronRight className={iconSmClassName} />
					</Button>
				</div>
			</div>
			<div className={weekdayRowClassName}>
				{WEEKDAY_LABELS.map((label, index) => (
					<span key={`${label}-${index}`} className={weekdayClassName}>
						{label}
					</span>
				))}
			</div>
			<div className={gridClassName}>
				{cells.map((cell) => (
					<MiniDayButton
						key={dateKey(cell.date) + String(cell.outside)}
						date={cell.date}
						outside={cell.outside}
						selected={dateKey(cell.date) === selectedKey}
						today={dateKey(cell.date) === props.todayKey}
						onSelect={props.onSelectDate}
					/>
				))}
			</div>
		</div>
	)
}

function MiniDayButton(props: {
	date: Date
	outside: boolean
	selected: boolean
	today: boolean
	onSelect: (date: Date) => void
}) {
	const className = useStyles(
		miniDayClass,
		props.outside && miniDayOutsideClass,
		props.selected && !props.today && miniDaySelectedClass,
		props.today && miniDayTodayClass,
	)

	return (
		<button
			type="button"
			className={className}
			aria-current={props.today ? "date" : undefined}
			aria-pressed={props.selected}
			aria-label={props.date.toLocaleDateString("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
			})}
			onClick={() => props.onSelect(props.date)}
		>
			{props.date.getDate()}
		</button>
	)
}

function CalendarSourceRow(props: {
	calendar: CalendarSource
	visible: boolean
	onToggle: () => void
}) {
	const rowClassName = useStyles(
		sourceRowClass,
		!props.visible && sourceRowHiddenClass,
	)
	const swatchClassName = useStyles(swatchClass(props.calendar.color))
	const iconSmClassName = useStyles(icon("sm"))

	return (
		<li>
			<div className={rowClassName}>
				<span className={swatchClassName} aria-hidden="true" />
				<span className={useStyles(sourceNameClass)}>{props.calendar.name}</span>
				<Button
					variant="quiet"
					aria-label={
						props.visible
							? `Hide ${props.calendar.name}`
							: `Show ${props.calendar.name}`
					}
					aria-pressed={props.visible}
					onClick={props.onToggle}
				>
					<Icons.Eye className={iconSmClassName} />
				</Button>
			</div>
		</li>
	)
}

function WeekGrid(props: {
	days: Date[]
	events: CalendarEvent[]
	todayKey: string
	nowMinutes: number
	selectedEventId: string | null
	timeZoneLabels: string[]
	scrollRef: RefObject<HTMLDivElement | null>
	onSelectEvent: (id: string) => void
	onCreateEvent: (date: Date, startMinutes: number) => void
}) {
	const allDayEvents = props.events.filter(
		(event) => event.allDay && event.kind !== "ooo",
	)
	const timedEvents = props.events.filter(
		(event) => !event.allDay && event.kind !== "ooo",
	)
	const hourOffsets = DISPLAY_TIME_ZONES.map((zone) =>
		hourOffsetFromPrimary(props.days[0] ?? new Date(), zone),
	)

	const columns = `repeat(${props.days.length}, minmax(0, 1fr))`
	const gutterWidth = `${DISPLAY_TIME_ZONES.length * TZ_COL_WIDTH}px`
	const gridTemplate = `${gutterWidth} ${columns}`
	const shellClassName = useStyles(weekShellClass)
	const headerClassName = useStyles(weekHeaderClass)
	const tzHeaderRowClassName = useStyles(tzHeaderRowClass)
	const tzHeaderClassName = useStyles(tzHeaderClass)
	const allDayRowClassName = useStyles(allDayRowClass)
	const allDayLabelClassName = useStyles(allDayLabelClass)
	const weekScrollClassName = useStyles(weekScrollClass)
	const weekBodyClassName = useStyles(weekBodyClass)
	const tzGutterClassName = useStyles(tzGutterClass)

	return (
		<div className={shellClassName}>
			<div className={headerClassName} style={{ gridTemplateColumns: gridTemplate }}>
				<div className={tzHeaderRowClassName}>
					{props.timeZoneLabels.map((label) => (
						<span key={label} className={tzHeaderClassName}>
							{label}
						</span>
					))}
				</div>
				{props.days.map((day) => (
					<DayHeaderCell
						key={dateKey(day)}
						day={day}
						isToday={dateKey(day) === props.todayKey}
					/>
				))}
			</div>

			<div
				className={allDayRowClassName}
				style={{ gridTemplateColumns: gridTemplate }}
			>
				<div className={allDayLabelClassName}>All-day</div>
				{props.days.map((day) => (
					<AllDayCell
						key={dateKey(day)}
						events={allDayEvents.filter((event) => event.date === dateKey(day))}
						selectedEventId={props.selectedEventId}
						onSelectEvent={props.onSelectEvent}
					/>
				))}
			</div>

			<div ref={props.scrollRef} className={weekScrollClassName}>
				<div
					className={weekBodyClassName}
					style={{ gridTemplateColumns: gridTemplate, height: GRID_HEIGHT }}
				>
					<div className={tzGutterClassName}>
						{DISPLAY_TIME_ZONES.map((zone, zoneIndex) => (
							<TimezoneColumn
								key={zone}
								offset={hourOffsets[zoneIndex]}
								showPeriod={zoneIndex === 0}
							/>
						))}
					</div>

					{props.days.map((day) => (
						<DayColumn
							key={dateKey(day)}
							day={day}
							isToday={dateKey(day) === props.todayKey}
							events={timedEvents.filter((event) => event.date === dateKey(day))}
							selectedEventId={props.selectedEventId}
							nowMinutes={props.nowMinutes}
							onSelectEvent={props.onSelectEvent}
							onCreateEvent={props.onCreateEvent}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

function DayHeaderCell(props: { day: Date; isToday: boolean }) {
	const className = useStyles(dayHeaderClass, props.isToday && dayHeaderTodayClass)
	const labelClassName = useStyles(
		dayHeaderLabelClass,
		props.isToday && dayHeaderLabelTodayClass,
	)

	return (
		<div className={className}>
			<span className={labelClassName}>{weekdayShort(props.day)}</span>
			<span className={labelClassName}>{props.day.getDate()}</span>
		</div>
	)
}

function AllDayCell(props: {
	events: CalendarEvent[]
	selectedEventId: string | null
	onSelectEvent: (id: string) => void
}) {
	const className = useStyles(allDayCellClass)

	return (
		<div className={className}>
			{props.events.map((event) => (
				<EventChip
					key={event.id}
					event={event}
					selected={event.id === props.selectedEventId}
					onSelect={() => props.onSelectEvent(event.id)}
				/>
			))}
		</div>
	)
}

function TimezoneColumn(props: { offset: number; showPeriod: boolean }) {
	const columnClassName = useStyles(tzColumnClass)
	const hourClassName = useStyles(tzHourClass)

	return (
		<div className={columnClassName}>
			{Array.from({ length: HOURS }, (_, hour) => (
				<div key={hour} className={hourClassName}>
					{formatHourLabel((hour + props.offset + 48) % 24, props.showPeriod)}
				</div>
			))}
		</div>
	)
}

function DayColumn(props: {
	day: Date
	isToday: boolean
	events: CalendarEvent[]
	selectedEventId: string | null
	nowMinutes: number
	onSelectEvent: (id: string) => void
	onCreateEvent: (date: Date, startMinutes: number) => void
}) {
	const className = useStyles(dayColumnClass, props.isToday && dayColumnTodayClass)
	const nowLineClassName = useStyles(nowLineClass)
	const nowDotClassName = useStyles(nowDotClass)

	return (
		<div
			className={className}
			onClick={(event) => {
				const rect = event.currentTarget.getBoundingClientRect()
				const y = event.clientY - rect.top
				const startMinutes = clamp(
					Math.round(((y / HOUR_HEIGHT) * 60) / 15) * 15,
					0,
					HOURS * 60 - 30,
				)
				props.onCreateEvent(props.day, startMinutes)
			}}
		>
			{props.events.map((event) => (
				<TimedEventBlock
					key={event.id}
					event={event}
					selected={event.id === props.selectedEventId}
					onSelect={() => props.onSelectEvent(event.id)}
				/>
			))}

			<div
				className={nowLineClassName}
				style={{ top: (props.nowMinutes / 60) * HOUR_HEIGHT }}
				aria-hidden="true"
			>
				{props.isToday ? <span className={nowDotClassName} /> : null}
			</div>
		</div>
	)
}

function EventChip(props: {
	event: CalendarEvent
	selected: boolean
	onSelect: () => void
}) {
	const calendar = calendarById.get(props.event.calendarId)
	const className = useStyles(
		chipClass,
		eventColorClass(calendar?.color ?? "accent"),
		props.selected && eventSelectedColorClass(calendar?.color ?? "accent"),
		props.selected && chipExpandedClass,
	)

	return (
		<button
			type="button"
			className={className}
			aria-pressed={props.selected}
			onClick={(event) => {
				event.stopPropagation()
				props.onSelect()
			}}
		>
			{props.event.title}
		</button>
	)
}

function TimedEventBlock(props: {
	event: CalendarEvent
	selected: boolean
	onSelect: () => void
}) {
	const calendar = calendarById.get(props.event.calendarId)
	const start = props.event.startMinutes ?? 0
	const end = props.event.endMinutes ?? start + 30
	const className = useStyles(
		timedEventClass,
		eventColorClass(calendar?.color ?? "accent"),
		props.selected && eventSelectedColorClass(calendar?.color ?? "accent"),
	)

	return (
		<button
			type="button"
			className={className}
			aria-pressed={props.selected}
			style={{
				top: (start / 60) * HOUR_HEIGHT,
				height: Math.max(((end - start) / 60) * HOUR_HEIGHT, 18),
			}}
			onClick={(event) => {
				event.stopPropagation()
				props.onSelect()
			}}
		>
			<span className={useStyles(timedEventTitleClass)}>{props.event.title}</span>
			<span className={useStyles(timedEventTimeClass)}>
				{formatTimeRange(start, end)}
			</span>
		</button>
	)
}

function DetailsPanel(props: {
	events: CalendarEvent[]
	selectedEvent: CalendarEvent | null
	searchQuery: string
	hiddenCalendarIds: Set<string>
	onSearchChange: (value: string) => void
	onSelectEvent: (id: string) => void
}) {
	const matches = useMemo(() => {
		const query = props.searchQuery.trim()
		if (!query) return []
		return props.events
			.filter((event) => event.kind !== "ooo" && !props.hiddenCalendarIds.has(event.calendarId))
			.map((event) => ({
				event,
				score: fuzzyMatchScore(query, event.title),
				match: fuzzyMatch(query, event.title),
			}))
			.filter((item) => item.match)
			.sort((a, b) => b.score - a.score)
			.slice(0, 8)
	}, [props.events, props.searchQuery])

	const selected = props.selectedEvent
	const calendar = selected ? calendarById.get(selected.calendarId) : undefined
	const detailsClassName = useStyles(detailsClass)
	const searchListClassName = useStyles(searchListClass)
	const selectedEventClassName = useStyles(selectedEventClass)
	const selectedTitleClassName = useStyles(selectedTitleClass)
	const selectedTimeClassName = useStyles(selectedTimeClass)
	const selectedDurationClassName = useStyles(selectedDurationClass)
	const selectedCalendarClassName = useStyles(selectedCalendarClass)
	const emptyDetailsClassName = useStyles(emptyDetailsClass)
	const shortcutsClassName = useStyles(shortcutsClass)
	const shortcutsTitleClassName = useStyles(shortcutsTitleClass)
	const iconSmClassName = useStyles(icon("sm"))
	const calendarSwatchClassName = useStyles(
		swatchClass(calendar?.color ?? "accent"),
	)

	return (
		<aside className={detailsClassName} aria-label="Event details">
			<SearchField
				aria-label="Search events"
				placeholder="Search events"
				value={props.searchQuery}
				onChange={props.onSearchChange}
			/>

			{matches.length > 0 ? (
				<ul className={searchListClassName}>
					{matches.map((item) => (
						<SearchMatchRow
							key={item.event.id}
							title={item.match ? <FuzzyString match={item.match} /> : item.event.title}
							meta={formatEventSummary(item.event)}
							onSelect={() => props.onSelectEvent(item.event.id)}
						/>
					))}
				</ul>
			) : null}

			{selected && selected.kind !== "ooo" ? (
				<div className={selectedEventClassName}>
					<div className={selectedTitleClassName}>{selected.title}</div>
					<div className={selectedTimeClassName}>
						{selected.allDay
							? "All day"
							: formatTimeRange(selected.startMinutes ?? 0, selected.endMinutes ?? 0)}
					</div>
					{selected.allDay ? null : (
						<div className={selectedDurationClassName}>
							{formatDuration(selected.startMinutes ?? 0, selected.endMinutes ?? 0)}
						</div>
					)}
					{calendar ? (
						<div className={selectedCalendarClassName}>
							<span className={calendarSwatchClassName} />
							{calendar.name}
						</div>
					) : null}
					<Button>
						Add meeting note
						<Icons.ArrowDown className={iconSmClassName} />
					</Button>
				</div>
			) : (
				<p className={emptyDetailsClassName}>
					Select an event to see details, or click the grid to create one.
				</p>
			)}

			<section className={shortcutsClassName} aria-label="Useful shortcuts">
				<div className={shortcutsTitleClassName}>Useful shortcuts</div>
				<ShortcutRow action="Command menu" keys={["⌘", "K"]} />
				<ShortcutRow action="Go to today" keys={["T"]} />
				<ShortcutRow action="Previous / next" keys={["←", "→"]} />
				<ShortcutRow action="Toggle sidebar" keys={["`"]} />
			</section>
		</aside>
	)
}

function SearchMatchRow(props: {
	title: ReactNode
	meta: string
	onSelect: () => void
}) {
	const itemClassName = useStyles(searchItemClass)
	const titleClassName = useStyles(searchItemTitleClass)
	const metaClassName = useStyles(searchItemMetaClass)

	return (
		<li>
			<button type="button" className={itemClassName} onClick={props.onSelect}>
				<span className={titleClassName}>{props.title}</span>
				<span className={metaClassName}>{props.meta}</span>
			</button>
		</li>
	)
}

function ShortcutRow(props: { action: string; keys: string[] }) {
	const rowClassName = useStyles(shortcutRowClass)
	const keysClassName = useStyles(shortcutKeysClass)

	return (
		<div className={rowClassName}>
			<span>{props.action}</span>
			<span className={keysClassName}>
				{props.keys.map((key) => (
					<Kbd key={key}>{key}</Kbd>
				))}
			</span>
		</div>
	)
}

function useCalendarHotkeys(handlers: {
	today: () => void
	prev: () => void
	next: () => void
	toggleSidebar: () => void
}) {
	const handlersRef = useRef(handlers)
	handlersRef.current = handlers

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			const target = event.target as HTMLElement | null
			if (
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.tagName === "SELECT" ||
					target.isContentEditable)
			) {
				return
			}
			if (event.metaKey || event.ctrlKey || event.altKey) return

			if (event.key === "t" || event.key === "T") {
				event.preventDefault()
				handlersRef.current.today()
			} else if (event.key === "ArrowLeft") {
				event.preventDefault()
				handlersRef.current.prev()
			} else if (event.key === "ArrowRight") {
				event.preventDefault()
				handlersRef.current.next()
			} else if (event.key === "`") {
				event.preventDefault()
				handlersRef.current.toggleSidebar()
			}
		}

		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [])
}

function scrollToTime(node: HTMLDivElement | null, minutes: number) {
	if (!node) return
	node.scrollTop = Math.max(0, (minutes / 60) * HOUR_HEIGHT - HOUR_HEIGHT * 2)
}

function isViewDaysKey(value: unknown): value is "1" | "3" | "5" | "7" {
	return value === "1" || value === "3" || value === "5" || value === "7"
}

function startOfDay(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function startOfMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addDays(date: Date, amount: number) {
	const next = startOfDay(date)
	next.setDate(next.getDate() + amount)
	return next
}

function addMonths(date: Date, amount: number) {
	return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function dateKey(date: Date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${year}-${month}-${day}`
}

function parseDateKey(key: string) {
	const [year, month, day] = key.split("-").map(Number)
	return new Date(year, month - 1, day)
}

function weekdayShort(date: Date) {
	return date.toLocaleDateString("en-US", { weekday: "short" })
}

function formatMonthTitle(start: Date, end: Date) {
	const startMonth = start.toLocaleDateString("en-US", { month: "long" })
	const endMonth = end.toLocaleDateString("en-US", { month: "long" })
	if (start.getFullYear() !== end.getFullYear()) {
		return `${startMonth} ${start.getFullYear()} – ${endMonth} ${end.getFullYear()}`
	}
	if (startMonth !== endMonth) {
		return `${startMonth} – ${endMonth} ${end.getFullYear()}`
	}
	return `${startMonth} ${start.getFullYear()}`
}

function monthCells(month: Date) {
	const first = startOfMonth(month)
	const startOffset = first.getDay()
	const start = addDays(first, -startOffset)
	return Array.from({ length: 42 }, (_, index) => {
		const date = addDays(start, index)
		return {
			date,
			outside: date.getMonth() !== month.getMonth(),
		}
	})
}

function getZonedParts(date: Date, timeZone: string) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hourCycle: "h23",
		timeZoneName: "short",
	}).formatToParts(date)
	const read = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? ""
	const hour = Number(read("hour"))
	return {
		year: Number(read("year")),
		month: Number(read("month")),
		day: Number(read("day")),
		hour: hour === 24 ? 0 : hour,
		minute: Number(read("minute")),
		timeZoneName: read("timeZoneName"),
	}
}

function dateKeyFromZoned(date: Date, timeZone: string) {
	const parts = getZonedParts(date, timeZone)
	return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`
}

function minutesFromZoned(date: Date, timeZone: string) {
	const parts = getZonedParts(date, timeZone)
	return parts.hour * 60 + parts.minute
}

function timeZoneAbbreviation(date: Date, timeZone: string) {
	return getZonedParts(date, timeZone).timeZoneName || timeZone
}

function zonedTimeToDate(
	year: number,
	month: number,
	day: number,
	hour: number,
	timeZone: string,
) {
	const wanted = Date.UTC(year, month - 1, day, hour, 0, 0)
	const guess = new Date(wanted)
	const parts = getZonedParts(guess, timeZone)
	const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, 0, 0)
	return new Date(guess.getTime() + (wanted - asUtc))
}

function hourOffsetFromPrimary(day: Date, timeZone: string) {
	const instant = zonedTimeToDate(
		day.getFullYear(),
		day.getMonth() + 1,
		day.getDate(),
		12,
		GRID_TIME_ZONE,
	)
	return getZonedParts(instant, timeZone).hour - getZonedParts(instant, GRID_TIME_ZONE).hour
}

function formatHourLabel(hour: number, withPeriod: boolean) {
	const h = hour % 12 === 0 ? 12 : hour % 12
	if (!withPeriod) return String(h)
	return `${h}${hour >= 12 ? "PM" : "AM"}`
}

function formatClock(minutes: number, withPeriod: boolean) {
	const hour = Math.floor(minutes / 60)
	const minute = minutes % 60
	const h = hour % 12 === 0 ? 12 : hour % 12
	const time = minute === 0 ? String(h) : `${h}:${String(minute).padStart(2, "0")}`
	if (!withPeriod) return time
	return `${time} ${hour >= 12 ? "PM" : "AM"}`
}

function formatTimeRange(startMinutes: number, endMinutes: number) {
	const startPeriod = startMinutes >= 12 * 60 ? "PM" : "AM"
	const endPeriod = endMinutes >= 12 * 60 ? "PM" : "AM"
	return `${formatClock(startMinutes, startPeriod !== endPeriod)} – ${formatClock(endMinutes, true)}`
}

function formatDuration(startMinutes: number, endMinutes: number) {
	const minutes = Math.max(0, endMinutes - startMinutes)
	if (minutes < 60) return `${minutes} min`
	const hours = Math.floor(minutes / 60)
	const rest = minutes % 60
	if (rest === 0) return hours === 1 ? "1 hr" : `${hours} hr`
	return `${hours} hr ${rest} min`
}

function formatEventSummary(event: CalendarEvent) {
	const date = parseDateKey(event.date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	})
	if (event.allDay) return `${date} · All day`
	return `${date} · ${formatTimeRange(event.startMinutes ?? 0, event.endMinutes ?? 0)}`
}

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value))
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
	return classNames.filter(Boolean).join(" ")
}

const eventHue = {
	green: defineVars({
		3: { default: greenLight.green3, [DARK_THEME]: greenDark.green3 },
		9: { default: greenLight.green9, [DARK_THEME]: greenDark.green9 },
		11: { default: greenLight.green11, [DARK_THEME]: greenDark.green11 },
	}),
	orange: defineVars({
		3: { default: orangeLight.orange3, [DARK_THEME]: orangeDark.orange3 },
		9: { default: orangeLight.orange9, [DARK_THEME]: orangeDark.orange9 },
		11: { default: orangeLight.orange11, [DARK_THEME]: orangeDark.orange11 },
	}),
	pink: defineVars({
		3: { default: pinkLight.pink3, [DARK_THEME]: pinkDark.pink3 },
		9: { default: pinkLight.pink9, [DARK_THEME]: pinkDark.pink9 },
		11: { default: pinkLight.pink11, [DARK_THEME]: pinkDark.pink11 },
	}),
}

const eventPalette: Record<
	EventColor,
	{
		background: string
		foreground: string
		selectedBackground: string
	}
> = {
	accent: {
		background: colors.accent[3],
		foreground: colors.accent[11],
		selectedBackground: colors.accent[9],
	},
	green: {
		background: eventHue.green[3],
		foreground: eventHue.green[11],
		selectedBackground: eventHue.green[9],
	},
	orange: {
		background: eventHue.orange[3],
		foreground: eventHue.orange[11],
		selectedBackground: eventHue.orange[9],
	},
	pink: {
		background: eventHue.pink[3],
		foreground: eventHue.pink[11],
		selectedBackground: eventHue.pink[9],
	},
}

const swatchClass = memoize((color: EventColor) =>
	style(radius.sm, {
		width: "10px",
		height: "10px",
		flexShrink: 0,
		backgroundColor: eventPalette[color].foreground,
	}),
)

const eventColorClass = memoize((color: EventColor) =>
	style({
		backgroundColor: eventPalette[color].background,
		color: eventPalette[color].foreground,
	}),
)

const eventSelectedColorClass = memoize((color: EventColor) =>
	style(text("xs", 500, "onAccent"), {
		backgroundColor: eventPalette[color].selectedBackground,
		"& span": {
			color: "inherit",
		},
	}),
)

const shellClass = style(radius.lg, shadow.subtle, {
	display: "grid",
	width: "100%",
	minWidth: 0,
	minHeight: "640px",
	height: "min(720px, calc(100vh - 220px))",
	overflow: "hidden",
	backgroundColor: backgroundColor.app,
})

const shellWithSidebarClass = style({
	gridTemplateColumns: "196px minmax(0, 1fr) minmax(200px, 220px)",
})

const shellWithoutSidebarClass = style({
	gridTemplateColumns: "minmax(0, 1fr) minmax(200px, 220px)",
})

const sidebarClass = style(
	flex({ direction: "column", gap: 6 }),
	spacing.padding({ all: 4 }),
	background.element,
	shadow.subtle,
	{
		minWidth: 0,
		minHeight: 0,
		overflow: "auto",
		position: "relative",
		zIndex: 1,
	},
)

const sidebarToolbarClass = style(flex({ align: "center", justify: "between" }))

const sidebarFooterClass = style(flex({ direction: "column", align: "start", gap: 1 }), {
	marginTop: "auto",
})

const miniCalendarClass = style(flex({ direction: "column", gap: 3 }))

const miniCalendarHeaderClass = style(flex({ align: "center", justify: "end" }))

const miniCalendarNavClass = style(flex({ align: "center" }))

const miniWeekdayRowClass = style({
	display: "grid",
	gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
})

const miniWeekdayClass = style(text("2xs", 500, "lowContrast"), {
	display: "grid",
	placeItems: "center",
	height: "20px",
})

const miniGridClass = style({
	display: "grid",
	gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
	gap: "2px",
})

const miniDayClass = style(
	text("xs", 400, "highContrast"),
	radius.circle,
	focusRing(),
	motion.standard("background-color", "color"),
	{
		display: "grid",
		placeItems: "center",
		width: "24px",
		height: "24px",
		padding: 0,
		marginInline: "auto",
		lineHeight: 1,
		textBox: "trim-both cap alphabetic",
		border: "none",
		background: "transparent",
		cursor: "default",
		"&:hover": {
			backgroundColor: backgroundColor.elementHover,
		},
	},
)

const miniDayOutsideClass = style({
	color: colors.gray[8],
})

const miniDaySelectedClass = style({
	backgroundColor: colors.grayAlpha[4],
})

const miniDayTodayClass = style(text("xs", 600, "onAccent"), {
	backgroundColor: colors.accent[9],
	"&:hover": {
		backgroundColor: colors.accent[10],
	},
})

const accountListClass = style(flex({ direction: "column", gap: 6 }))

const accountSectionClass = style(flex({ direction: "column", gap: 2 }))

const accountEmailClass = style(text("xs", 500, "lowContrast"), spacing.padding({ x: 2 }))

const calendarSourceListClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
})

const sourceRowClass = style(
	flex({ align: "center", gap: 3 }),
	radius.sm,
	spacing.padding({ x: 2, y: 1 }),
	{
		"& button": {
			opacity: 0,
		},
		"&:hover button, &:focus-within button": {
			opacity: 1,
		},
	},
)

const sourceRowHiddenClass = style({
	opacity: 0.45,
	"& button": {
		opacity: 1,
	},
})

const sourceNameClass = style(text("sm", 400, "highContrast"), flexItem({ size: "fill" }), {
	minWidth: 0,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const mainClass = style(flex({ direction: "column" }), {
	minWidth: 0,
	minHeight: 0,
	backgroundColor: backgroundColor.app,
})

const mainHeaderClass = style(
	flex({ align: "center", justify: "between", gap: 6 }),
	spacing.padding({ x: 8, y: 6 }),
	{
		minWidth: 0,
	},
)

const mainHeaderStartClass = style(flex({ align: "center", gap: 3 }), {
	minWidth: 0,
})

const mainHeaderEndClass = style(flex({ align: "center", gap: 3 }), {
	flexShrink: 0,
})

const monthTitleClass = style(text("xl", 700, "highContrast"), {
	margin: 0,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const viewSelectWrapClass = style({
	width: "108px",
})

const weekShellClass = style(flex({ direction: "column" }), {
	minHeight: 0,
	flex: "1 1 auto",
})

const weekHeaderClass = style({
	display: "grid",
	alignItems: "end",
	borderBottom: `1px solid ${borderColor.border}`,
})

const tzHeaderRowClass = style({
	display: "grid",
	gridTemplateColumns: `repeat(${DISPLAY_TIME_ZONES.length}, ${TZ_COL_WIDTH}px)`,
	paddingBottom: spacing.value(2),
})

const tzHeaderClass = style(text("2xs", 500, "lowContrast"), {
	display: "grid",
	placeItems: "center",
})

const dayHeaderClass = style(
	flex({ direction: "column", align: "center" }),
	spacing.padding({ y: 3 }),
)

const dayHeaderTodayClass = style({
	color: colors.accent[11],
})

const dayHeaderLabelClass = style(text("2xs", 400, "lowContrast"))

const dayHeaderLabelTodayClass = style(text("2xs", 400, "accent"))

const allDayRowClass = style({
	display: "grid",
	alignItems: "start",
	position: "relative",
	zIndex: 2,
	flexShrink: 0,
	overflow: "visible",
	borderBottom: `1px solid ${borderColor.border}`,
	minHeight: "36px",
})

const allDayLabelClass = style(text("2xs", 500, "lowContrast"), spacing.padding({ x: 3, y: 2 }))

const allDayCellClass = style(flex({ direction: "column", gap: 1 }), spacing.padding({ all: 2 }), {
	minWidth: 0,
	overflow: "visible",
	position: "relative",
})

const weekScrollClass = style({
	minHeight: 0,
	flex: "1 1 auto",
	overflow: "auto",
})

const weekBodyClass = style({
	display: "grid",
	position: "relative",
})

const tzGutterClass = style({
	display: "grid",
	gridTemplateColumns: `repeat(${DISPLAY_TIME_ZONES.length}, ${TZ_COL_WIDTH}px)`,
	height: GRID_HEIGHT,
	backgroundImage: `repeating-linear-gradient(to bottom, ${borderColor.border} 0 1px, transparent 1px ${HOUR_HEIGHT}px)`,
})

const tzColumnClass = style({
	display: "flex",
	flexDirection: "column",
})

const tzHourClass = style(text("2xs", 400, "lowContrast"), monospace, {
	height: HOUR_HEIGHT,
	display: "flex",
	alignItems: "flex-start",
	justifyContent: "center",
	paddingTop: "2px",
})

const dayColumnClass = style({
	position: "relative",
	height: GRID_HEIGHT,
	backgroundImage: `repeating-linear-gradient(to bottom, ${borderColor.border} 0 1px, transparent 1px ${HOUR_HEIGHT}px)`,
	cursor: "default",
})

const dayColumnTodayClass = style({
	backgroundColor: colors.accentAlpha[2],
	backgroundImage: `repeating-linear-gradient(to bottom, ${borderColor.border} 0 1px, transparent 1px ${HOUR_HEIGHT}px)`,
})

const nowLineClass = style({
	position: "absolute",
	left: 0,
	right: 0,
	height: "2px",
	backgroundColor: colors.accent[9],
	pointerEvents: "none",
	zIndex: 3,
})

const nowDotClass = style(radius.circle, {
	position: "absolute",
	left: "-5px",
	top: "-4px",
	width: "10px",
	height: "10px",
	backgroundColor: colors.accent[9],
})

const chipClass = style(
	text("xs", 500, "highContrast"),
	radius.sm,
	spacing.padding({ x: 3, y: 1 }),
	focusRing(),
	{
		display: "-webkit-box",
		position: "relative",
		zIndex: 1,
		width: "100%",
		maxWidth: "100%",
		overflow: "hidden",
		overflowWrap: "break-word",
		wordBreak: "normal",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 3,
		border: "none",
		textAlign: "left",
		cursor: "default",
	},
)

const chipExpandedClass = style({
	display: "block",
	WebkitLineClamp: "unset",
	overflow: "visible",
	zIndex: 6,
})

const timedEventClass = style(
	text("xs", 500, "highContrast"),
	radius.sm,
	spacing.padding({ x: 3, y: 1 }),
	focusRing(),
	{
		position: "absolute",
		left: "4px",
		right: "4px",
		zIndex: 2,
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		overflow: "hidden",
		border: "none",
		textAlign: "left",
		cursor: "default",
	},
)

const timedEventTitleClass = style({
	overflowWrap: "anywhere",
	whiteSpace: "normal",
	width: "100%",
})

const timedEventTimeClass = style(text("2xs", 400, "lowContrast"))

const detailsClass = style(
	flex({ direction: "column", gap: 8 }),
	spacing.padding({ all: 8 }),
	background.element,
	shadow.subtle,
	{
		minWidth: 0,
		minHeight: 0,
		overflow: "auto",
		position: "relative",
		zIndex: 1,
	},
)

const searchListClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const searchItemClass = style(
	flex({ direction: "column", align: "start" }),
	radius.sm,
	spacing.padding({ x: 3, y: 2 }),
	focusRing(),
	{
		width: "100%",
		border: "none",
		background: "transparent",
		textAlign: "left",
		cursor: "default",
		"&:hover": {
			backgroundColor: backgroundColor.elementHover,
		},
	},
)

const searchItemTitleClass = style(text("sm", 500, "highContrast"))

const searchItemMetaClass = style(text("xs", 400, "lowContrast"))

const selectedEventClass = style(flex({ direction: "column", align: "start", gap: 3 }))

const selectedTitleClass = style(text("lg", 600, "highContrast"))

const selectedTimeClass = style(text("sm", 400, "highContrast"))

const selectedDurationClass = style(text("xs", 400, "lowContrast"))

const selectedCalendarClass = style(flex({ align: "center", gap: 3 }), text("sm", 400, "lowContrast"))

const emptyDetailsClass = style(text("sm", 400, "lowContrast"), {
	margin: 0,
})

const shortcutsClass = style(flex({ direction: "column", gap: 2 }), {
	marginTop: "auto",
})

const shortcutsTitleClass = style(text("xs", 500, "lowContrast"), {
	marginBottom: spacing.value(2),
})

const shortcutRowClass = style(
	flex({ align: "center", justify: "between", gap: 4 }),
	text("xs", 400, "lowContrast"),
)

const shortcutKeysClass = style(flex({ align: "center", gap: 1 }))
