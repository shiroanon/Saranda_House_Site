// Meetup regions and their past events.
// Generated from a crawl of https://saranda.iitmbs.org
// Regenerate/trim freely — this is plain data.

export type MeetupEvent = {
	name: string;
	date: string | null;
	description: string;
	images: string[];
};

export type MeetupRegion = {
	city: string;
	events: MeetupEvent[];
};

export const meetups: Record<string, MeetupRegion> = {
	bengaluru: {
		city: 'bengaluru',
		events: [
			{
				name: 'Kottayam',
				date: '2025-02-23',
				description: '',
				images: [
					'/media/sanity/0b45756dd5277ff1c0ea8f9a8e5722e5f8e51e2e-1080x1080.webp',
					'/media/sanity/aeab9148156b04627899c1ad6ec675c241873e79-1080x1080.webp',
					'/media/sanity/daa39392348838565cbcb20e85d4ce8869c9507b-1080x1080.webp',
					'/media/sanity/c3c6101fc9ed0bc5ba0043dc6b0ddfc03e191a48-1080x1080.webp',
					'/media/sanity/e8b95c59bba041c9b6f84d778b74c03a639fd026-1080x1080.webp'
				]
			},
			{
				name: 'Kochi',
				date: '2024-06-30',
				description: '',
				images: [
					'/media/sanity/745d1563fdf801587b4b4be1116921927e535994-1080x1080.webp',
					'/media/sanity/c59c7b0d87a25dfb1e865275e4cac9889a87e2f4-1080x1080.webp',
					'/media/sanity/5fa949756a2c4b0c309efeba298a35c04701a530-1080x1080.webp',
					'/media/sanity/d294714cfb8ff7ecbfaf437416b64da01bbce012-1080x1080.webp',
					'/media/sanity/5715bf0d79e47b84f05c79a88d00b5475b5a44fe-1080x1080.webp'
				]
			}
		]
	},
	chandigarh: {
		city: 'chandigarh',
		events: [
			{
				name: 'Jaipur',
				date: '2025-10-27',
				description: '',
				images: [
					'/media/sanity/da60ee153c9a9dfe5ab9de0fdf0347ce760f9783-1080x1080.webp',
					'/media/sanity/a90948b4c2685ceff37759c3c235ab5b2af8c3ee-1080x1080.webp',
					'/media/sanity/03b539ed87d3ba5802d7e87aab0cb61cec218381-1080x1080.webp',
					'/media/sanity/cfc5c23683fca88825c4b6a0fedd2871113c5d7b-1080x1080.webp'
				]
			},
			{
				name: 'Amritsar',
				date: '2025-10-06',
				description: '',
				images: [
					'/media/sanity/61bfd44517e12a98dc45f1feafa5b1b6ba05377a-640x853.webp',
					'/media/sanity/bb7505f1e127844326d365da27ccf9267bca5acf-640x853.webp',
					'/media/sanity/3a907d3bb509c349dcde034dec1cff8ccbbe66a1-640x853.webp'
				]
			},
			{
				name: 'Udaipur',
				date: '2025-09-13',
				description: '',
				images: [
					'/media/sanity/2a9c1cd77dad0613c4969a8237d17c69309ad6e5-1080x1350.webp',
					'/media/sanity/03fbafe0fee4e42f3b0de31c5ce4bf6a287dbe5b-1080x1350.webp',
					'/media/sanity/e0e5e6bccda945b65cdcf27696a7ad5035162c09-1080x1350.webp',
					'/media/sanity/c9fb8f885c13de60d6c4d64cba23134aa88125c2-1080x1350.webp',
					'/media/sanity/36ae301f562740591a3acab2524bcebd6e782fad-1080x1350.webp'
				]
			},
			{
				name: 'Shimla',
				date: '2025-09-01',
				description: '',
				images: [
					'/media/sanity/74b782031648053acbf4446523dab03fa35be002-1440x1440.webp',
					'/media/sanity/60281129023d64af924cda9a7a9dabdc461406cf-1440x1440.webp',
					'/media/sanity/4e646938d7c2d28127eb87470b9661fa02f36756-1440x1440.webp',
					'/media/sanity/da14b2bd758ced0d2da12f7319afb571e8e34670-1440x1440.webp'
				]
			},
			{
				name: 'Amritsar',
				date: '2025-01-19',
				description: '',
				images: [
					'/media/sanity/05e590bbdcbf13caf7af2376cf6c246a7f80b70d-1080x1080.webp',
					'/media/sanity/87b8cb225f0cb46c3d622df4b16f4280bf7dc85f-1080x1080.webp',
					'/media/sanity/a47419c83f01b754e8fafdb90506206d1e15e34e-1080x1080.webp',
					'/media/sanity/bae208056f27aae6416ad65dc28ca390bcc8df7d-1080x1080.webp',
					'/media/sanity/2ff0c5e3579e69e3de9fc0ac367cee02fca38065-1080x1080.webp'
				]
			},
			{
				name: 'Kota',
				date: '2024-01-19',
				description: '',
				images: [
					'/media/sanity/bce6990e3c4b0335606e07f2db1fbe4f714c8a4e-1080x1080.webp',
					'/media/sanity/06e9a5fd33ccbe407b1be5cdffed130efa8b4be1-1080x1080.webp',
					'/media/sanity/204b93790b2b14b06d30bfd2336a94a143767058-1080x1080.webp',
					'/media/sanity/12b1a709f9e78005b6ba96858ae58df9c9ab8006-1080x1080.webp'
				]
			},
			{
				name: 'Kota',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/50d3f0402ccd8938e453a4606b128da812b13e6d-1080x1080.webp',
					'/media/sanity/18370cc86082ac03491d407be711267752f20696-1080x1080.webp',
					'/media/sanity/4493387f7e795271a2a0124e050d457f27014906-905x905.webp'
				]
			},
			{
				name: 'Jalandhar',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/915995f8b780597a00936d532cadf115ffd9b4a3-1080x1080.webp',
					'/media/sanity/97c0980b4ddc1572c30722246c6451354dc28a19-1080x1080.webp',
					'/media/sanity/7fea1bb20db13758755488537b5d955c4be4d8b7-1080x1080.webp'
				]
			}
		]
	},
	chennai: {
		city: 'chennai',
		events: [
			{
				name: 'Chennai',
				date: '2025-09-06',
				description: '',
				images: [
					'/media/sanity/5ef92d353344bd91a8be22624450b4fd564b11d4-1080x1348.webp',
					'/media/sanity/5125f5eddd1c384bec715149e999518f456b71c9-1080x1348.webp',
					'/media/sanity/d8d34177ab5cdd530adc97e8f4b7350269791b9a-1080x1348.webp'
				]
			},
			{
				name: 'Banglore',
				date: '2025-05-25',
				description: '',
				images: [
					'/media/sanity/8f592da517b4c490ec5c25da88cd18d8aee664fe-1080x1350.webp',
					'/media/sanity/8f4f63d3e3593277b47da199f6a64ee294c2012c-1080x1350.webp',
					'/media/sanity/79a9aeb52671712b712025ce5d428eb7620b3fa4-1080x1350.webp',
					'/media/sanity/e62ae7e224d7e61c4fc41bdc36f7d5f8143042de-1080x1350.webp',
					'/media/sanity/c2b85b17d6d7e3465597ef3c44cee0dc030ba6e5-1080x1350.webp',
					'/media/sanity/8e8fc1d4729a5ba22dc13c1923304411edc0040d-1080x1350.webp',
					'/media/sanity/5d6d0ac522c503e57f4a49abd1622828a8ebe23e-1080x1350.webp'
				]
			},
			{
				name: 'Coimbator',
				date: '2025-04-20',
				description: '',
				images: [
					'/media/sanity/bb34989a3bbbb4ddba784dbebe942797da2e4c8d-1080x1080.webp',
					'/media/sanity/d6e02425db9f61d9cfe0b1fadd96039e77e6d56f-1080x1080.webp',
					'/media/sanity/ed05853da4c7e5fff7c307858c877bb9415c4288-1080x1080.webp'
				]
			}
		]
	},
	delhi: {
		city: 'delhi',
		events: [
			{
				name: 'Delhi',
				date: '2025-02-08',
				description: '',
				images: [
					'/media/sanity/43f89aa8e54a6bbf98a285d575786fb620ae780a-1080x1349.webp',
					'/media/sanity/c5d05d80498255f0ce536a421aafcac91ce67041-1080x1350.webp',
					'/media/sanity/bbeb3f17f63c2979c44837ec090bf07863f69265-1080x1349.webp',
					'/media/sanity/1d50b0cb0ab096ce9860bc36dc6937e4cdf088c3-1080x1349.webp',
					'/media/sanity/4d09d0e6e8eb949f5f27306527c774df10c49e23-1080x1349.webp'
				]
			},
			{
				name: 'Ghaziabad',
				date: '2024-06-29',
				description: '',
				images: [
					'/media/sanity/af2d499ac1a4cd42276970ceab4027a79fd46a24-1080x1080.webp',
					'/media/sanity/4178b40baaf5b54034c06c94b55003dc8541b064-1080x1080.webp'
				]
			}
		]
	},
	hyderabad: {
		city: 'hyderabad',
		events: [
			{
				name: 'Guntur',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/83f3164d6919e2294167baf89525c212961eb021-1080x1080.webp',
					'/media/sanity/475ad043020e3c908220a2188850828aa5787019-1080x1080.webp',
					'/media/sanity/9159b6dd4540b7918ef79f66be39f5ab608b3b31-1080x1080.webp'
				]
			},
			{
				name: 'Guntur',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/21fc728a9aebadcb25fb4688df13db370336b3a2-1080x1080.webp',
					'/media/sanity/a33c44a084b9d1bda5a578b4bd6de31b112269dd-1080x1080.webp'
				]
			},
			{
				name: 'Hydrabad',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/4f93d9feddf1bfe45125f20408eb81a48eee2ac0-1080x1080.webp',
					'/media/sanity/ed7f4f1555c74045fba6741d21949238da9075ee-1080x1080.webp',
					'/media/sanity/ba91d775ee4c566d30f0d0bb7b10e0877a4a0956-1080x1080.webp'
				]
			}
		]
	},
	kolkata: {
		city: 'kolkata',
		events: [
			{
				name: 'Kolkata',
				date: '2025-09-14',
				description: '',
				images: [
					'/media/sanity/07302de874f6b9d2ade933f66aced5900d9aea9b-1080x1350.webp',
					'/media/sanity/b9db6c11ca0a9938ac973a7d524f76b971bd8774-1080x1350.webp',
					'/media/sanity/e0d48c4e04c036c427b9ecdcc3477eec2ecb115c-1080x1350.webp',
					'/media/sanity/332374a95aff85a8884ea882f760b7a8175e012b-1080x1350.webp'
				]
			}
		]
	},
	lucknow: {
		city: 'lucknow',
		events: [
			{
				name: 'Bareilly',
				date: '2026-08-23',
				description:
					'📢 Bareilly Meetup – Meetup No. 745! ----\n\nBareilly, get ready for an exciting community meetup! Come along for a day packed with new connections, fun activities, great conversations, and plenty of memories.\n---\n✨ What to expect?\n🤝 Meet and connect with amazing people from the community\n🎯 Fun & engaging activities\n🍴 Free food & refreshments\n💬 Meaningful conversations and networking\n🎉 Exciting interactions and memorable moments\n---\n📍 Akshar Vihar Park, Bareilly\n📅 23 August\n⏰ 11:00 AM\n---\nWhether you’re a regular member or joining us for the first time, come be a part of Meetup #745 and experience the community in person!\n---\nCome connect. Come participate. Come have fun!\n---\n🔗 Register now: https://docs.google.com/forms/d/e/1FAIpQLSczPYhY-LDDuvAq-ATIKewIrQXB3SjFF6wYUD_Vfk45sAr6Ww/viewform?usp=dialog\n---\nOrganiser : Arshan Ali Khan',
				images: [
					'/media/sanity/d2b27e23de5e06b276a0c2b29a66c2eabf82fdd0-1080x1350.webp',
					'/media/sanity/dbaf60a074e5d7c8940e50380681ed715aefc3a8-1080x1350.webp',
					'/media/sanity/de460c41df08ac6cad38a1b190a0ba362818f43d-1080x1350.webp',
					'/media/sanity/fe15960e2eca1d490a87d2d3d42deafe0b882e50-1080x1350.webp'
				]
			},
			{
				name: 'Ayodhya',
				date: '2026-08-16',
				description:
					'From screen names and online chats to real-world laughs, good food, and unforgettable memories with few new and amazing peoples! \n\n✨ Grateful for the amazing people who made the Ayodhya Meet-up so special. Here’s to signing off on another chapter with the best squad! \n\nSigned with love, laughter, and a whole lot of cake. 🎂',
				images: [
					'/media/sanity/7dbe81a0481f5e472b228361fe2467035c0dc83c-2000x1600.webp',
					'/media/sanity/7cf293df2ac920b15f232e052cfe55f1956913a2-1333x1999.webp',
					'/media/sanity/1da85de5ef9b343460c33fb61b7b1972081450e0-1333x1999.webp'
				]
			},
			{
				name: 'Bareilly',
				date: '2025-09-21',
				description: 'Meetup Number : 342\nOrganiser : Arshan Ali Khan',
				images: [
					'/media/sanity/c4178bcfe5ff1ea27a343a88c2b0dace232d1288-1587x2245.webp',
					'/media/sanity/6ee6e73efe25626fc5371733176b3c35c82cc70f-1587x2245.webp',
					'/media/sanity/57946c07a498927ec97d2ef79ac01b43127502ca-1587x2245.webp'
				]
			},
			{
				name: 'Meerut',
				date: '2025-09-14',
				description: '',
				images: [
					'/media/sanity/9f75b5ee511ade8beeb5548f255d1cfe5685758f-1440x1800.webp',
					'/media/sanity/3858af64edc673fe74a282f08c60b68548491796-1440x1800.webp'
				]
			},
			{
				name: 'Ayodhya',
				date: '2025-09-12',
				description: '',
				images: [
					'/media/sanity/a71e63d2a4e4775753c02ad03f382d540e49ccbe-1080x1080.webp',
					'/media/sanity/59c8a1a9e5d1e7a5e1c42a04dc7d54a6345db8c7-1080x1080.webp',
					'/media/sanity/8ce87bff29f5bff86b74244d89c65261f67745ec-1080x1080.webp'
				]
			},
			{
				name: 'Agra',
				date: '2025-09-03',
				description: '',
				images: [
					'/media/sanity/202fa69087885a4ee51c922093f3eb1cd1bfef2f-1080x1080.webp',
					'/media/sanity/808556b66a6e88547a4a678a9a1f45e0d0091066-1080x1080.webp',
					'/media/sanity/6277ae58340e857110ac4f521b231d587b4d1018-1080x1080.webp'
				]
			},
			{
				name: 'Bhopal',
				date: '2025-09-01',
				description: '',
				images: [
					'/media/sanity/9dfa0237af9fd5e7e0d9ae8880b4deb88273dfee-1080x1080.webp',
					'/media/sanity/a38d508710834772e8d38707e8720cfdef08611b-1080x1080.webp',
					'/media/sanity/335f731ce2683c08873b38a8dd46d52caa9021c6-1080x1080.webp',
					'/media/sanity/e5c7f162b9545bf099d9d551a0270d0b842c49cb-1080x1080.webp'
				]
			},
			{
				name: 'Gwalior',
				date: '2025-05-11',
				description: '',
				images: [
					'/media/sanity/598cdf1b2f1250f57b8a22dc1942be703b0348e8-1080x1080.webp',
					'/media/sanity/45af1a458400921b63337cbce8ab8c0af1cf46b3-1080x1080.webp'
				]
			},
			{
				name: 'Gorakhpur',
				date: '2025-05-11',
				description: '',
				images: [
					'/media/sanity/f15df032630ce8277327fcd9c7e21803c14995b9-1080x1080.webp',
					'/media/sanity/99a9b7c4280264a8e359371e85c287f9ea98f460-1080x1080.webp',
					'/media/sanity/1fe77ff9a08140afe4c0b104cc411a70b41757a4-1080x1080.webp'
				]
			},
			{
				name: 'Agra',
				date: '2025-04-27',
				description: '',
				images: [
					'/media/sanity/9441253e74bf8edac0085d99acf2de72da7ac1bb-1440x1440.webp',
					'/media/sanity/930e988699ac86598e713fb5106f34480811d3e4-1440x1440.webp',
					'/media/sanity/03747a4b838298bccaa478ccfdd9fc60a81e5e07-1440x1440.webp',
					'/media/sanity/b2015cf163c5e5beb2ccd0807a20b6d6a44eec27-1440x1440.webp',
					'/media/sanity/74a2516ed8bec51df275200200679210f604cb12-1440x1440.webp'
				]
			},
			{
				name: 'Kanpur',
				date: '2025-04-27',
				description: '',
				images: [
					'/media/sanity/2f6bd22cfba96bd8d8a9aa2369ff2255f390fae2-1080x1080.webp',
					'/media/sanity/5d49be0717a9c100821291e93cb5f901de8aa27c-1080x1080.webp',
					'/media/sanity/bdd7353c8e8f71c914a09d8ae8ce401973503074-1080x1080.webp'
				]
			},
			{
				name: 'Lucknow',
				date: '2024-10-27',
				description: '',
				images: [
					'/media/sanity/5b7fdae2f86ee217a93b4a9ccfc96be7904d386a-1080x1350.webp',
					'/media/sanity/eb661fe124ac2572a28ca00dcddf1fb282386b16-1080x1350.webp',
					'/media/sanity/2b776487a44122ad590f5116f9df06ec2b116949-1080x1080.webp',
					'/media/sanity/a5f6e41eddcff7004f2baaf7e1155edc4c7494d9-1080x1080.webp',
					'/media/sanity/078cf70e8a681ce6866aeea2ab02c54096fdab6a-1080x1080.webp',
					'/media/sanity/ad7899789693017657005a96ec648d638744538a-1080x1350.webp'
				]
			},
			{
				name: 'Lucknow',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/a1f4b0bc0973de8104d73c2a9f9c992d989dd6bf-1080x1080.webp',
					'/media/sanity/8bee7cdd93ecebd80fc51a37125ce05af2df928f-1080x1080.webp',
					'/media/sanity/376e304f66605039b77c6c4a6c7a034ced188f54-1080x1080.webp',
					'/media/sanity/5b67fe6ed7d15829aa6e3bebc91d1b354656948b-1080x1080.webp'
				]
			}
		]
	},
	mumbai: {
		city: 'mumbai',
		events: [
			{
				name: 'Pune',
				date: '2025-08-15',
				description: '',
				images: [
					'/media/sanity/4144520ebc9bac505f6f384dc8a46ec69f3980cb-1080x1350.webp',
					'/media/sanity/b5c0de572371be63b1d2102c19a4ab5bc536aa7f-1080x1350.webp',
					'/media/sanity/7395c4c6600dd4597e73480f1fcb102b167285a8-1080x1350.webp',
					'/media/sanity/9718137273be8799f2b0f8b0bad30aef7d3f2b29-1080x1350.webp'
				]
			},
			{
				name: 'Mumbai',
				date: '2025-03-23',
				description: '',
				images: [
					'/media/sanity/941198ebcfb1e5cb3c0ed9aaeeb0169c981660dc-1080x1080.webp',
					'/media/sanity/842c872ece3ef1abbe9395cff2d0ec5f8c59ab64-1080x1080.webp',
					'/media/sanity/4dda9ca2e78a75d0057492de5be364a3c37b6614-1080x1080.webp'
				]
			},
			{
				name: 'Mumbai',
				date: '2025-01-31',
				description: '',
				images: [
					'/media/sanity/9c368d7c6e5ec532f59f334bcf98e91eaa376f11-1080x1080.webp',
					'/media/sanity/eb9a5ac550b6443a292568816b5818c291f5a984-1080x1080.webp',
					'/media/sanity/d4a5decfb698e4253e6184f4e56d077a58c64b94-1080x1080.webp',
					'/media/sanity/2775f2837171ef4c32357f71fe527b4ee6506fd4-1080x1080.webp',
					'/media/sanity/a59746d8cc8ecc77a74ca81b1d9647a0e8ac5101-1080x1080.webp'
				]
			}
		]
	},
	patna: {
		city: 'patna',
		events: [
			{
				name: 'Jamshedpur',
				date: '2025-02-16',
				description: '',
				images: [
					'/media/sanity/ed3802d4e2584f0ac9b5ad46d78104e78c20ae5d-1080x1080.webp',
					'/media/sanity/13294ae5d8ef2037dcb10a47362870c80f798f0d-1080x1080.webp',
					'/media/sanity/dcb82a4d305d775f3f689169d333862269fe18a7-1080x1080.webp'
				]
			},
			{
				name: 'Ranchi',
				date: '2024-08-11',
				description: '',
				images: [
					'/media/sanity/0b09fc252da97038fea546e442549d85b6bd089f-1080x1080.webp',
					'/media/sanity/579850fc7527cbb78cf0c9e5badaf106e2465a52-1080x1080.webp',
					'/media/sanity/3a26bd96bd7dbcf0a189d63d99b60b4432f35f35-1080x1080.webp',
					'/media/sanity/ff757f3c62fe59136740a56a1d3db32882f815b9-1080x1080.webp'
				]
			},
			{
				name: 'Dhanbad',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/962998e614f79d5ed3f1e9b418817c42e788f359-1080x1080.webp',
					'/media/sanity/1412173f6b93bf7ee896b79daa03c4d0cd916be4-1080x1080.webp',
					'/media/sanity/a3eb15ec645d68b5807aa698995b80b5cebed4f3-1080x1080.webp',
					'/media/sanity/f872e00f9fcd498e38e459de1d0d406bcffd2bb8-1080x1080.webp'
				]
			},
			{
				name: 'Jamshedpur',
				date: '2024-01-01',
				description: 'Please note: The date is incorrect.',
				images: [
					'/media/sanity/6c5fae90bbd021706b967a5507cf3b68c73dd7dc-1080x1080.webp',
					'/media/sanity/fa6e1bfbf875de732fd39d5647436bb72f1610ce-1080x1080.webp',
					'/media/sanity/1ceb549b877d2e5684dee0902a89b7e38b189527-1080x1080.webp',
					'/media/sanity/63e3eea6d5d64774e6f149a9c2e18773c3dc69b7-1080x1080.webp'
				]
			}
		]
	}
};

export const meetupCities = Object.keys(meetups);

// Hand-drawn region maps used on the meetups index and each region page.
export const cityImages: Record<string, string> = {
	bengaluru: '/media/site/bengaluru.e3bf944d.webp',
	chandigarh: '/media/site/chandigarh.bf55ed00.webp',
	chennai: '/media/site/chennai.5b739f0d.webp',
	delhi: '/media/site/delhi.6eb239a4.webp',
	hyderabad: '/media/site/hyderabad.c04f4e86.webp',
	kolkata: '/media/site/kolkata.8b1520cf.webp',
	lucknow: '/media/site/lucknow.7c3e7437.webp',
	mumbai: '/media/site/mumbai.9405de74.webp',
	patna: '/media/site/patna.e0d595cb.webp'
};
