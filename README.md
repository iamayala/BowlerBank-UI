# Bowler Bank

## Developed by Serge Mayala, 22950

Bowler Banking is a web platform where you can access the details of your bank account and complete transactions directly from your browser. It allows you to view your current balance and transaction history, initiate transfers to other accounts, and do more. The following are the requirements that are provided prior to building the web application.

## Functional Requirements

Functional Requirements for Bowler Banking are subdivided into two access levels: Customer Mode and Admin Mode:

### Customer

Functional Requirements for Bowler Banking are subdivided into two access levels: Customer Mode and Admin Mode:

- Sign in with email and password.
- View balance.
- View personal history of transactions.
- Transfer money.
- Logout.

### Admin

The one who manages and administers day-to-day functions of a bank. Ensure qualitative services to bank customers. Therefore they will be provided with the following functional requirements:

- Sign in with email and password.
- Change password.
- Register new bank customers.
- View customer information.
- Manage customer accounts.
- Manage deposit and withdraw
- Manage money transfer
- Logout

## Non-Functional Requirements

For Bowler Bank, the most important non-functional requirements include security, performance, usability, and availability.

- _Security_. Bank management systems are notorious for being subject to malicious attacks, so security is the major requirement for the system. Unauthorised access to the data is not permissible. The data must be backed up daily and stored in a secured location, at a distance from different facilities of the system.
- _Performance_. The system must be a multi-client. This means that it must reach response time targets for each of the clients during simultaneous calls and must be able to run a target number of transactions per second without failure.
- _Usability_. The system must provide different graphical interfaces for customers, and admins. All system interfaces must be user-friendly and simple to learn, including helping hints and messages and intuitive workflow, especially in a client interface: the client must be able to quickly learn and use the interface without prior knowledge of banking terminology or rules.
- _Availability_. The system must be available during bank working hours.

This text you see here is \*actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Technologies used

- [ReactJS] - USed to Build the front-end web application
- [NodeJS & Express] - Used to build the API Application
- [MySQL] - To build the database and tables

## Installation

### React App (Front-End)

Please clone the project on [this repo](https://github.com/iamayala/BowlerBank-UI.git)

Install the dependencies

```sh
npm install
```

Run the project

```sh
npm start
```

After starting, your browser should run the project on

```sh
http://localhost:3000/
```


### React App (Back-End)

Please clone the project on [this repo](https://github.com/iamayala/BowlerBank-API.git)

Install the dependencies

```sh
npm install
```

Run the project

```sh
npm start
```

After starting, your browser should run the project on

```sh
http://localhost:3001/
```

For reading the Swagger Documentation, please use the following URL

```sh
http://localhost:3001/api-docs
```

