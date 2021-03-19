import {createAsyncAction, errorResult, successResult} from "pullstate";
import axios from "axios";

import {UserStore} from "./";

type SessionResponse = {
	token: string;
}

export type CredentialsDto = {
	email: string;
	password: string;
}

export const loginFromCredentials = createAsyncAction<{
	credentials: CredentialsDto
}, {
	token: string;
}>(async ({credentials}) => {
	try {
		const response = await axios.post<SessionResponse>("/api/security", credentials, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return successResult({
			token: response.data.token,
		});
	} catch (e) {
		return errorResult([], `Could not login : ${JSON.stringify(e, null, 2)}`);
	}
}, {
	postActionHook: ({result}) => {
		if (!result.error) {
			UserStore.update(s => {
				s.session = result.payload.token;
			});
			sessionStorage.setItem("token", result.payload.token);
		} else {
			console.error(result.message);
		}
	}
});
