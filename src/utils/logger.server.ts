import pino from "pino";

// Verifica se está em ambiente de desenvolvimento
const isDev = process.env.NODE_ENV !== "production";

const logger = pino(
	{
		level: "info",
		transport: isDev
			? {
					target: "pino-pretty",
					options: { colorize: true },
			  }
			: undefined,
	},
	isDev ? undefined : pino.destination("./logs/app.log")
); // Só salva logs no arquivo em produção

export default logger;
