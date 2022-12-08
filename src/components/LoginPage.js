import React, { useState } from "react";
import { Logo } from "./Logo";
import { Notif } from "./Notif";

export const LoginPage = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [mssg, setMssg] = useState(props.notif);

	const onSubmitHandler = (event) => {
		event.preventDefault();
		var re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(username)) {
			setMssg({ message: "", style: "" });
			props.loginHandler(username, password);
		} else {
			setMssg({ message: "Invalid email", style: "danger" });
		}
	};

	const onChangeUsername = (event) => {
		setUsername(event.target.value);
	};

	const onChangePassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<div id="login-page">
			<div id="login">
				<Logo />
				<Notif
					message={mssg.message === "" ? props.notif.message : mssg.message}
					style={mssg.message === "" ? props.notif.style : mssg.style}
				/>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						autoComplete="off"
						onChange={onChangeUsername}
						value={username}
						type="text"
					/>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						autoComplete="off"
						onChange={onChangePassword}
						value={password}
						type="password"
					/>
					<button type="submit" className="btn">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
