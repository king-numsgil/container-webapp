import {Context, controller, Get, HttpResponseOK} from "@foal/core";

import {SecurityController} from "./security.controller";

export class ApiController {
	subControllers = [
		controller("/security", SecurityController),
	];

	@Get("/")
	index(ctx: Context) {
		return new HttpResponseOK("Hello world!");
	}
}
