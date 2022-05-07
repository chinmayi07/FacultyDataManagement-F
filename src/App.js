import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Login from "./Screens/Login";
import Landing from "./Screens/Landing";

export default function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/landing" element={<Landing />} />
				</Routes>
			</Router>
		</div>
	)
}
