import {IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {fetchUserWithPermissions} from "@foal/typeorm";
import {ValidateBody} from "@foal/typestack";
import {
	Context,
	createSession,
	dependency,
	Get,
	hashPassword,
	HttpResponseOK,
	HttpResponseUnauthorized,
	Post,
	Store,
	UserRequired,
	UseSessions,
	verifyPassword
} from "@foal/core";

import {User} from "../entities";
import {Match} from "../utils";

class CredentialsDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "password too weak"})
	password!: string;
}

class RegisterDto extends CredentialsDto {
	@IsString()
	@MinLength(6)
	@Match("password")
	confirm!: string;

	@IsString()
	@MinLength(2)
	@MaxLength(32)
	firstName!: string;

	@IsString()
	@MinLength(2)
	@MaxLength(32)
	lastName!: string;
}

@UseSessions({
	user: fetchUserWithPermissions(User),
})
export class SecurityController {
	@dependency
	store!: Store;

	@Post("/signup")
	@ValidateBody(RegisterDto)
	async signup(ctx: Context<User>) {
		const body = ctx.request.body as RegisterDto;
		const user = await User.create({
			email: body.email,
			password: await hashPassword(body.password),
			firstName: body.firstName,
			lastName: body.lastName,
		}).save();

		ctx.session = await createSession(this.store);
		ctx.session.setUser(user);

		return new HttpResponseOK({
			token: ctx.session.getToken(),
		});
	}

	@Post("/login")
	@ValidateBody(CredentialsDto)
	async login(ctx: Context<User>) {
		const body = ctx.request.body as CredentialsDto;
		const user = await User.findOne({
			where: {email: body.email},
			select: ["id", "password"],
		});

		if (!user) {
			return new HttpResponseUnauthorized();
		}

		if (!await verifyPassword(body.password, user.password)) {
			return new HttpResponseUnauthorized();
		}

		ctx.session = await createSession(this.store);
		ctx.session.setUser(user);

		return new HttpResponseOK({
			token: ctx.session.getToken(),
		});
	}

	@Post("/logout")
	@UserRequired()
	async logout(ctx: Context<User>) {
		if (ctx.session) {
			await ctx.session.destroy();
		}

		return new HttpResponseOK();
	}

	@Get("/")
	@UserRequired()
	async getProfile(ctx: Context<User>) {
		return new HttpResponseOK(ctx.user);
	}
}
