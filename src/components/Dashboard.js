import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { CreateAccountPage } from "./CreateAccountPage";
import { TransferPage } from "./TransferPage";
import { TransactPage } from "./TransactPage";

export const Dashboard = (props) => {
	const [page, setPage] = useState("home");
	const [users, setUsers] = useState(props.users);
	const [notif, setNotif] = useState({ message: "", style: "" });
	const [editingUser, setEditingUser] = useState(null);
	const [deleteUser, setDeleteUser] = useState(null);
	const [editModal, setEditModal] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [newAccount, setNewAccount] = useState(null);
	const [accountType, setAccountType] = useState([]);

	const fetchAccountType = async () => {
		try {
			const request = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			};

			const response = await fetch(
				`http://127.0.0.1:3001/account_type/all`,
				request
			);
			const res = await response.json();
			if (res.status === 200) {
				setAccountType(res.data);
			}
		} catch (error) {
			alert("An error occurred" + error);
		}
	};

	useEffect(() => {
		fetchAccountType();
	}, []);

	const changePageHandler = (pageName) => {
		setPage(pageName);

		if (pageName === "withdraw") {
			setNotif({
				message: "Select an account to withdraw money from.",
				style: "left",
			});
		}

		if (pageName === "deposit") {
			setNotif({
				message: "Select an account to deposit money.",
				style: "left",
			});
		}
	};

	useEffect(() => {
		if (deleteUser !== null) {
			deleteUserAccount(deleteUser);
		}
	}, [deleteUser]); // eslint-disable-line react-hooks/exhaustive-deps

	const deleteUserAccount = async (data) => {
		try {
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data.email),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/users/delete`,
				request
			);
			const res = await response.json();
			console.log(res);
			if (res.status === 200) {
				const filteredUsers = users.filter(
					(user, index) => index !== deleteUser
				);
				setUsers(filteredUsers);
				setDeleteUser(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isUpdate) {
			const filteredUsers = users.map((user, index) => {
				if (user.number === newAccount.number) {
					user = { ...user, ...newAccount };
				}
				return user;
			});

			setUsers(filteredUsers);
			setIsUpdate(false);
			// save
			localStorage.setItem("users", JSON.stringify(filteredUsers));
		}
	}, [isUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

	let modal = null;
	if (editingUser !== null && editModal) {
		const user = users[editingUser];
		modal = (
			<AccountEditModal
				accountName={user.fullname}
				accountNumber={user.number}
				accountEmail={user.email}
				accountPassword={user.password}
				balance={user.balance}
				setEditModal={setEditModal}
				setIsUpdate={setIsUpdate}
				setNewAccount={setNewAccount}
			/>
		);
	}

	if (page === "home") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					logoutHandler={props.logoutHandler}
				/>
				<MainContent
					users={users}
					editingUser={editingUser}
					setEditModal={setEditModal}
					setEditingUser={setEditingUser}
					setDeleteUser={setDeleteUser}
					client={props.client}
				/>
				{modal}
			</main>
		);
	}

	if (page === "create-account") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					logoutHandler={props.logoutHandler}
				/>
				<CreateAccountPage
					users={users}
					setUsers={setUsers}
					accountType={accountType}
				/>
			</main>
		);
	}

	if (page === "transfer") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					logoutHandler={props.logoutHandler}
				/>
				<TransferPage users={users} setUsers={setUsers} />
			</main>
		);
	}

	if (page === "deposit") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					logoutHandler={props.logoutHandler}
				/>
				<TransactPage
					users={users}
					setUsers={setUsers}
					notif={notif}
					setNotif={setNotif}
					type="add"
					page={page}
					client={props.client}
				/>
			</main>
		);
	}

	if (page === "withdraw") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					logoutHandler={props.logoutHandler}
				/>
				<TransactPage
					users={users}
					setUsers={setUsers}
					notif={notif}
					setNotif={setNotif}
					type="subtract"
					page={page}
					client={props.client}
				/>
			</main>
		);
	}
};

const AccountEditModal = (props) => {
	const {
		accountName,
		accountNumber,
		accountEmail,
		accountPassword,
		balance,
		setEditModal,
		setNewAccount,
		setIsUpdate,
	} = props;
	const [account, setAccount] = useState({
		fullname: accountName,
		number: accountNumber,
		balance: balance,
		email: accountEmail,
		password: accountPassword,
	});

	const closeModal = () => {
		setEditModal(false);
	};

	const updateAccount = (e) => {
		e.preventDefault();
		setNewAccount(account);
		updateUserAccount(account);
	};

	const updateUserAccount = async (data) => {
		try {
			const request = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			const response = await fetch(
				`http://127.0.0.1:3001/users/update`,
				request
			);
			const res = await response.json();
			console.log(res);
			if (res.status === 200) {
				setIsUpdate(true);
				setEditModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const editAccountName = (e) => {
		const name = e.target.value;
		setAccount({ ...account, ...{ fullname: name } });
	};

	const editAccountNumber = (e) => {
		const number = e.target.value;
		setAccount({ ...account, ...{ number: number } });
	};

	const editAccountBalance = (e) => {
		const balance = e.target.value;
		setAccount({ ...account, ...{ balance: parseInt(balance) || 0 } });
	};

	return (
		<div className="overlay">
			<div className="modal">
				<form onSubmit={updateAccount}>
					<h2 className="title">Edit Account</h2>
					<label>Account name</label>
					<input
						name="account-name"
						onChange={editAccountName}
						value={account.fullname}
						autoComplete="off"
					/>

					<label>Account number</label>
					<input
						type="text"
						name="amount"
						onChange={editAccountNumber}
						disabled
						value={account.number}
						autoComplete="off"
					/>

					<label>Balance</label>
					<input
						type="text"
						name="balance"
						onChange={editAccountBalance}
						value={account.balance}
						autoComplete="off"
					/>

					<button
						type="button"
						onClick={() => closeModal()}
						className="btn2 btn-muted"
					>
						Cancel
					</button>
					<button type="submit" className="btn2">
						Update Account
					</button>
				</form>
			</div>
		</div>
	);
};
