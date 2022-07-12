# ChatApp (Micro-service)

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

To run the application using a development build, use either **Option A** or **Option B**

### Option A
1. Use `npm run start` in a console of your choice (e.g. Visual Studio Code terminal).
	- Alternatively, use `npm run start:client` and `npm run start:services`

### Option B
1. Run `run-app.sh` .
	- Alternatively, run `run-client.sh` and `run-services.sh` .
	- To close the process(es), use Ctrl+C. If you receive a `PORT ALREADY IN USE` error, consider checking if the Node JS process is still running using Task Manager or your OS equivalent.
