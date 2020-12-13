const {Config} = require("@foal/core");

module.exports = {
	type: "postgres",
	host: Config.get("database.host", "string"),
	port: Config.get("database.port", "number", 5432),
	username: Config.get("database.username", "string"),
	password: Config.get("database.password", "string"),
	database: Config.get("database.database", "string"),
	ssl: process.env.NODE_ENV === "production" ? {
		rejectUnauthorized: false,
		ca: Config.get("database.certificate", "any"),
	} : false,

	dropSchema: Config.get("database.dropSchema", "boolean", false),
	synchronize: Config.get("database.synchronize", "boolean", false),
	uuidExtension: "pgcrypto",

	entities: ["build/app/**/*.entity.js"],
	migrations: ["build/migrations/*.js"],

	cli: {
		migrationsDir: "src/migrations"
	},
}
