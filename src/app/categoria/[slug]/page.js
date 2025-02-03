import { getPostsByCategory } from "@/services/categories";

import CardPost from "@/components/CardPost";
import Pagination from "@/components/Pagination";

export default async function PageCategoria({ params, searchParams }) {
	const currentPage = parseInt(searchParams?.page) || 1;
	const { data: posts = [], prev, next } = await getPostsByCategory(params.slug, currentPage);

	if (!posts.length) {
		return <p className="text-center text-gray-600">Nenhum post encontrado para esta categoria.</p>;
	}

	return (
		<section className={`container w-full md:w-[80%] mx-auto flex-col gap-5 mb-14`}>
			<h1 className="text-3xl font-bold mb-8 capitalize">{posts[0].category}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				{posts.map((post) => (
					<CardPost key={post.id} post={post} />
				))}
			</div>
			<div className="flex justify-end gap-6 text-base underline text-center mt-5">
				<Pagination prev={prev} next={next} baseUrl={`/categoria/${params.slug}`} />
			</div>
		</section>
	);
}
