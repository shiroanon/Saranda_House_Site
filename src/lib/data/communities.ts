// Community pages (tech / esports / culturals).
// Curated from a crawl of https://saranda.iitmbs.org

export type CommunityEvent = {
	name: string;
	description: string;
};

export type Community = {
	slug: string;
	title: string;
	intro: string;
	joinUrl: string;
	events: CommunityEvent[];
	images: string[];
};

export const communities: Record<string, Community> = {
	tech: {
		slug: 'tech',
		title: 'Tech Community',
		intro:
			'Connect with a network of builders, analysts, and innovators. Join our specialized tracks to share knowledge, solve problems, and stay ahead of the curve.',
		joinUrl: 'https://forms.gle/45MYpnUp6B7zjfRy6',
		events: [],
		images: ['/media/sanity/34778041c4522d71e1a76220458d09ad2b6de721-6001x4001.webp']
	},
	esports: {
		slug: 'esports',
		title: 'eSports Community',
		intro:
			"Saranda's eSports Community is where we encourage the skills to compete, work together and share a common interest in the finest games such as Valorant, BGMI and others. You can be a casual or an avid gamer, our community is a colorful setting in which you can display your talent and meet super-awesome friends. We are hoping to create a vibrant arena, where there will be talent development, meet ups of gamers and abundant gaming opportunities in house.",
		joinUrl: 'https://forms.gle/tDamYcaevwRNhkEr8',
		events: [
			{
				name: 'Chess',
				description:
					'Test your speed, strategy, and nerves in our thrilling online blitz chess tournament. Players from all skill levels are invited to compete in fast-paced matches where every second counts. Join the action on Chess.com, showcase your tactical skills, and climb the leaderboard in real time.'
			},
			{
				name: 'FreeFire',
				description:
					'Show your skills and dominate the battleground in our online Freefire competition. Teams and solo players compete in fast paced matches testing strategy, reflexes, and survival instincts. Join players from around the globe for an exciting series of rounds, showcase your gameplay, and rise through the ranks. Experience intense action, thrilling victories, and digital camaraderie all from the comfort of your home.'
			},
			{
				name: 'BGMI',
				description:
					'Gear up for action and teamwork in our online BGMI competition. Players and squads battle it out in high octane matches testing strategy, skill, and coordination. Join competitors from across the world, climb the leaderboard, and prove your mastery on the battlefield. Engage in thrilling gameplay, epic moments, and a community of passionate gamers all from your own space.'
			}
		],
		images: [
			'/media/sanity/4b34956552da8a8666c2e762ced1a24472108ccc-1024x1024.webp',
			'/media/sanity/6b1ba6bf12d2efabb7fdf83acd95b1e48ee9b424-1024x1024.webp',
			'/media/sanity/2f0b16dce92eea402f134537ceb7080387d6000a-1024x1024.webp',
			'/media/sanity/5c164f732a442e8f6fa519243831b026ca0d64d2-1024x1024.webp'
		]
	},
	culturals: {
		slug: 'culturals',
		title: 'Culturals Community',
		intro:
			"Saranda House Culturals at IITM BS, dedicated to foster creativity, talent, and cultural expression. As a hub for artistic pursuits, it organizes diverse events and competitions, ranging from music and dance to drama and art, promoting inclusivity and collaboration. Saranda Culturals plays a pivotal role in uniting members through cultural celebrations, showcasing the house's spirit of excellence and innovation.",
		joinUrl: 'https://forms.gle/5TGTUvmmNv29XoFcA',
		events: [
			{
				name: 'Open Mic',
				description:
					'Step into our virtual spotlight and share your talent with the world. Whether you sing, play, recite poetry, tell stories, or make people laugh, this open mic welcomes all creative souls.'
			},
			{
				name: 'Poetry Night',
				description:
					'Lose yourself in an evening where words dance and emotions take form. Whether you are a seasoned poet or a first-time writer, step forward and let your verses flow. Listen to stories woven in rhyme, feel the rhythm of heartfelt confessions, and celebrate the power of poetry to connect hearts and minds. This night is for every soul that finds beauty in expression.'
			},
			{
				name: 'Music Night',
				description:
					'Let the melodies take over as we celebrate the universal language of rhythm and harmony. From soulful solos to energetic performances, every note tells a story. Bring your instrument, your voice, or simply your love for music and join an evening filled with beats, emotions, and pure artistic vibes. Whether you perform or just enjoy the tunes, this night promises to strike the right chord in every heart.'
			}
		],
		images: [
			'/media/sanity/2573d0d2e80d094e2b867dd7936a5229ea96cb1c-1024x1024.webp',
			'/media/sanity/eb0b96c79de907fb7fe582dceee0972483e2474e-2380x2380.webp',
			'/media/sanity/85b2ae15865bf766f15791d69e707091dc174e7d-2380x2380.webp',
			'/media/sanity/164eb6c14e7357dde004d352a7c55947ab730222-2380x2380.webp'
		]
	}
};
