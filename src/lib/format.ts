// Formatting helpers shared by server and client code.
//
// Kept free of server-only imports on purpose: page components import from here,
// while `#lib/server/*` must never reach the browser bundle.

/** Appwrite stores full ISO datetimes; the UI only ever shows the date. */
export const toDate = (value?: string | null) => (value ? value.slice(0, 10) : '');

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
] as const;

/** '2026-08-27' → '27 Aug 2026'. Blank for anything that is not a date. */
export const formatDate = (value?: string | null) => {
	const iso = toDate(value);
	if (!iso) return '';
	const [year, month, day] = iso.split('-').map(Number);
	if (!year || !month || !day) return '';
	return `${day} ${MONTHS[month - 1]} ${year}`;
};

/** "1234567" → "12.1 MB"; compact and unit-aware for file listings. */
export const fileSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`;
	const units = ['KB', 'MB', 'GB'];
	let size = bytes / 1024;
	let unit = 0;
	while (size >= 1024 && unit < units.length - 1) {
		size /= 1024;
		unit++;
	}
	return `${Math.round(size * 10) / 10} ${units[unit]}`;
};
