import { Account } from "./Account";
import React, { useEffect, useState } from "react";

export const MainContent = (props) => {
	const { users, client } = props;
	const { editingUser, setEditingUser, setEditModal, setDeleteUser } = props;
	const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState(users);

	useEffect(() => {
		setIsCurrentUserAdmin(client.isAdmin);
	}, [isCurrentUserAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

	const onSearchUser = (e) => {
		setQuery(e.target.value);
		const query = e.target.value;
		const res = users.filter((item) =>
			item.number.toLowerCase().includes(query)
		);
		setSearchResults(res);
	};

	const bankAccounts = users.map((user, index) => {
		return (
			<Account
				key={index}
				index={index}
				fullname={user.fullname}
				type={user.type}
				isAdmin={isCurrentUserAdmin}
				accountNumber={user.number}
				balance={user.balance}
				editingUser={editingUser}
				setEditingUser={setEditingUser}
				setEditModal={setEditModal}
				setDeleteUser={setDeleteUser}
			/>
		);
	});

	const searchBankAccounts = searchResults.map((user, index) => {
		return (
			<Account
				key={index}
				index={index}
				fullname={user.fullname}
				type={user.type}
				isAdmin={isCurrentUserAdmin}
				accountNumber={user.number}
				balance={user.balance}
				editingUser={editingUser}
				setEditingUser={setEditingUser}
				setEditModal={setEditModal}
				setDeleteUser={setDeleteUser}
			/>
		);
	});

	return (
		<section id="main-content">
			<div
				style={{
					flexDirection: "row",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<h1 className="main">Accounts</h1>
			</div>
			{query === "" ? bankAccounts : searchBankAccounts}
		</section>
	);
};
