export interface PostProps {
	post: {
		slug: string;
		title: string;
		image: string;
		category: string;
		author: string;
		date: number;
	};
}

export interface CategoryProps {
	id: string;
	slug: string;
	name: string;
}
