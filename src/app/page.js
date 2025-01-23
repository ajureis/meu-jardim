import logger from "@/logger";

import CardPost from "@/components/CardPost";
import MainCard from "@/components/MainCardPost";
import Pagination from "@/components/Pagination";

async function getAllPosts(page) {
	let url = `http://localhost:3042/posts?_page=${page}&_per_page=7`;

	const response = await fetch(url, {
		cache: "no-store", // Adiciona esta linha para evitar cache
	});

	if (!response.ok) {
		logger.error("Erro ao buscar posts");
		return { data: [], prev: null, next: null };
	}

	logger.info("Posts buscados com sucesso");
	return response.json();
}

export default async function Home({ searchParams }) {
	const currentPage = searchParams?.page || 1;

	const { data: posts = [], prev, next } = await getAllPosts(currentPage);

	// console.log("Dados do post:", posts);

	return (
		<section className={`container w-full md:w-[80%] mx-auto flex-col gap-5 mb-14`}>
			{posts.length > 0 && <MainCard post={posts[0]} />}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				{posts.length > 0 ? (
					posts.slice(1).map((post) => <CardPost post={post} key={post.id} />)
				) : (
					<p className="text-gray-500 text-center">Nenhum post encontrado.</p>
				)}
			</div>
			<div className="flex justify-end gap-6 text-base underline text-cente mt-5">
				<Pagination prev={prev} next={next} baseUrl="/" />
			</div>
		</section>
	);
}
