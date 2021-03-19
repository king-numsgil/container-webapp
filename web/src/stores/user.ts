import {Store, createAsyncAction, successResult, errorResult} from "pullstate";
import axios from "axios";

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

export const loadProfileFromSession = createAsyncAction<{
	session: string | null;
}, {
	profile: UserDto;
}>(async ({session}) => {
	if (session === null) {
		return errorResult([], "Could not load User's Profile : not logged in");
	}

	const response = await axios.get<UserDto>("/api/security", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session}`,
		},
	});

	if (response.status == 200) {
		return successResult({
			profile: response.data,
		});
	} else {
		return errorResult([], `Could not load User's Profile : ${response.status} => ${response.statusText}`);
	}
}, {
	postActionHook: ({result}) => {
		if (!result.error) {
			UserStore.update(s => s.profile = result.payload.profile);
		}
	}
});
