import {Config, Context, controller, Get, HttpResponseNotFound, IAppController, render} from "@foal/core";
import {createConnection} from "typeorm";

import {ApiController} from "./controllers";

export class AppController implements IAppController {
	subControllers = [
		controller("/api", ApiController),
	];

	async init() {
		console.log(Config.get("database.host", "string"));
		await createConnection();
	}

	@Get("*")
	renderApp(ctx: Context) {
		if (!ctx.request.accepts("html")) {
			return new HttpResponseNotFound();
		}

		return render("./public/index.html");
	}
}
