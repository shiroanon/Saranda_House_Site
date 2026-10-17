// House council & teams, curated from https://saranda.iitmbs.org/know_us
// Photos resolve to the media downloaded under /static/media.

export type Person = {
	name: string;
	role: string;
	photo?: string;
};

const placeholder = '/media/site/person_placeholder.a50c5a46.webp';

export const upperCouncil: Person[] = [
	{
		name: 'Vignesh Reddy',
		role: 'Secretary',
		photo: '/media/sanity/fa6da8dc87ad37487fae19ef2339b38a7b676d44-960x1280.webp'
	},
	{
		name: 'Hasnen Sheikh',
		role: 'Deputy Secretary',
		photo: '/media/sanity/4a3bf0050e9e5c3e80fbad6fd4cefbea0e2fe402-3024x4032.webp'
	}
];

export const lowerCouncil: Person[] = [
	{ name: 'Ashish Ranjan', role: 'Patna RC', photo: placeholder },
	{ name: 'Manthan Raj Singh', role: 'Mumbai RC', photo: placeholder },
	{ name: 'Arshan Ali Khan', role: 'Lucknow RC', photo: placeholder },
	{ name: 'Soumyadwip Das', role: 'Kolkata RC', photo: placeholder },
	{ name: 'Srivalli Jonnala', role: 'Hyderabad RC', photo: placeholder },
	{ name: 'Vishal Salvi', role: 'Chandigarh RC', photo: placeholder },
	{ name: 'C R Nivedita', role: 'Chennai RC', photo: placeholder },
	{ name: 'Arham Ahsan Safdari', role: 'Bangalore RC', photo: placeholder }
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
				photo: '/media/sanity/61cc12f4f4307c69f12cd3b23feb988b6a6dbda4-647x1164.webp'
			},
			{ name: 'Hira Irshad', role: 'Developer', photo: placeholder },
			{ name: 'Daksh Verma', role: 'Developer', photo: placeholder }
		]
	},
	{
		title: 'Content Team',
		members: [
			{
				name: 'Sarthak Gupta',
				role: 'Content Team Head',
				photo: '/media/sanity/26ba260ea8bf8fcfa827f525617cdab02a6d43c0-813x823.webp'
			},
			{ name: 'Jaime Durga A', role: 'Chronicle Head', photo: placeholder },
			{ name: 'Arshan Ali Khan', role: 'Graphic Designer & Video Editor', photo: placeholder },
			{ name: 'Joanna Baskaran', role: 'Graphic Designer', photo: placeholder },
			{ name: 'Gourishi Mundra', role: 'Graphic Designer', photo: placeholder }
		]
	},
	{
		title: 'PR & Outreach Team',
		members: [
			{
				name: 'Afreen',
				role: 'PR & Outreach Head',
				photo: '/media/sanity/d5fefeee23ae37bd42d25071cae830277bca867a-1080x1920.webp'
			},
			{ name: 'Sarthak Gupta', role: 'PR & Outreach', photo: placeholder }
		]
	}
];
