import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Login from "./Screens/Login";
import Landing from "./Screens/Landing";
import TopNavbar from "./Components/TopNavbar";

export default function App() {
	return (
		<div className="App">
			<Router>
				<TopNavbar />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/landing" element={<Landing />} />
				</Routes>
			</Router>
		</div>
	)
}
