import axios from "axios";

// Criação da instância Axios com configurações padrão
const api = axios.create({
	baseURL: "http://localhost:3042", // Defina a base da API
	timeout: 10000, // Tempo limite de resposta (10 segundos)
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Interceptor para logs de requisição
api.interceptors.request.use(
	(config) => {
		console.log(`Fazendo requisição para: ${config.url}`);
		return config;
	},
	(error) => {
		console.error("Erro na requisição:", error);
		return Promise.reject(error);
	}
);

// Interceptor para tratamento de erros na resposta
api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("Erro na resposta da API:", error);
		if (error.response) {
			console.error(
				`Erro ${error.response.status}: ${
					error.response.data?.message || error.response.statusText
				}`
			);
		} else {
			console.error("Erro ao conectar ao servidor");
		}
		return Promise.reject(error);
	}
);

export default api;
