import Image from "next/image";
import logger from "@/logger";

import { remark } from "remark";
import html from "remark-html";

import { FaRegShareFromSquare } from "react-icons/fa6";
import ButtonLink from "@/components/ButtonLink";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "./page.module.css";

async function getPostBySlug(slug) {
	const url = `http://localhost:3042/posts?slug=${slug}`;

	try {
		const response = await fetch(url, {
			cache: "no-store", // Adiciona esta linha para evitar cache
		});

		if (!response.ok) {
			logger.error(`Erro ao buscar posts: ${response.statusText}`);
			return null;
		}

		logger.info("Posts buscados com sucesso");

		const data = await response.json();

		if (!data || data.length === 0) {
			logger.warn(`Nenhum post encontrado para o slug: ${slug}`);
			return null;
		}

		const post = data[0];

		if (!post.content) {
			logger.error("O campo 'text' está ausente no post retornado.");
			return null;
		}

		const processedContent = await remark().use(html).process(post.content);
		post.content = processedContent.toString();

		return post;
	} catch (error) {
		logger.error(`Erro ao buscar o post: ${error.message}`);
		return null;
	}
}

export default async function PagePost({ params }) {
	const post = await getPostBySlug(params.slug);
	if (!post) {
		return <p>Post não encontrado.</p>;
	}

	return (
		<section
			className={`${styles.article} container w-full md:w-[80%] mx-auto  gap-5 mb-14 mt-10 `}>
			<article className={`${styles.content}`}>
				<div className="flex items-center justify-center gap-4">
					<p className="p-2 text-base text-white bg-secondary-green rounded-3xl">{post.category}</p>
					<p className="text-base	 text-gray-600 ">
						{format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
					</p>
				</div>

				<h1 className="font-libre text-4xl mt-8 mb-4 text-center">{post.title}</h1>
				<h2 className="text-2xl font-light mt-4 mb-8 text-center">{post.subtitle}</h2>

				<div
					className="image mb-1"
					style={{
						width: "100%",
						minHeight: "450px",
						maxHeight: "450px",
						height: "100%",
						position: "relative",
					}}>
					<Image
						src={post.image}
						alt=""
						className="rounded-lg"
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div className="flex items-center justify-between mt-5">
					<figcaption className=" italic text-gray-600">{post.figcaption}</figcaption>
					<ButtonLink
						href="#"
						className=" border-main-green text-main-green bg-white hover:text-white">
						<FaRegShareFromSquare size={18} />
						Compartilhar
					</ButtonLink>
				</div>

				<div className={`${styles.content} mt-10 text-lg`}>
					<div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
				</div>
			</article>
		</section>
	);
}
