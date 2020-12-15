import "source-map-support/register";

import {Config, createApp} from "@foal/core";
import * as http from "http";

import {AppController} from "./app/app.controller";

async function main() {
	const app = await createApp(AppController);

	const httpServer = http.createServer(app);
	const port = Config.get("port", "number", 3001);
	httpServer.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});
}

main().catch(err => {
	console.error(err.stack);
	process.exit(1);
});
