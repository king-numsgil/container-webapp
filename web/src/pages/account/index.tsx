import {mount, route} from "navi";
import React from "react";

export default mount({
	"/signup": route({
		title: "Signup - Numsgil Co",
		getView: () => import("./Signup"),
	}),
});
