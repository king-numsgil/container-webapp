import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Grid,
	IconButton,
	IconButtonProps,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import React, {Children, cloneElement, FunctionComponent, useRef, VoidFunctionComponent} from "react";
import {FaMoon, FaSun} from "react-icons/fa";
import {ImMenu} from "react-icons/im";

type ColorModeSwitcherProps = Partial<Omit<IconButtonProps, "aria-label">>;

const ColorModeSwitcher: FunctionComponent<ColorModeSwitcherProps> = props => {
	const {toggleColorMode} = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);

	return <IconButton
		aria-label={`Switch to ${text} mode`}
		size="sm"
		variant="ghost"
		color="current"
		icon={<SwitchIcon />}
		onClick={toggleColorMode}
		{...props}
	/>;
}

type NavBarProps = {
	brand: string;
	children: React.ReactElement | Array<React.ReactElement>;
}

export const NavBar: VoidFunctionComponent<NavBarProps> = props => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {colorMode} = useColorMode();

	const btnRef = useRef<HTMLButtonElement>(null);

	if (!props.children) return null;

	return <Box
		as="header"
		bg={colorMode === "light" ? "gray.300" : "gray.700"}
		h="3rem"
	>
		<Grid
			as="nav"
			templateColumns="auto 1fr auto"
			maxW="80em"
			m="0 auto"
			h="100%"
		>
			<Flex
				align="center"
				gridColumn={1}
				pl={{base: 4, xl: 0}}
			>
				<Text fontSize="xl" fontWeight="bold" mr="2">{props.brand}</Text>
			</Flex>

			<Flex
				align="center"
				justify="start"
				gridColumn={2}
				display={{lg: "flex", base: "none"}}
				ml={4}
			>
				{Children.map(props.children, (child, index) => {
					return cloneElement(child, {
						size: "sm",
						mr: 1,
						index
					});
				})}
			</Flex>

			<Flex
				align="center"
				gridColumn={3}
				pr={{base: 4, xl: 0}}
			>
				<Button
					type="button"
					aria-label="Login"
					variant="ghost"
					color="current"
					size="sm"
					ml="2"
				>
					Login
				</Button>
				<ColorModeSwitcher ml="2" />

				<IconButton
					aria-label="Open Navigation Drawer"
					display={{lg: "none", base: "inline-flex"}}
					variant="ghost"
					color="current"
					size="sm"
					ml="2"
					ref={btnRef}
					icon={<ImMenu />}
					onClick={onOpen}
				/>
			</Flex>
		</Grid>

		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Navigation</DrawerHeader>

					<DrawerBody>
						<Flex direction="column">
							{Children.map(props.children, (child, index) => {
								return cloneElement(child, {
									size: "sm",
									w: "100%",
									mb: 1,
									index
								});
							})}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	</Box>;
};
