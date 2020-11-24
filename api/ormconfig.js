const {Config} = require("@foal/core");

module.exports = {
	type: "postgres",
	host: Config.get2("database.host", "string"),
	port: Config.get2("database.port", "number", 5432),
	username: Config.get2("database.username", "string"),
	password: Config.get2("database.password", "string"),
	database: Config.get2("database.database", "string"),
	ssl: process.env.NODE_ENV === "production" ? {
		rejectUnauthorized: false,
		ca: Config.get2("database.certificate", "any"),
	} : null,
	dropSchema: Config.get2("database.dropSchema", "boolean", false),
	uuidExtension: "pgcrypto",
	entities: ["build/app/**/*.entity.js"],
	migrations: ["build/migrations/*.js"],
	cli: {
		migrationsDir: "src/migrations"
	},
	synchronize: Config.get2("database.synchronize", "boolean", false)
}
