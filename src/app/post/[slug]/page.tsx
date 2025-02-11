import { getPostBySlug } from "@/services/posts";

import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaRegShareFromSquare } from "react-icons/fa6";

import ButtonLink from "@/components/ButtonLink";

import styles from "./page.module.css";

import { IPost } from "@/types/types";

interface PagePostProps {
	params: {
		slug: string;
	};
}

const PagePost = async ({ params }: PagePostProps) => {
	const post: IPost | null = await getPostBySlug(params.slug);

	if (!post) {
		return <p className="text-center text-gray-500">Post não encontrado.</p>;
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
						aria-label="Compartilhar este post"
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
};

export default PagePost;
