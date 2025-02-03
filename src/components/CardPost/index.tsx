import React from "react";
import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "./CardPost.module.css";

import { PostProps } from "@/types/types";

const CardPost: React.FC<PostProps> = ({ post }) => {
	return (
		<article className={styles.card}>
			<Link href={`/post/${post.slug}`}>
				<header className="mb-2 relative" style={{ width: "100%", height: "240px" }}>
					<Image
						src={post.image}
						alt={post.title}
						className="rounded-lg"
						fill
						sizes="457px"
						style={{ objectFit: "cover" }}
					/>
					<span className="p-1 absolute bottom-3 left-2 text-xs text-white bg-secondary-green rounded inline">
						{post.category}
					</span>
				</header>
				<section className="p-4">
					<h2 className={`${styles.title} font-libre text-xl font-semibold mb-1`}>{post.title}</h2>
					<p className="text-sm text-gray-600">
						{format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
					</p>
				</section>
			</Link>
		</article>
	);
};

export default CardPost;
