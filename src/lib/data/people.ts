// House council & teams, from https://saranda.iitmbs.org/know_us
// Photos resolve to the media downloaded under /static/media.
//
// Every person's photo is keyed to that person specifically — an earlier pass had
// shifted them by a few slots, so e.g. Neeraj was showing Arham's picture.
//
// The links are the ones each person actually volunteered on the live site, stored as
// bare handles so the file stays readable; `linkHref` turns them into URLs. A card draws
// only the marks a person has, so nobody gets an icon that leads nowhere.
//
// These fields are flat rather than nested under a `links` key on purpose: the Appwrite
// `people` table stores them as columns, so the row that reaches a card is flat too, and
// one shape means no mapping step between the seed, the fallback, and the component.

export type PersonLinks = {
	/** An address, rendered as `mailto:`. */
	mail?: string;
	/** A profile slug, e.g. `hasnen-sheikh`. */
	linkedin?: string;
	/** A username. */
	github?: string;
	/** A username, underscore quirks and all. */
	instagram?: string;
};

export type Person = {
	name: string;
	role: string;
	photo?: string;
} & PersonLinks;

/** The order the marks appear in on a card. */
export const LINK_ORDER: (keyof PersonLinks)[] = ['instagram', 'linkedin', 'mail', 'github'];

/** Every host lives here, so the data file only has to carry handles. */
export function linkHref(kind: keyof PersonLinks, value: string): string {
	switch (kind) {
		case 'mail':
			return `mailto:${value}`;
		case 'linkedin':
			return `https://www.linkedin.com/in/${value}/`;
		case 'github':
			return `https://github.com/${value}`;
		default:
			return `https://www.instagram.com/${value}/`;
	}
}

export const upperCouncil: Person[] = [
	{
		name: 'Vignesh Reddy',
		role: 'Secretary',
		photo: '/media/sanity/fa6da8dc87ad37487fae19ef2339b38a7b676d44-960x1280.webp',
		mail: 'saranda-sec@ds.study.iitm.ac.in',
		linkedin: 'vigneshreddytadasina'
	},
	{
		name: 'Hasnen Sheikh',
		role: 'Deputy Secretary',
		photo: '/media/sanity/4a3bf0050e9e5c3e80fbad6fd4cefbea0e2fe402-3024x4032.webp',
		mail: 'saranda-ds@ds.study.iitm.ac.in',
		linkedin: 'hasnen-sheikh'
	}
];

export const lowerCouncil: Person[] = [
	{
		name: 'Ashish Ranjan',
		role: 'Patna RC',
		photo: '/media/sanity/50627ad864978fb1e68398cbed4c5d7ab0734bc4-853x1280.webp',
		mail: '24f3005338@ds.study.iitm.ac.in',
		linkedin: 'ashish-singh-1674b5316',
		instagram: 'ashishsingh_iitm.28'
	},
	{
		name: 'Manthan Raj Singh',
		role: 'Mumbai RC',
		photo: '/media/sanity/9ad8d8e6c47230f3521176f4beca653ca6b58e29-1280x960.webp',
		mail: '24f2008226@ds.study.iitm.ac.in',
		linkedin: 'singhmanthan'
	},
	{
		name: 'Arshan Ali Khan',
		role: 'Lucknow RC',
		photo: '/media/sanity/1d5e37c76728a510947571d7575670024cb134d4-1788x2100.webp',
		mail: '24f1000693@ds.study.iitm.ac.in',
		linkedin: 'arshanalikhan',
		instagram: 'photographer.unknown.x'
	},
	{
		name: 'Soumyadwip Das',
		role: 'Kolkata RC',
		photo: '/media/sanity/27c272f64d9d8ecf2ca6d2b53d18946499f6d4e0-1859x3142.webp',
		mail: '24f3002777@ds.study.iitm.ac.in',
		linkedin: 'soumyadwip-das-6b9a9934b',
		github: 'Soumyadwip667'
	},
	{
		name: 'Srivalli Jonnala',
		role: 'Hyderabad RC',
		photo: '/media/sanity/47081d9ebaac959c1eb6a518c067e56f1357f6d6-413x531.webp',
		mail: '24f2007617@ds.study.iitm.ac.in',
		linkedin: 'srivalli-jonnala',
		github: 'Srivallijonnala',
		instagram: '_Srivalli_jonnala_'
	},
	{
		name: 'Vishal Salvi',
		role: 'Chandigarh RC',
		photo: '/media/sanity/5667287a8afb7e71d32d3f7ab95f12373fe1339f-765x1280.webp',
		mail: '24f3001182@ds.study.iitm.ac.in'
	},
	{
		name: 'C R Nivedita',
		role: 'Chennai RC',
		photo: '/media/sanity/f5c48069f48e3be93c399c5567a2547fb1a9a4fa-720x1280.webp',
		mail: '26f2000668@ds.study.iitm.ac.in'
	},
	{
		name: 'Arham Ahsan Safdari',
		role: 'Bangalore RC',
		photo: '/media/sanity/61cc12f4f4307c69f12cd3b23feb988b6a6dbda4-647x1164.webp',
		mail: '26f1000702@ds.study.iitm.ac.in',
		linkedin: 'arham-ahsan-safdari-3a5219407'
	}
];

export type Team = {
	title: string;
	members: Person[];
};

export const teams: Team[] = [
	{
		title: 'WebOps',
		members: [
			{
				name: 'Neeraj Saini',
				role: 'Developer',
				photo: '/media/sanity/3e3d5ad248dab4cbb609605237b3c79b944da61b-1071x1468.webp',
				mail: '24f3003800@ds.study.iitm.ac.in',
				linkedin: 'officeneerajsaini',
				github: 'officeneerajsaini',
				instagram: 'officeneerajsaini'
			},
			{
				name: 'Hira Irshad',
				role: 'Developer',
				photo: '/media/sanity/2952ab819554c5976672f6b55693f5a2a5eff96d-720x614.webp',
				mail: '23f2003385@ds.study.iitm.ac.in',
				linkedin: 'hira04irshad',
				instagram: 'little.lunara'
			},
			{
				name: 'Daksh Verma',
				role: 'Developer',
				photo: '/media/sanity/26ba260ea8bf8fcfa827f525617cdab02a6d43c0-813x823.webp',
				mail: '24f2006082@ds.study.iitm.ac.in',
				linkedin: 'daksh--verma'
			}
		]
	},
	{
		title: 'Content Team',
		members: [
			{
				name: 'Sarthak Gupta',
				role: 'Content Team Head',
				photo: '/media/sanity/5cf0a236e3caa0b731507025aaef4e8e69a8bf35-720x639.webp',
				mail: '22f1000376@ds.study.iitm.ac.in',
				linkedin: 'sarthak-gupta-4b5b1921b',
				github: 'sarthak-gupta096',
				instagram: 'sarthak_kasaudhan060'
			},
			{
				name: 'Jaime Durga A',
				role: 'Chronicle Head',
				photo: '/media/sanity/5c09a03d2a2e3d0f9eb7de42eac7711c24a5ca0d-1254x1254.webp',
				mail: '25f3003367@ds.study.iitm.ac.in',
				linkedin: 'jaime-durga-a-5a4430143',
				instagram: 'jaimedurga'
			},
			{
				name: 'Arshan Ali Khan',
				role: 'Graphic Designer & Video Editor',
				photo: '/media/sanity/1d5e37c76728a510947571d7575670024cb134d4-1788x2100.webp',
				mail: '24f1000693@ds.study.iitm.ac.in',
				linkedin: 'arshanalikhan',
				instagram: 'photographer.unknown.x'
			},
			{
				name: 'Joanna Baskaran',
				role: 'Graphic Designer',
				photo: '/media/sanity/5cd88528fb4d6ba10182b39ab76dce72a81f864f-3264x2448.webp',
				mail: '25f2007101@ds.study.iitm.ac.in',
				linkedin: 'joanna-baskaran-9965a33b4',
				instagram: 'joannaa_._'
			},
			{
				name: 'Gourishi Mundra',
				role: 'Graphic Designer',
				photo: '/media/sanity/d5fefeee23ae37bd42d25071cae830277bca867a-1080x1920.webp',
				mail: '25f2006052@ds.study.iitm.ac.in',
				linkedin: 'gourishi-mundra-873b68363',
				github: 'gourishimundra-11',
				instagram: 'gourishimundra11'
			}
		]
	},
	{
		title: 'PR & Outreach Team',
		members: [
			{
				name: 'Afreen',
				role: 'PR & Outreach Head',
				photo: '/media/sanity/046e1673a16beef90eb053b233120b2f4729824b-768x852.webp',
				mail: '24f2006756@ds.study.iitm.ac.in',
				linkedin: 'afreen-khan-7a03a929b'
			},
			{
				name: 'Sarthak Gupta',
				role: 'PR & Outreach',
				photo: '/media/sanity/5cf0a236e3caa0b731507025aaef4e8e69a8bf35-720x639.webp',
				mail: '22f1000376@ds.study.iitm.ac.in',
				linkedin: 'sarthak-gupta-4b5b1921b',
				instagram: 'sarthak_kasaudhan060'
			},
			{
				name: 'Abhay Singh',
				role: 'Volunteer',
				photo: '/media/sanity/d8e38412ec32056b3f79d5c4f8a4390d35811e38-1564x3480.webp',
				mail: '25f1001915@ds.study.iitm.ac.in',
				linkedin: 'abhay-singh-a30580382'
			},
			{
				// The live site lists sarthak-gupta096 as Sachitt's GitHub, which is Sarthak's
				// profile. A wrong link is worse than no link, so it is left off.
				name: 'A V Sachitt',
				role: 'PR & Outreach',
				photo: '/media/sanity/b3698c41175f8ef8473254d2d83363afac8d3f28-403x992.webp',
				mail: '26f2200112@mg.study.iitm.ac.in',
				linkedin: 'sachitt-a-v-604224414',
				instagram: 'sachitt_av'
			},
			{
				name: 'Prajna Bhat',
				role: 'PR & Outreach',
				photo: '/media/sanity/b15f901dcfb535d1b295313469ea63a37182bc91-413x531.webp',
				mail: '26f2001469@ds.study.iitm.ac.in',
				linkedin: 'prajna-bhat1'
			},
			{
				name: 'N R Paghalavan',
				role: 'PR & Outreach',
				photo: '/media/sanity/f1a4d13e07241ebf73ce28ea36155fcd16af46cf-720x918.webp',
				mail: '26f2002589@ds.study.iitm.ac.in',
				linkedin: 'n-r-paghalavan-a59b2637b'
			},
			{
				name: 'Ajish Priyan K',
				role: 'PR & Outreach',
				photo: '/media/sanity/97d83485b650ba09b020a2edb8031e84fa447703-313x833.webp',
				mail: '26f2200147@mg.study.iitm.ac.in',
				linkedin: 'ajish-priyan-undefined-47b275427',
				instagram: 'ajish_priyan'
			}
		]
	}
];
