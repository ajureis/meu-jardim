import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostProps } from "@/types/types";

const MainCard: React.FC<PostProps> = ({ post }) => {
	return (
		<div className="relative w-full h-80 rounded mb-4 overflow-hidden">
			<Link href={`/post/${post.slug}`}>
				<Image
					src={post.image}
					alt={post.title}
					fill
					style={{ objectFit: "cover" }}
					className="rounded"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
					<div className="tag p-1 text-xs text-white bg-secondary-green rounded inline-block max-w-max">
						<p>{post.category}</p>
					</div>
					<div className="main-card bg-white bg-opacity-75 p-2 rounded mt-1">
						<h1 className="font-libre title text-2xl mb-2">{post.title}</h1>
						<p className="text-sm text-gray-600">{post.author}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default MainCard;
