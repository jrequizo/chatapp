# ChatApp (Micro-service)

Welcome to the ChatApp Micro-service Tech Exploration Project! 

The purpose of this project is to explore web technologies and refine our development process in lead-up to developing an MVP for Mera Technology.

This project requires the following to enable it to run:


---
#### Dependencies
- [Nodejs14 or higher](https://nodejs.org/en/download/)
- [gcloud CLI](https://cloud.google.com/sdk/docs/install)


---
### Setup

## To build the application:

1. Install the above dependencies
2. Authenticate on the gcloud CLI by running `gcloud auth login`.
3. Initialize the packages using either Option A or B

**Option A**

a. Run `npm i` in the root directory of the repository.

b. Run `npm run install:packages` in the root directory of the repository.

**Option B**

a. Run `install-packages.sh`

## To run the application using a development build:

**Option A**

Use `npm run start` (or `npm run start:client` + `npm run start:services`) in a console of your choice (e.g. VSCode console).

**Option B**

Run `run-app.sh` (or `run-client.sh` + `run-services.sh`).

