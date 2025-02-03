import api from "@/utils/api";
import logger from "@/utils/logger.server";

import { remark } from "remark";
import html from "remark-html";

export async function getAllPosts(page = 1, perPage = 7) {
	try {
		const response = await api.get("/posts", {
			params: { _page: page, _per_page: perPage },
		});

		if (!response.data.data.length) {
			logger.warn("Nenhum post encontrado.");
			return { data: [], prev: null, next: null };
		}

		return response.data;
	} catch (error) {
		logger.error(`Erro ao buscar posts: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

export async function getPostBySlug(slug) {
	try {
		const response = await api.get(`/posts`, { params: { slug } });

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
	} catch (error) {
		logger.error(`Erro ao buscar o post: ${error.message}`);
		return null;
	}
}
