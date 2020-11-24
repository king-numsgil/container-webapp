import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
