import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const logger = pino({
	level: "info",
	transport: isDev
		? {
				target: "pino-pretty",
				options: { colorize: true, translateTime: "dd-mm-yyyy HH:MM:ss" },
		  }
		: undefined, // Logs padrão no console em produção
	base: {
		pid: false, // Remove o ID do processo dos logs
	},
});

export default logger;
