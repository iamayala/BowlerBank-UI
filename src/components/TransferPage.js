import moment from "moment";
import { useState } from "react";
import { Notif } from "./Notif";
import { formatNumber, getDateToday } from "./Utils";

export const TransferPage = (props) => {
	const { isClient, client, setClient } = props;
	const [users, setUsers] = useState(props.users);
	const [receivers, setReceivers] = useState(users);
	const [sender, setSender] = useState(isClient ? client : { balance: 0 });
	const [receiver, setReceiver] = useState({ balance: 0 });
	const [notif, setNotif] = useState({
		message: "Transfer money from one account to another.",
		style: "left",
	});
	const [transferAmount, setTransferAmount] = useState(0);

	const senderSelected = (event) => {
		const accountNumber = event.target.value;

		let sender = null;

		users.forEach((user) => {
			if (user.number === accountNumber) {
				sender = user;
			}
		});

		const newUsers = users.filter((user, index) => {
			return user.number !== accountNumber;
		});

		setSender(sender);
		setReceivers(newUsers);
		setReceiver({ number: 0, balance: 0 });
	};

	const receiverSelected = (event) => {
		const accountNumber = event.target.value;

		let receiver = null;

		users.forEach((user) => {
			if (user.number === accountNumber) {
				receiver = user;
			}
		});

		setReceiver(receiver);
	};

	let senders = null;
	if (!isClient) {
		senders = users.map((user) => {
			return (
				<option value={user.number}>
					{user.fullname} #{user.number}
				</option>
			);
		});
	}

	const newReceivers = receivers.map((receiver) => {
		if (sender.number !== receiver.number && receiver.isAdmin === 0) {
			return (
				<option value={receiver.number}>
					{receiver.fullname} #{receiver.number}
				</option>
			);
		}
	});

	const transferFund = (event) => {
		event.preventDefault();
		const amount = parseFloat(
			event.target.elements.amount.value.replace(/,/g, "")
		);
		if (amount <= 0) return false;

		if (sender.number !== 0 && receiver.number !== 0 && receiver.number) {
			// deduct from sender
			let senderSuccess = false;
			users.forEach((user) => {
				if (user.number === sender.number) {
					if (user.balance - amount >= 0) {
						user.balance -= amount;

						UpdateUser(user.balance, user);

						senderSuccess = true;

						setSender(user);

						setNotif({
							message: "This happened",
							style: "danger",
						});
					}
				}
			});

			// add to receiver
			if (senderSuccess) {
				users.forEach((user) => {
					if (user.number === receiver.number) {
						user.balance += amount;

						UpdateUser(user.balance, user);

						var data = {
							title: `Fund transfer from ${sender.fullname} #${receiver.number}`,
							amount: amount,
							type: 3,
							date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
							sender: sender.id,
							receiver: receiver.id,
						};

						createTransaction(data);

						setReceiver(user);
					}
				});

				setNotif({ message: "Successful transfer.", style: "success" });
				setUsers(users);
				props.setUsers(users);
				setTransferAmount(0);
			} else {
				setNotif({ message: "Transfer failed.", style: "danger" });
			}
		} else {
			setNotif({
				message: "Incomplete information. Missing sender or receiver.",
				style: "danger",
			});
		}
	};

	const UpdateUser = async (amount, user) => {
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
			if (res.status === 200) {
				// setSender(user);
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
				setNotif({ message: "Successful transfer.", style: "success" });
			}
		} catch (error) {
			setNotif({
				message: "Error: " + error,
				style: "danger",
			});
		}
	};

	const onTransfer = (e) => {
		const transfer = parseFloat(e.target.value.replace(/,/g, "")) || 0;
		setTransferAmount(transfer);
	};

	let senderField = (
		<select onChange={senderSelected} name="sender">
			<option>Select Sender</option>
			{senders}
		</select>
	);

	if (isClient) {
		senderField = (
			<input
				type="text"
				name="sender"
				value={`${client.fullname} #${client.number}`}
				disabled
			/>
		);
	}

	return (
		<section id="main-content">
			<form id="form" onSubmit={transferFund}>
				<h1>Fund Transfer</h1>

				<Notif message={notif.message} style={notif.style} />
				<h2>Sender</h2>
				<label>From (Sender)</label>
				{senderField}

				<label>Current balance</label>
				<input
					type="text"
					className="right"
					value={formatNumber(sender?.balance)}
					disabled
				/>

				<label>Amount to Transfer</label>
				<input
					type="text"
					name="amount"
					value={formatNumber(transferAmount)}
					onChange={onTransfer}
					autoComplete="off"
					className="right big-input"
				/>

				<div className="transfer-icon">
					<i className="bx bx-down-arrow-alt"></i>
				</div>
				<h2>Receiver</h2>
				<label>To (Receiver)</label>
				<select
					value={receiver.number || 0}
					onChange={receiverSelected}
					name="receiver"
				>
					<option>Select Receiver</option>
					{newReceivers}
				</select>
				<input type="submit" className="btn" value="Transfer Fund" />
			</form>
		</section>
	);
};
