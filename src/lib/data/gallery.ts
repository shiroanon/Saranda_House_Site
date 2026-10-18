// Landing gallery.
// One photograph per meetup region, resized to 800px and re-encoded at q72 — the
// crawl's originals are 1400x1400 squares averaging ~180 kB each, which is far too
// heavy to put nine of on the front page.

export type GalleryItem = {
	src: string;
	/** The region the photograph came from — also the link target. */
	city: string;
	/** Shown on the tile, title-cased. */
	label: string;
};

export const gallery: GalleryItem[] = [
	{
		src: '/media/gallery/bengaluru.webp',
		city: 'bengaluru',
		label: 'Bengaluru',
	},
	{
		src: '/media/gallery/chandigarh.webp',
		city: 'chandigarh',
		label: 'Chandigarh',
	},
	{
		src: '/media/gallery/chennai.webp',
		city: 'chennai',
		label: 'Chennai',
	},
	{
		src: '/media/gallery/delhi.webp',
		city: 'delhi',
		label: 'Delhi',
	},
	{
		src: '/media/gallery/hyderabad.webp',
		city: 'hyderabad',
		label: 'Hyderabad',
	},
	{
		src: '/media/gallery/kolkata.webp',
		city: 'kolkata',
		label: 'Kolkata',
	},
	{
		src: '/media/gallery/lucknow.webp',
		city: 'lucknow',
		label: 'Lucknow',
	},
	{
		src: '/media/gallery/mumbai.webp',
		city: 'mumbai',
		label: 'Mumbai',
	},
	{
		src: '/media/gallery/patna.webp',
		city: 'patna',
		label: 'Patna',
	},
];
