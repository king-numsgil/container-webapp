import "source-map-support/register";

import http from "http";

import {Config, createApp} from "@foal/core";
import {createConnection} from "typeorm";

import {AppController} from "./app/app.controller";

async function main() {
	await createConnection();

	const app = createApp(AppController);

	const httpServer = http.createServer(app);
	const port = Config.get2("port", "number", 3001);
	httpServer.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
