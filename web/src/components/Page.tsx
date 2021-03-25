import {Button, ButtonProps, Flex} from "@chakra-ui/react";
import React, {FunctionComponent} from "react";
import {useNavigation} from "react-navi";
import {URLDescriptor} from "navi";
import {NavBar} from "./NavBar";

interface NavButtonProps extends Exclude<ButtonProps, "type" | "aria-label" | "variant" | "color" | "onClick"> {
	label: string;
	target: string | Partial<URLDescriptor>;
}

const NavButton: FunctionComponent<NavButtonProps> = props => {
	const {
		label,
		target,
		...rest
	} = props;

	const nav = useNavigation();

	return <Button
		type="button"
		aria-label={label}
		variant="outline"
		color="current"
		onClick={async event => {
			event.preventDefault();
			await nav.navigate(target);
		}}
		{...rest}
	>
		{label}
	</Button>;
};

export const Page: FunctionComponent = props => {
	const {children} = props;

	return <>
		<NavBar brand="Numsgil Co">
			<NavButton label="Home" target="/" />
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
