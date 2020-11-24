import {Context, controller, Get, HttpResponseOK} from "@foal/core";
import {AuthController} from "./auth.controller";

export class ApiController {
	subControllers = [
		controller("/auth", AuthController),
	];

	@Get("/")
	index(ctx: Context) {
		return new HttpResponseOK("Hello world!");
	}
}
