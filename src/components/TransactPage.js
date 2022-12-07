import moment from "moment";
import { useState } from "react";
import { Notif } from "./Notif";
import { formatNumber, trim, capitalize } from "./Utils";

export const TransactPage = (props) => {
	const { users, type, client } = props;
	const setNotif = props.setNotif;
	const notif = props.notif;
	const [accounts, setAccounts] = useState(users);
	const [selectedAccount, setSelectedAccount] = useState({ balance: 0 });
	const [depositAmount, setDepositAmount] = useState(0);

	const options = accounts.map((user) => {
		return (
			<option value={user.number}>
				{user.fullname} #{user.number}
			</option>
		);
	});

	const displayBalance = (e) => {
		setNotif(notif);
		const selectedNumber = e.target.value;

		for (const user of accounts) {
			if (user.number === selectedNumber) {
				setSelectedAccount(user);
				break;
			}
		}
	};

	const onDeposit = (e) => {
		const amount = formatNumber(trim(e.target.value));
		setDepositAmount(amount);
	};

	const processTransfer = (e) => {
		e.preventDefault();
		const amount = trim(e.target.elements.amount.value);
		const accountNumber = e.target.elements.account.value;

		if (amount > 0 && accountNumber !== "0") {
			for (const user of accounts) {
				if (user.number === accountNumber) {
					var data = "";
					if (type === "add" || type === "credit") {
						user.balance += amount;
						data = {
							amount: amount,
							type: 1,
							date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
							sender: user.id,
							receiver: client.id,
						};
					} else if (type === "subtract" || type === "debit") {
						user.balance -= amount;
						data = {
							amount: amount,
							type: 2,
							date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
							sender: client.id,
							receiver: user.id,
						};
					}
					UpdateUser(user.balance, user, data);

					break;
				}
			}
		} else {
			setNotif({
				message: `${capitalize(props.page)} failed.`,
				style: "danger",
			});
		}
	};

	const UpdateUser = async (amount, user, data) => {
		try {
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					password: user.password,
					fullname: user.fullname,
					email: user.email,
					balance: amount,
				}),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/users/update`,
				request
			);
			const res = await response.json();
			console.log(res.data);
			if (res.status === 200) {
				setDepositAmount(0);
				createTransaction(data);
			}
		} catch (error) {
			setNotif({
				message: "Error: " + error,
				style: "danger",
			});
		}
	};

	const createTransaction = async (data) => {
		try {
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/transaction/create`,
				request
			);
			const res = await response.json();
			console.log(res.data);
			if (res.status === 200) {
				setNotif({
					message: `${capitalize(props.page)} successful.`,
					style: "success",
				});
			}
		} catch (error) {
			setNotif({
				message: "Error: " + error,
				style: "danger",
			});
		}
	};

	// 'bx bx-up-arrow-alt'
	const icon =
		props.page === "withdraw" ? "bx bx-down-arrow-alt" : "bx bx-up-arrow-alt";

	return (
		<section id="main-content">
			<form id="form" onSubmit={processTransfer}>
				<h1>{props.page}</h1>
				<Notif message={notif.message} style={notif.style} />
				<label>Account</label>
				<select name="account" onChange={displayBalance}>
					<option value="0">Select Account</option>
					{options}
				</select>

				<label>Current balance</label>
				<input
					type="text"
					className="right"
					value={formatNumber(selectedAccount.balance)}
					disabled
				/>

				<div className="transfer-icon">
					<i className={icon}></i>
				</div>
				<label>Amount to {props.page}</label>
				<input
					type="text"
					name="amount"
					value={depositAmount}
					onChange={onDeposit}
					autoComplete="off"
					className="right big-input"
				/>
				<button type="submit" className="btn">
					{props.page}
				</button>
			</form>
		</section>
	);
};
