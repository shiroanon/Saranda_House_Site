// Landing gallery.
//
// One collage per meetup region: up to four photographs from that region's *latest*
// meetup, with the region named on a disc at the junction. Sources are crawl originals,
// resized to a 480px long edge at q72 with the aspect ratio left alone — a plate is
// exactly as tall as its photograph, so no frame ever takes a slice off it.
//
// Regions with only three photographs from their latest evening get three plates. The
// layout is a pair of columns, so a third plate simply leaves its column short.
//
// Ordered by the region's most recent meetup, newest first, so the landing page opens on
// what the house has just done.

export type MeetupCollage = {
	/** The region key — also the link target, `/meetups/<city>`. */
	city: string;
	/** Shown on the sticker, title-cased. */
	label: string;
	/** The region's most recent meetup, for reference. */
	event: string;
	/** Photographs in wireframe order; rail one takes the odd positions, rail two the even. */
	photos: string[];
};

export const collages: MeetupCollage[] = [
	{
		city: 'lucknow',
		label: 'Lucknow',
		event: 'Bareilly',
		photos: [
			'/media/gallery/lucknow-1.webp',
			'/media/gallery/lucknow-2.webp',
			'/media/gallery/lucknow-3.webp',
			'/media/gallery/lucknow-4.webp'
		]
	},
	{
		city: 'chandigarh',
		label: 'Chandigarh',
		event: 'Jaipur',
		photos: [
			'/media/gallery/chandigarh-1.webp',
			'/media/gallery/chandigarh-2.webp',
			'/media/gallery/chandigarh-3.webp',
			'/media/gallery/chandigarh-4.webp'
		]
	},
	{
		city: 'kolkata',
		label: 'Kolkata',
		event: 'Kolkata',
		photos: [
			'/media/gallery/kolkata-1.webp',
			'/media/gallery/kolkata-2.webp',
			'/media/gallery/kolkata-3.webp',
			'/media/gallery/kolkata-4.webp'
		]
	},
	{
		city: 'chennai',
		label: 'Chennai',
		event: 'Chennai',
		photos: [
			'/media/gallery/chennai-1.webp',
			'/media/gallery/chennai-2.webp',
			'/media/gallery/chennai-3.webp'
		]
	},
	{
		city: 'mumbai',
		label: 'Mumbai',
		event: 'Pune',
		photos: [
			'/media/gallery/mumbai-1.webp',
			'/media/gallery/mumbai-2.webp',
			'/media/gallery/mumbai-3.webp',
			'/media/gallery/mumbai-4.webp'
		]
	},
	{
		city: 'bengaluru',
		label: 'Bengaluru',
		event: 'Kottayam',
		photos: [
			'/media/gallery/bengaluru-1.webp',
			'/media/gallery/bengaluru-2.webp',
			'/media/gallery/bengaluru-3.webp',
			'/media/gallery/bengaluru-4.webp'
		]
	},
	{
		city: 'patna',
		label: 'Patna',
		event: 'Jamshedpur',
		photos: [
			'/media/gallery/patna-1.webp',
			'/media/gallery/patna-2.webp',
			'/media/gallery/patna-3.webp'
		]
	},
	{
		city: 'delhi',
		label: 'Delhi',
		event: 'Delhi',
		photos: [
			'/media/gallery/delhi-1.webp',
			'/media/gallery/delhi-2.webp',
			'/media/gallery/delhi-3.webp',
			'/media/gallery/delhi-4.webp'
		]
	},
	{
		city: 'hyderabad',
		label: 'Hyderabad',
		event: 'Guntur',
		photos: [
			'/media/gallery/hyderabad-1.webp',
			'/media/gallery/hyderabad-2.webp',
			'/media/gallery/hyderabad-3.webp'
		]
	}
];
