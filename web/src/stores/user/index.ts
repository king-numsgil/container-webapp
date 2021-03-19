import {Store} from "pullstate";

export * from "./loadProfile";
export * from "./logout";
export * from "./login";

export type PermissionDto = {
	codename: string;
	description: string;
};

export type GroupDto = {
	id: string;
	name: string;
	permissions: Array<PermissionDto>;
};

export type UserDto = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	createdAt: number;
	updatedAt: number;
	groups: Array<GroupDto>;
	permissions: Array<PermissionDto>;
};

export interface IUserStore {
	session: string | null;
	profile: UserDto | null;
}

export const UserStore = new Store<IUserStore>({
	session: sessionStorage.getItem("token"),
	profile: null,
});
