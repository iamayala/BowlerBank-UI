import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ClientHome } from "./ClientHome";
import { TransferPage } from "./TransferPage";

export const ClientDashboard = (props) => {
	const { logout, client, setClient } = props;
	const [users, setUsers] = useState(props.users);
	const [page, setPage] = useState("home");

	const changePageHandler = (pageName) => {
		setPage(pageName);
		// const currentUser = findAccount(client.number);
		// setClient(currentUser);
	};

	if (page === "home") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					user={client}
					logoutHandler={props.logout}
				/>
				<ClientHome user={client} />
			</main>
		);
	}

	if (page === "transfer") {
		return (
			<main>
				<Sidebar
					changePage={changePageHandler}
					page={page}
					user={client}
					logoutHandler={props.logout}
				/>
				<TransferPage
					isClient="true"
					client={client}
					users={users}
					setUsers={setUsers}
				/>
			</main>
		);
	}
};
