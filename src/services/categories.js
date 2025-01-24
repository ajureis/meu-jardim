import api from "../utils/api";
import logger from "@/logger";

export async function getPostsByCategory(categorySlug, page = 1, perPage = 6) {
	try {
		const response = await api.get("/posts", {
			params: { categorySlug, _page: page, _per_page: perPage },
		});

		if (!response.data.data.length) {
			logger.warn(`Nenhum post encontrado para a categoria: ${categorySlug}`);
			return { data: [], prev: null, next: null };
		}

		return response.data;
	} catch (error) {
		logger.error(`Erro ao buscar posts da categoria: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

export async function getCategories() {
	try {
		const response = await api.get("/categories");

		if (!response.data.length) {
			logger.warn("Nenhuma categoria encontrada.");
			return [];
		}

		return response.data;
	} catch (error) {
		logger.error(`Erro ao buscar categorias: ${error.message}`);
		return [];
	}
}
