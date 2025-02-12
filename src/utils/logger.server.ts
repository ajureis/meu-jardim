import pino from "pino";

// Verifica se está em ambiente de desenvolvimento
const isDev = process.env.NODE_ENV !== "production";

const logger = pino({
	level: "info",
	transport: isDev
		? {
				target: "pino-pretty",
				options: { colorize: true }, // Logs coloridos no console no modo dev
		  }
		: undefined, // Logs padrão no console em produção
});

export default logger;
