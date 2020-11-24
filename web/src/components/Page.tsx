import React, {FunctionComponent} from "react";
import {Button, Flex} from "@chakra-ui/react";
import {NavBar} from "./NavBar";

export const Page: FunctionComponent = props => {
	const {children} = props;

	return <>
		<NavBar brand="Numsgil Co">
			<Button
				type="button"
				aria-label="Login"
				variant="outline"
				color="current"
			>
				Home
			</Button>
		</NavBar>

		<Flex
			as="section"
			direction="column"
			align="center"
		>
			{children}
		</Flex>
	</>;
};
