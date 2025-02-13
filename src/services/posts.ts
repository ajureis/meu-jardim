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

export async function getAllPosts(
	page: number = 1,
	perPage: number = 7
): Promise<GetAllPostsResponse> {
	try {
		const response = await api.get<GetAllPostsResponse>("/posts", {
			params: { _page: page, _per_page: perPage },
		});
		// logger.info(`Page getAllPosts: ${page}`);
		// logger.info(`PerPage getAllPosts: ${perPage}`);

		// logger.info(`Requisição feita para URL: ${process.env.NEXT_PUBLIC_API_URL}/posts`);
		// logger.info(`Dados recebidos: ${JSON.stringify(response.data)}`);

		const postsData = response.data?.data;

		if (!postsData) {
			logger.warn("Nenhum post encontrado.");
			return { data: [], prev: null, next: null };
		}
		// logger.info(`Posts encontrados: ${postsData.length}`);

		return { data: postsData, prev: response.data.prev, next: response.data.next };
	} catch (error: any) {
		logger.error(`Erro ao buscar posts: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

export async function getPostBySlug(slug: string): Promise<IPost | null> {
	try {
		// Faz a requisição para a API
		const response = await api.get<{ data: IPost[] }>(`/posts`, { params: { slug } });

		logger.info(`Requisição feita para URL: ${process.env.NEXT_PUBLIC_API_URL}/posts`);
		logger.info(`Slug usado: ${slug}`);
		logger.info(`Dados recebidos: ${JSON.stringify(response.data)}`);

		const posts = response.data?.data;

		if (!posts || !Array.isArray(posts) || posts.length === 0) {
			logger.warn(`Nenhum post encontrado para o slug: ${slug}`);
			return null;
		}

		const post = posts[0];
		logger.info(`Post encontrado: ${JSON.stringify(post)}`);

		if (!post.content) {
			logger.error("O campo 'content' está ausente no post retornado.");
			return null;
		}

		// Processa o conteúdo Markdown para HTML
		const processedContent = await remark().use(html).process(post.content);
		post.content = processedContent.toString();

		return post;
	} catch (error: any) {
		logger.error(`Erro ao buscar o post: ${error.message}`);
		return null;
	}
}
