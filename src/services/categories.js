import api from "@/utils/api";
import logger from "@/utils/logger.server";

export async function getPostsByCategory(categorySlug, page = 1, perPage = 6) {
	try {
		const response = await api.get("/posts", {
			params: { categorySlug, _page: page, _per_page: perPage },
		});

		if (!response.data || response.data.length === 0) {
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

		logger.info(`Categorias carregadas: ${response.data.length}`);
		return response.data;
	} catch (error) {
		logger.error(`Erro ao buscar categorias: ${error.message}`);
		return [];
	}
}
