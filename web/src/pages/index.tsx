import {compose, mount, route, withView} from "navi";
import {Page} from "../components/Page";
import {View} from "react-navi";
import React from "react";

import Account from "./account";

export default compose(
	withView(() => <Page><View/></Page>),
	mount({
		"/": route({
			title: "Home - Numsgil Co",
			getView: () => import("./Home"),
		}),
		"/account": Account,
	}),
);
