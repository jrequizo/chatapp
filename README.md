# ChatApp + micro-services

Welcome to the ChatApp Micro-service Tech Exploration Project! 

The purpose of this project is to explore web technologies and refine our development process in lead-up to developing an MVP for Mera Technology.



# Dependencies

This project requires the following dependencies:
- [Nodejs14 or higher](https://nodejs.org/en/download/)
- [gcloud CLI](https://cloud.google.com/sdk/docs/install)
- **Your GMail account granted the Secret Accessor permission on the Google Cloud Project.**

### Contact me if you need your GMail added.
Or you could make your own Google Cloud Project and modify the environment variables :)


# Setup

### Forking the repo & updating submodule remotes

When you fork this monorepo, the submodules aren't automatically forked. **You will have to fork the submodules individually.**

After forking the monorepo and its submodules , clone the monorepo using `git fork --recurse-submodule https://github.com/<your username here>/chatapp.git`. 

This will clone the submodules as well, but the .gitsubmodules will still point to the original repos. You will have to manually edit the url in `.gitmodules` to point to your forks e.g. `url = https://github.com/<your username here>/chatapp-client.git`. After editing the path locations, you will need to sync the url's using `git submodule sync` and then committing/pushing the changes to your remote.


### To build the application:

1. Install the above dependencies
2. Authenticate on the gcloud CLI by running `gcloud auth login` .
	- Check if you've been added to the project using `gcloud projects list` .
4. Select the project using `gcloud config set project chatapp-development-349608` . 
5. Initialize the packages using either **Option A** or **Option B**

### Option A
1. Run `npm i` in the root directory of the repository.
2. Run `npm run install:packages` in the root directory of the repository.

### Option B
1. Run `install-packages.sh`

# Running

## Windows 10/11

To run the application using a development build, use either **Option A** or **Option B**

### Option A
1. Use `npm run start` in a console of your choice (e.g. Visual Studio Code terminal).
	- Alternatively, use `npm run start:client` and `npm run start:services`

### Option B
1. Run `run-app.sh` .
	- Alternatively, run `run-client.sh` and `run-services.sh` .
	- To close the process(es), use Ctrl+C. If you receive a `PORT ALREADY IN USE` error, consider checking if the Node JS process is still running using Task Manager or your OS equivalent.

## Macos
Navigate to the base folder of the repository. Within the repository you might have to make the `run-app-linux.sh`, `run-client-linux.sh`, and `run-services-linux.sh` executable.

You can make it executable by typing in the command `chmod +x run-<service:name>-linux.sh`

Once it's executable, launch the microservice chatapp `./run-<service:name>-linux.sh`

You can close the process(es) using `Ctrl+C`

## Linux

Same steps as the Macos.

# Frameworks
This application uses [ReactJS](https://reactjs.org/) for the frontend and Express with [tRPC](https://trpc.io/) for the backend. The socket service uses the [Socket.IO](https://socket.io/) websocket implementation. The backend applications make liberal use of [Zod](https://github.com/colinhacks/zod#introduction) for schema validation.

All services use [Typescript](https://www.typescriptlang.org/).


### **Links to the documentation for each service can be found here:**
- [Typescript](https://www.typescriptlang.org/docs/)
- [ReactJS](https://reactjs.org/docs/getting-started.html)
- [tRPC](https://trpc.io/docs)
	- The server layer uses `@trpc/server` while the client layer uses `@trpc/react` which is built on top of [react-query](https://tanstack.com/query/v4/docs/adapters/react-query)
- [Zod](https://github.com/colinhacks/zod#basic-usage)
- [Socket.IO](https://socket.io/docs/v4/)

# Project Management
The project roadmap and task tracking can be found on our [JIRA](https://requizo.atlassian.net/jira/software/projects/CHAT/boards/1) and [Confluence](https://requizo.atlassian.net/wiki/spaces/CHATAPP/overview?homepageId=164048).



# Extra Notes

### Running on a local Docker container
To run on a local Docker container, you have to provide your own GCP account key.
When you run `gcloud auth application-default login`, the console will output `Credentials saved to file: [<file path>]`. Navigate to this file path and copy the `application_default_credentials.json` into the root directory of the service (e.g. `api/.` or `chat-socket/.` and re-name it to `key.json`.