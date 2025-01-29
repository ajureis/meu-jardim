const isServer = typeof window === "undefined";

let logger;

if (isServer) {
	// Importação condicional no lado do servidor
	const { createLogger, format, transports } = require("winston");

	logger = createLogger({
		level: "info",
		format: format.combine(format.timestamp(), format.json()),
		transports: [
			new transports.File({ filename: "logs/error.log", level: "error" }),
			new transports.File({ filename: "logs/combined.log" }),
		],
	});

	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple()),
		})
	);
} else {
	// No frontend, usar console.log para evitar erro de módulo fs
	logger = {
		info: (...args) => console.log("[INFO]:", ...args),
		warn: (...args) => console.warn("[WARN]:", ...args),
		error: (...args) => console.error("[ERROR]:", ...args),
	};
}

export default logger;
