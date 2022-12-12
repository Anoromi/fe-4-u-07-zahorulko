import React from "react"
import ReactDOM from "react-dom/client"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import Forecast from "./forecast"

import "./index.scss"
import Login from "./login"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/forecast" element={<Forecast />} />
				{/* <Route path="/about" element={<About />}/> */}
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
	// <React.StrictMode>
	//   <App />
	// </React.StrictMode>
)
