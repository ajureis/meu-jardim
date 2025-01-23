import logger from "@/logger";
import CardPost from "@/components/CardPost";
import Pagination from "@/components/Pagination";

async function getPostsByCategory(categorySlug, page = 1) {
	const url = `http://localhost:3042/posts?categorySlug=${categorySlug}&_page=${page}&_per_page=6`;

	try {
		const response = await fetch(url, {
			cache: "no-store", // Evita cache
		});

		if (!response.ok) {
			logger.error(`Erro ao buscar posts da categoria ${categorySlug}: ${response.statusText}`);
			return { data: [], prev: null, next: null };
		}

		logger.info(`Posts da categoria ${categorySlug} buscados com sucesso`);

		const data = await response.json();
		console.log("data", data);

		if (!data || data.length === 0) {
			logger.warn(`Nenhum post encontrado para a categoria: ${categorySlug}`);
			return { data: [], prev: null, next: null };
		}

		return data;
	} catch (error) {
		logger.error(`Erro ao buscar posts da categoria: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

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
