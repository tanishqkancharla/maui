import { createIcon } from "./createIcon"

export const TextSparkleShape = createIcon('TextSparkleShape', function TextSparkleShape(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15.25 9.53V8.75H8.75V9.53M12 8.75V15.25M12 15.25H11.35M12 15.25H12.65M12.2883 6.25411C9.5655 4.59377 6.89638 4.22714 5.56176 5.56176C3.72259 7.40094 5.11414 11.7744 8.66988 15.3301C12.2256 18.8859 16.5991 20.2774 18.4382 18.4382C19.7706 17.1059 19.4075 14.4436 17.7543 11.7256M18 4.75L17.6428 5.6428L16.75 5.99994L17.6428 6.35707L18 7.25L18.3572 6.35708L19.25 5.99994L18.3571 5.64277L18 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
