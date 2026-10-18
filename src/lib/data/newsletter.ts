// Newsletter editions.
// Generated from a crawl of https://saranda.iitmbs.org/newsletter
//
// An earlier pass cut each blurb at a fixed length, which left every one of them truncated
// mid-word ("…and internship leads for the data-curious. Add a stacked lineup of…" stopped
// at "and e"). These are the full blurbs, with the issue date and the read link the live
// page carries but our data had dropped.

export type Edition = {
	title: string;
	/** The issue date as the house writes it, e.g. `Sept 2026`. */
	date: string;
	/** Full teaser copy. Blank lines separate paragraphs. */
	blurb: string;
	/** Google Drive link to the issue itself. */
	url: string;
};

export const editions: Edition[] = [
	{
		title: 'The Saranda Express — May 2026 Edition',
		date: 'Sept 2026',
		blurb: `🌱 A NEW CHAPTER. NEW BEGINNINGS.

The July–August Edition of the Saranda House Newsletter is here! 💚📖

This issue brings together the voices, creativity and experiences of our Saranda community:

🗣️ Student Voices – conversations, interviews, regional perspectives & milestones
🎨 Creative Corner – poetry, art, photography, articles & snapshots
🚀 Opportunities & Highlights – internships, possibilities & events

From stories that inspire to moments worth remembering, this edition captures the spirit of Saranda — The House of Excellence & Innovation.

✨ New beginnings. Endless possibilities. The story of us.
Do give it a read, share it with your friends, and celebrate the stories of our community! 💚

The July–August Newsletter is OUT! 🎉`,
		url: 'https://drive.google.com/file/d/1_9diWJwqZUizzl8_2gz-52Wmh8D-d9PG/view?usp=sharing'
	},
	{
		title: 'The Saranda Express — January 2026 Edition',
		date: 'May 2026',
		blurb: `This one's got layers. Poetry in Hindi and English swinging from quiet heartbreak to full-blown devotion, reading-desk dives into where data science meets biology and what your phone's quietly doing to your brain, plus a gallery of sketches, portraits, and photography from across the house. Add a fresh batch of internship opportunities, and you've got a term's worth of Saranda's creativity and curiosity packed into one read.`,
		url: 'https://drive.google.com/file/d/1Hq1uumGW_C0mSo4SV0gHlX9ARb34ZzMC/view'
	},
	{
		title: 'The Saranda Express — September 2025 Edition',
		date: 'Dec 2025',
		blurb: `Your all-access pass to what makes Saranda, well, Saranda. Poetry that swings from tender to fiery, reading-desk pieces on everything from India's intelligence future to why we're all terrible at predicting our own happiness, plus the art and photography our community couldn't help but capture. Add a stacked lineup of cultural, technical, and e-sports events, and internship leads for the data-curious. Energy in our halls, unity in our spirit. Read on to see what that looks like.`,
		url: 'https://drive.google.com/file/d/1W_vQmwebCnHPFtVy-ggp7qLxR-oo7NCa/view'
	}
];
