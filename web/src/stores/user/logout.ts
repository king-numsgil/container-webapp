import {createAsyncAction, errorResult, successResult} from "pullstate";
import axios from "axios";

import {UserStore} from "./";

export const logout = createAsyncAction<{
	session: string | null
}>(async ({session}) => {
	if (session === null) {
		return successResult();
	}

	try {
		await axios.delete("/api/security", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session}`,
			},
		});

		return successResult();
	} catch (e) {
		return errorResult([], `Could not delete session : ${JSON.stringify(e, null, 2)}`);
	}
}, {
	postActionHook: ({result}) => {
		UserStore.update(s => {
			s.session = null;
			s.profile = null;
		});
		sessionStorage.removeItem("token");

		if (result.error) {
			console.error(result.message);
		}
	}
});
