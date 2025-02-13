import api from "@/utils/api";
import logger from "@/utils/logger.server";
import { IPost, ICategoryProps } from "@/types/types";

interface GetPostsByCategoryResponse {
	data: IPost[];
	prev: number | null;
	next: number | null;
}

export async function getPostsByCategory(
	categorySlug: string,
	page = 1,
	perPage = 6
): Promise<GetPostsByCategoryResponse> {
	try {
		const response = await api.get<GetPostsByCategoryResponse>("/posts", {
			params: { categorySlug, _page: page, _per_page: perPage },
		});

		logger.info(`Requisição feita para URL: ${process.env.NEXT_PUBLIC_API_URL}/posts`);
		logger.info(`Dados recebidos: ${JSON.stringify(response.data)}`);

		const categoryData = response.data?.data;
		if (!categoryData) {
			logger.warn(`Nenhum post encontrado para a categoria: ${categorySlug}`);
			return { data: [], prev: null, next: null };
		}
		logger.info(`Posts encontrados: ${categoryData.length}`);

		return response.data;
	} catch (error: any) {
		logger.error(`Erro ao buscar posts da categoria: ${error.message}`);
		return { data: [], prev: null, next: null };
	}
}

export async function getCategories(): Promise<ICategoryProps[]> {
	try {
		const response = await api.get<ICategoryProps[]>("/categories");

		if (!response.data.length) {
			logger.warn("Nenhuma categoria encontrada.");
			return [];
		}

		logger.info(`Categorias carregadas: ${response.data.length}`);
		return response.data;
	} catch (error: any) {
		logger.error(`Erro ao buscar categorias: ${error.message}`);
		return [];
	}
}
