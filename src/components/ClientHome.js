import { Account } from "./Account";
import { formatNumber } from "./Utils";
import { useEffect, useState } from "react";
import moment from "moment";

export const ClientHome = (props) => {
	// const { user } = props;
	// console.log(user);
	const [user, setUser] = useState(props.user);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetchUserTransactions();
		fetchAllUsers();
	}, []);

	// function to fetch all users
	const fetchUserTransactions = async () => {
		try {
			const request = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(
				`http://127.0.0.1:3001/transaction/all`,
				request
			);
			const res = await response.json();
			if (res.status === 200) {
				var trsctns = res.data;
				var myTrans = trsctns.filter(
					(item) =>
						item.sender_email === user.email ||
						item.receiver_email === user.email
				);
				const sortedAsc = myTrans.sort((objA, objB) => objB.id - objA.id);
				setTransactions(sortedAsc);
			}
		} catch (error) {
			alert("An error occurred" + error);
		}
	};

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
				var results = res.data;
				for (const x of results) {
					if (x.email === user.email) {
						setUser(x);
					}
				}
			}
		} catch (error) {
			alert("An error occurred" + error);
		}
	};

	const transactionContainer = transactions?.map((transaction, index) => {
		const className = index % 2 === 0 ? "even" : "odd";
		return (
			<div className={`transaction-item ${className}`} key={transaction.id}>
				<div>
					{moment(transaction.date).format("dddd, MMMM Do YYYY, h:mm:ss A")}
				</div>
				<div style={{ textTransform: "capitalize", fontWeight: "bold" }}>
					{transaction.transaction_type}
				</div>
				<div>
					RWF{" "}
					{transaction.type === "debit"
						? formatNumber(transaction.amount * -1)
						: formatNumber(transaction.amount)}
				</div>
			</div>
		);
	});

	return (
		<section id="main-content">
			<h1 className="main">My Account</h1>
			<Account
				type={user?.type}
				accountNumber={user?.number}
				balance={user?.balance}
				fullname={user?.fullname}
			/>
			<div id="transactions">
				<h2>Transactions</h2>
				<div id="transaction-div">{transactionContainer}</div>
			</div>
		</section>
	);
};
