import { useState } from "react";
import { Notif } from "./Notif";
import { formatNumber, trim } from "./Utils";

export const CreateAccountPage = (props) => {
	const { accountType } = props;
	const createRandomAccount = () => {
		return Math.floor(1000000000 + Math.random() * 9000000000);
	};

	const [notif, setNotif] = useState({
		message: "Create a new client account.",
		style: "left",
	});
	const [initialBalance, setInitialBalance] = useState(0);
	const [initialAccountNumber, setInitialAccountNumber] = useState(
		createRandomAccount()
	);

	const createNewAccount = (event) => {
		event.preventDefault();
		const input = event.target.elements;

		const user = {
			email: input.email.value,
			password: input.password.value,
			fullname: input.fullname.value,
			account_type: input.accountType.value,
			number: input.accountNumber.value,
			isAdmin: false,
			balance: trim(input.initialBalance.value),
		};

		const emptyInputs = Object.values(user).filter((input) => {
			return input === "";
		});

		const localUsers = props.users;

		let alreadyExists = false;
		localUsers.forEach((row) => {
			if (row.email === user.email) {
				alreadyExists = true;
			}
		});

		if (alreadyExists) {
			setNotif({
				message: "This email already exists. Try again.",
				style: "danger",
			});
			return false;
		} else if (emptyInputs.length > 0) {
			setNotif({ message: "All fields are required.", style: "danger" });
			return false;
		} else {
			setNotif("");
			handleCreateAccount(event, user);
			return true;
		}
	};

	const handleCreateAccount = async (event, data) => {
		try {
			console.log(data);
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/users/create`,
				request
			);
			const res = await response.json();
			if (res.status === 200) {
				event.preventDefault();
				const user = event.target.elements;
				user.email.value = "";
				user.password.value = "";
				user.fullname.value = "";
				user.accountNumber.value = setInitialAccountNumber(
					createRandomAccount()
				);
				user.initialBalance.value = setInitialBalance(0);
				setNotif({ message: "Successfully saved.", style: "success" });
			}
		} catch (error) {
			setNotif({ message: "An error occured." + error, style: "danger" });
		}
	};

	const onInitialBalance = (event) => {
		const amount = trim(event.target.value) || 0;
		setInitialBalance(amount);
	};

	return (
		<section id="main-content">
			<form id="form" onSubmit={createNewAccount}>
				<h1>Create Account</h1>
				<Notif message={notif.message} style={notif.style} />
				<label htmlFor="fullname">Full name</label>
				<input id="fullname" type="text" autoComplete="off" name="fullname" />
				<hr />
				<label htmlFor="account-number">Account # (Randomly Generated)</label>
				<input
					id="account-number"
					name="accountNumber"
					className="right"
					value={initialAccountNumber}
					type="number"
					disabled
				/>

				<label htmlFor="balance">Initial balance</label>
				<input
					id="balance"
					type="text"
					value={formatNumber(initialBalance)}
					onChange={onInitialBalance}
					name="initialBalance"
					className="right"
				/>

				<label htmlFor="account-type">Account Type</label>
				<select name="accountType">
					{accountType.map((item, index) => {
						return (
							<option
								key={index}
								value="Checking Account"
								style={{ textTransform: "capitalize" }}
							>
								{item.type_name}
							</option>
						);
					})}
				</select>
				<hr />
				<label htmlFor="email">Email Address</label>
				<input id="email" type="email" name="email" autoComplete="off" />
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					autoComplete="off"
				/>
				<input value="Create Account" className="btn" type="submit" />
			</form>
		</section>
	);
};
