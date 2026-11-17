type MatchItem = { match: string } | { skip: string };

export type FuzzyMatch = MatchItem[];

function eq(a: string, b: string) {
	return a.toLowerCase() === b.toLowerCase();
}

function fuzzyMatchHelper(
	query: string,
	text: string,
	qi: number = 0,
	ti: number = 0
): FuzzyMatch | undefined {
	if (query === "") {
		return [{ skip: text }];
	}

	if (ti >= text.length || qi >= query.length) {
		// If we didn't get through the queryText, this is not a match.
		if (qi < query.length) {
			return undefined;
		}

		// Skip the rest of the text.
		if (ti < text.length) {
			return [{ skip: text.slice(ti) }];
		}

		return [];
	}

	const textChar = text[ti];
	const queryChar = query[qi];
	if (textChar === undefined || queryChar === undefined) {
		return undefined;
	}

	// Greedily match this character.
	if (eq(textChar, queryChar)) {
		const item = { match: textChar };
		const rest = fuzzyMatchHelper(query, text, qi + 1, ti + 1);
		if (rest) {
			// Its possible that greedy matching doesn't work.
			// For example: query: "abcd", text: "abc bcd"
			return [item, ...rest];
		}
	}

	if (!/\w/.test(textChar)) {
		// If this is a symbol, then skip.
		const item = { skip: textChar };
		const rest = fuzzyMatchHelper(query, text, qi, ti + 1);
		if (rest) {
			return [item, ...rest];
		}
	}

	// Skip the rest of the word as well.
	const skip: FuzzyMatch = [{ skip: textChar }];
	let i = ti + 1;
	while (i < text.length) {
		const nextChar = text[i];
		if (nextChar === undefined || !/\w/.test(nextChar)) {
			break;
		}
		skip.push({ skip: nextChar });
		i++;
	}

	const rest = fuzzyMatchHelper(query, text, qi, i);
	if (rest) {
		return [...skip, ...rest];
	}
}

function isMatch(matchItem: MatchItem): matchItem is { match: string } {
	return "match" in matchItem;
}

export function fuzzyMatchScore(query: string, text: string) {
	const match = fuzzyMatch(query, text);
	if (!match) return 0;

	const matchingLetters = match.reduce((score, current) => {
		if (isMatch(current)) {
			return score + current.match.length;
		}
		return score;
	}, 0);

	const normalizedScore = (matchingLetters * 2) / (query.length + text.length);

	return normalizedScore;
}

export function fuzzyMatch(query: string, text: string) {
	const result = fuzzyMatchHelper(query, text);
	if (result) return reduceMatches(result);
}

function reduceMatches(items: FuzzyMatch): FuzzyMatch {
	const reduced: FuzzyMatch = [];
	for (const item of items) {
		const last = reduced[reduced.length - 1];
		if (last !== undefined && "match" in last && "match" in item) {
			reduced[reduced.length - 1] = {
				match: last.match + item.match,
			};
			continue;
		}
		if (last !== undefined && "skip" in last && "skip" in item) {
			reduced[reduced.length - 1] = {
				skip: last.skip + item.skip,
			};
			continue;
		}
		reduced.push(item);
	}
	return reduced;
}
