import api from "@/utils/api";
import logger from "@/utils/logger.server";

import { remark } from "remark";
import html from "remark-html";

import { IPost } from "@/types/types";

interface GetAllPostsResponse {
	data: IPost[];
	prev: number | null;
	next: number | null;
}

export async function getAllPosts(page = 1, perPage = 7): Promise<GetAllPostsResponse> {
	try {
		const response = await api.get<GetAllPostsResponse>("/posts", {
			params: { _page: page, _per_page: perPage },
		});

		if (!response.data.data.length) {
			logger.warn("Nenhum post encontrado.");
			return { data: [], prev: null, next: null };
		}

		if (!response.data.data || !Array.isArray(response.data.data)) {
			logger.warn("Nenhum post encontrado.");
			return { data: [], prev: null, next: null };
		}

		return {
			data: response.data.data,
			prev: response.data.prev,
			next: response.data.next,
		};
	} catch (error: any) {
		logger.error(`Erro ao buscar posts: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

export async function getPostBySlug(slug: string): Promise<IPost | null> {
	try {
		const response = await api.get<IPost[]>(`/posts`, { params: { slug } });

		if (!response.data.length) {
			logger.warn(`Nenhum post encontrado para o slug: ${slug}`);
			return null;
		}

		const post = response.data[0];

		if (!post.content) {
			logger.error("O campo 'content' está ausente no post retornado.");
			return null;
		}

		// Processando conteúdo Markdown para HTML
		const processedContent = await remark().use(html).process(post.content);
		post.content = processedContent.toString();

		return post;
	} catch (error: any) {
		logger.error(`Erro ao buscar o post: ${error.message}`);
		return null;
	}
}
