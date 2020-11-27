import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {Router, View} from "react-navi";
import React, {Suspense} from "react";
import ReactDOM from "react-dom";

import Routes from "./pages";

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode="dark" />

		<ChakraProvider>
			<Router routes={Routes}>
				<Suspense fallback={null}>
					<View/>
				</Suspense>
			</Router>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
