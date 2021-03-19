import {createAsyncAction, errorResult, successResult} from "pullstate";
import axios from "axios";

import {UserDto, UserStore} from "./";

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
		}
	}
});
