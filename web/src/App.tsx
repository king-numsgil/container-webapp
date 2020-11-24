import {Page} from "./components/Page";
import {Box} from "@chakra-ui/react";
import React, {FunctionComponent} from "react";

export const App: FunctionComponent = () => {
	return <Page title="Home">
		<Box bg="tomato" maxW="80em" w="100%" p={4} color="white">
			Hello!
		</Box>
	</Page>;
}
