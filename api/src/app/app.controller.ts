import {Context, controller, createHttpResponseFile, Get, HttpResponseNotFound} from "@foal/core";

import {ApiController} from "./controllers";

export class AppController {
	subControllers = [
		controller("/api", ApiController),
	];

	@Get('*')
	renderApp(ctx: Context) {
		if (!ctx.request.accepts("html")) {
			return new HttpResponseNotFound();
		}

		return createHttpResponseFile({
			directory: './public',
			file: 'index.html'
		});
	}
}
