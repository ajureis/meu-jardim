import logger from "@/utils/logger.server";
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

// Definição dos tipos para melhor controle
interface ApiError extends AxiosError {
	response?: AxiosResponse & {
		data?: { message?: string };
		status?: number;
		statusText?: string;
	};
}

// Criação da instância Axios com configurações padrão
const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:3042",
	timeout: 10000, // Tempo limite de resposta (10 segundos)
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptor para logs de requisição
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		logger.info(`Fazendo requisição para: ${config.url}`);
		return config;
	},
	(error: AxiosError) => {
		logger.error(`Erro na requisição: ${error.message}`);
		return Promise.reject(error);
	}
);

// Interceptor para tratamento de erros na resposta
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: ApiError) => {
		logger.error("Erro na resposta da API:", error);
		if (error.response) {
			logger.error(
				`Erro ${error.response.status}: ${
					error.response.data?.message || error.response.statusText
				}`
			);
		} else {
			logger.error("Erro ao conectar ao servidor");
		}
		return Promise.reject(error);
	}
);

export default api;
