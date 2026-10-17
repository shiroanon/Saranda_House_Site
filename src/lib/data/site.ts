// Site-wide navigation and shared content.
// Ported from https://saranda.iitmbs.org

export type NavItem = {
	href: string;
	text: string;
	children?: { href: string; text: string }[];
};

export const siteName = 'Saranda';
export const siteTagline = 'The House of Excellence and Innovation';
export const siteDescription =
	'Saranda, The House of Excellence and Innovation, is one of the 12 student houses in the IIT Madras BS degree program.';

export const nav: NavItem[] = [
	{ href: '/', text: 'Home' },
	{ href: '/know_us', text: 'Know Us' },
	{ href: '/events', text: 'Events' },
	{ href: '/meetups', text: 'Meet Ups' },
	{
		href: '/community/tech',
		text: 'Communities',
		children: [
			{ href: '/community/tech', text: 'Tech' },
			{ href: '/community/esports', text: 'eSports' },
			{ href: '/community/culturals', text: 'Culturals' }
		]
	},
	{ href: '/links', text: 'Links' }
];

export const quickLinks: { href: string; text: string }[] = [
	{ href: '/', text: 'Home' },
	{ href: '/know_us', text: 'Know Us' },
	{ href: '/events', text: 'Events' },
	{ href: '/meetups', text: 'Meet Ups' },
	{ href: '/newsletter', text: 'Newsletter' },
	{ href: '/community/tech', text: 'Tech Community' },
	{ href: '/community/esports', text: 'eSports Community' },
	{ href: '/community/culturals', text: 'Culturals Community' }
];

export const contacts = [
	{ text: 'saranda-webad@ds.study.iitm.ac.in', href: 'mailto:saranda-webad@ds.study.iitm.ac.in' }
];

export const socials = [
	{ text: 'Instagram', href: 'https://www.instagram.com/iitm_saranda/' },
	{ text: 'LinkedIn', href: 'https://www.linkedin.com/company/saranda-house/' },
	{ text: 'YouTube', href: 'https://www.youtube.com/@saranda_iitm' },
	{ text: 'Feedback', href: 'https://forms.gle/JWsknX1ignCWzywK6' }
];

// House "Other Useful Links" — handbooks and grading documents.
export const usefulLinks: { title: string; url: string }[] = [
	{
		title: 'Student Handbook',
		url: 'https://docs.google.com/document/d/e/2PACX-1vSBP6TJyZDklGPMyRtTwQc1cWZKOrozsOy5qmBwB8awTFvBbPN33-IxUV2WYupNdlXQOCgKwV9fDQKq/pub'
	},
	{
		title: 'Non Academic & Academic Guidelines',
		url: 'https://docs.google.com/document/u/1/d/1N5ZmPJZUDHznjt6G_ZiRS1baG_WpOfJM-oFnvWve76Y/pub'
	},
	{
		title: 'IITM BS Regional Reference',
		url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQB0J-AZCo9UT2BR76Q8h_gPsqDZmz2XR7iAAXGSyc5s2EQ-pqve270nitkFrcFSaW5DH8d8j0uVHrf/pubhtml'
	},
	{
		title: 'Student Interaction Guidelines',
		url: 'https://docs.google.com/document/u/1/d/1eSfJLWW-SChkbMkxMWnmWILx0bUY7PfRChwaAw0KJbE/pub'
	},
	{
		title: 'Grading Document (Sep 2025 - DS)',
		url: 'https://docs.google.com/document/d/e/2PACX-1vSBP6TJyZDklGPMyRtTwQc1cWZKOrozsOy5qmBwB8awTFvBbPN33-IxUV2WYupNdlXQOCgKwV9fDQKq/pub'
	},
	{
		title: 'BS ES - Student Handbook',
		url: 'https://docs.google.com/document/d/e/2PACX-1vSD1ldcEz7GatzyEJyMkQMZmSyf4INBZ8AlD3b8SV8jksl7HgYyKqOsR5QjuVYz8A/pub'
	}
];

// Local decorative assets (from /static/media/site).
export const assets = {
	logo: '/media/site/saranda_logo.e7bbe2ef.webp',
	iitmLogo: '/media/site/iitm_logo.d26c79e3.webp',
	forestBack: '/media/site/lush-forest-back.55f0a252.webp',
	forestFront: '/media/site/lush-forest-front.95f59211.webp',
	mist1: '/media/site/mist_forest1.25b52791.webp',
	mist2: '/media/site/mist_forest2.21b90b39.webp',
	loneTree: '/media/site/lone_tree.7cc6d0ce.webp',
	woodPlank: '/media/site/wooden_plank.74bacbca.webp',
	woodPlank2: '/media/site/wooden_plank2.70eae95d.webp',
	bg3: '/media/site/bg3.f60ad93b.webp',
	placeholder: '/media/site/person_placeholder.a50c5a46.webp'
};
