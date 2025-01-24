import { getAllPosts } from "@/services/posts";

import CardPost from "@/components/CardPost";
import MainCard from "@/components/MainCardPost";
import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }) {
	const currentPage = searchParams?.page || 1;

	const { data: posts = [], prev, next } = await getAllPosts(currentPage);

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
