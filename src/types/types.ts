export interface IPost {
	id: number;
	slug: string;
	title: string;
	subtitle: string;
	image: string;
	figcaption: string;
	category: string;
	author: string;
	date: number;
	content: string;
}

export interface IPostProps {
	post: IPost;
}

export interface ICategoryProps {
	id: string;
	slug: string;
	name: string;
}
