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

	try {
		const response = await axios.get<UserDto>("/api/security", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session}`,
			},
		});

		return successResult({
			profile: response.data,
		});
	} catch (e) {
		return errorResult([], `Could not load User's Profile : ${JSON.stringify(e, null, 2)}`);
	}
}, {
	postActionHook: ({result}) => {
		if (!result.error) {
			UserStore.update(s => {
				s.profile = result.payload.profile
			});
		} else {
			console.log(result.message);
		}
	}
});
