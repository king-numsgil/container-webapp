import React, {Children, cloneElement, FunctionComponent, useRef, useState, VoidFunctionComponent} from "react";
import {Controller, useForm} from "react-hook-form";
import {FaMoon, FaSun} from "react-icons/fa";
import {useNavigation} from "react-navi";
import {ImMenu} from "react-icons/im";
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
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useMediaQuery
} from "@chakra-ui/react";

import {CredentialsDto, loadProfileFromSession, loginFromCredentials, logout, UserStore} from "../stores";

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

const LoginButton: VoidFunctionComponent = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const initialFocusRef = useRef<HTMLInputElement>(null);

	const {control, handleSubmit, reset} = useForm<CredentialsDto>();
	const nav = useNavigation();

	const onSubmit = async (credentials: CredentialsDto) => {
		setIsLoading(true);
		const result = await loginFromCredentials.run({credentials});
		if (result.error) {
			alert("Wrong Credentials!");
			reset();
			setIsLoading(false);
		} else {
			setIsLoading(false);
			onClose();
		}
	};

	return <>
		<Button
			type="button"
			aria-label="Login"
			variant="ghost"
			color="current"
			size="sm"
			ml={2}
			onClick={onOpen}
		>
			Login
		</Button>

		<Modal
			initialFocusRef={initialFocusRef}
			closeOnOverlayClick={false}
			scrollBehavior="outside"
			onClose={onClose}
			isOpen={isOpen}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Enter your Credentials</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({onChange, value}) => <Input
								onChange={onChange}
								value={value}
								type="email"
								placeholder="Email"
								ref={initialFocusRef}
								required
								isDisabled={isLoading}
							/>}
						/>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							rules={{
								minLength: 6,
								pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
							}}
							render={({onChange, value}) => <Input
								onChange={onChange}
								value={value}
								type="password"
								placeholder="Password"
								mt={3}
								required
								isDisabled={isLoading}
								minLength={6}
							/>}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							variant="ghost"
							mr={3}
							isLoading={isLoading}
							onClick={async event => {
								event.preventDefault();
								onClose();
								await nav.navigate("/account/signup");
							}}
						>
							Signup
						</Button>
						<Button colorScheme="blue" type="submit" isLoading={isLoading}>
							Login
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	</>;
}

type NavBarProps = {
	brand: string;
	children: React.ReactElement | Array<React.ReactElement>;
}

export const NavBar: VoidFunctionComponent<NavBarProps> = props => {
	const [isUsingDrawer] = useMediaQuery("(max-width: 62em)");
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {colorMode} = useColorMode();

	const btnRef = useRef<HTMLButtonElement>(null);

	const userStore = UserStore.useState();
	const [profileFinished, profileResult, profileUpdating] = loadProfileFromSession.useBeckon({session: userStore.session});

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

			{!isUsingDrawer && <Flex
				align="center"
				justify="start"
				gridColumn={2}
				ml={4}
			>
				{Children.map(props.children, (child, index) => {
					return cloneElement(child, {
						size: "sm",
						mr: 1,
						index
					});
				})}
			</Flex>}

			<Flex
				align="center"
				gridColumn={3}
				pr={{base: 4, xl: 0}}
			>
				{userStore.session === null && <LoginButton />}
				{userStore.session !== null && <Button
					type="button"
					aria-label="Logout"
					variant="ghost"
					color="current"
					size="sm"
					ml={2}
					onClick={async () => await logout.run({session: userStore.session})}
				>
					Logout
				</Button>}
				<ColorModeSwitcher ml="2" />

				{isUsingDrawer && <>
					<IconButton
						aria-label="Open Navigation Drawer"
						variant="ghost"
						color="current"
						size="sm"
						ml="2"
						ref={btnRef}
						icon={<ImMenu />}
						onClick={onOpen}
					/>

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
				</>}
			</Flex>
		</Grid>
	</Box>;
};
