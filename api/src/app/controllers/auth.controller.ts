import {TypeORMStore} from "@foal/typeorm";
import {getRepository} from "typeorm";
import {
	Context,
	dependency,
	Get,
	hashPassword,
	HttpResponseNoContent,
	HttpResponseOK,
	HttpResponseUnauthorized,
	Post,
	Session,
	TokenRequired,
	ValidateBody,
	verifyPassword
} from "@foal/core";

import {fetchUser, UserEntity} from "../entities";

const credentialsSchema = {
	additionalProperties: false,
	properties: {
		email: {type: "string", format: "email"},
		password: {type: "string"}
	},
	required: ["email", "password"],
	type: "object",
};

const profileSchema = {
	additionalProperties: false,
	properties: {
		email: {type: "string", format: "email"},
		password: {type: "string"},
		firstName: {type: "string"},
		lastName: {type: "string"},
	},
	required: ["email", "password", "firstName", "lastName"],
	type: "object",
};

export class AuthController {
	@dependency
	store!: TypeORMStore;

	@Post("/signup")
	@ValidateBody(profileSchema)
	async signup(ctx: Context) {
		const {email, password, firstName, lastName} = ctx.request.body;

		const repo = getRepository(UserEntity);
		const user = await repo.save(repo.create({
			password: await hashPassword(password),
			email,
			firstName,
			lastName
		}));
		const session = await this.store.createAndSaveSessionFromUser(user);
		return new HttpResponseOK({
			token: session.getToken(),
		});
	}

	@Post("/login")
	@ValidateBody(credentialsSchema)
	async login(ctx: Context) {
		const user = await getRepository(UserEntity).findOne({
			email: ctx.request.body.email,
		}, {
			select: ["password", "email", "id"],
		});

		if (!user) {
			return new HttpResponseUnauthorized();
		}

		if (!await verifyPassword(ctx.request.body.password, user.password)) {
			return new HttpResponseUnauthorized();
		}

		const session = await this.store.createAndSaveSessionFromUser(user);
		return new HttpResponseOK({
			token: session.getToken(),
		});
	}

	@Post("/logout")
	@TokenRequired({extendLifeTimeOrUpdate: false})
	async logout(ctx: Context<any, Session>) {
		await this.store.destroy(ctx.session.sessionID);
		return new HttpResponseNoContent();
	}

	@Get("/me")
	@TokenRequired({user: fetchUser})
	async loadProfile(ctx: Context<UserEntity>) {
		return new HttpResponseOK(ctx.user);
	}
}
