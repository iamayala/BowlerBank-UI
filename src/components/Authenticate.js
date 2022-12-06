import React, { useEffect, useState } from "react";
import DATA from "../data";
import { Dashboard } from "./Dashboard";
import { LoginPage } from "./LoginPage";
import { ClientDashboard } from "./ClientDashboard";

export const Authenticate = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notif, setNotif] = useState({ message: "", style: "" });
	const [isAdmin, setIsAdmin] = useState(false);
	const [client, setClient] = useState(null);
	const [clients, setClients] = useState([]);
	const localUsers = localStorage.getItem("users");

	useEffect(() => {
		fetchAllUsers();
	}, []);

	// function to fetch all users
	const fetchAllUsers = async () => {
		try {
			const request = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(`http://127.0.0.1:3001/users/all`, request);
			const res = await response.json();
			if (res.status === 200) {
				setClients(res.data);
				if (!localUsers) {
					localStorage.setItem("users", JSON.stringify(res.data));
				}
			}
		} catch (error) {
			alert("An error occurred" + error);
		}
	};

	const login = async (username, password) => {
		try {
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: username, password }),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/users/login`,
				request
			);
			const res = await response.json();
			if (res.status === 404) {
				setNotif({ message: "Wrong username and password.", style: "danger" });
			} else if (res.status === 200) {
				setIsLoggedIn(true);
				var user = res.data[0];
				if (user.isAdmin) {
					setIsAdmin(true);
					setClient(user);
				} else {
					setIsAdmin(false);
					setClient(user);
				}
				setNotif("");
			}
		} catch (error) {
			alert("An error occurred" + error);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		setIsAdmin(false);
		setNotif({ message: "You have logged out.", style: "success" });
	};

	if (isLoggedIn) {
		if (isAdmin) {
			return (
				<Dashboard users={clients} logoutHandler={logout} client={client} />
			);
		} else {
			return (
				<ClientDashboard
					client={client}
					users={clients}
					setClient={setClient}
					logout={logout}
				/>
			);
		}
	} else {
		return (
			<LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
		);
	}
};
