# Bowler Bank

## The Last Markdown Editor, Ever

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Bowler Banking is a web platform where you can access the details of your bank account and complete transactions directly from your browser. It allows you to view your current balance and transaction history, initiate transfers to other accounts, and do more. The following are the requirements that are provided prior to building the web application.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

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

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin           | README                                    |
| ---------------- | ----------------------------------------- |
| Dropbox          | [plugins/dropbox/README.md][pldb]         |
| GitHub           | [plugins/github/README.md][plgh]          |
| Google Drive     | [plugins/googledrive/README.md][plgd]     |
| OneDrive         | [plugins/onedrive/README.md][plod]        |
| Medium           | [plugins/medium/README.md][plme]          |
| Google Analytics | [plugins/googleanalytics/README.md][plga] |

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
