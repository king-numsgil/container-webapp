const {Config} = require("@foal/core");

module.exports = {
	type: "postgres",
	url: Config.get2("database.url", "string"),
	dropSchema: Config.get2("database.dropSchema", "boolean", false),
	uuidExtension: "pgcrypto",
	entities: ["build/app/**/*.entity.js"],
	migrations: ["build/migrations/*.js"],
	cli: {
		migrationsDir: "src/migrations"
	},
	synchronize: Config.get2("database.synchronize", "boolean", false)
}
