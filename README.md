# CSI-3450 - SYB Bank

By Samantha Bracellari, Jakob Short, and Olivia Yee

## What You Need

Before you can build this project, you'll have to install some packages and modules. Version numbers should not matter (except for Python) as long as they are either the latest version or the most recent LTS version. Python will require any version of 3.7.

### Browsers

- Since we are using `Selenium`, this project is set to run on `Mozilla Firefox`. Make sure you have that installed (the regular edition, not the developer edition).

### For the Frontend

- `NodeJS` 
- `npm` - the Node package manager

### For the Backend

- `Python` version 3.7.xx
- `pip` - the Python package manager
- `flask` - a lightweight web framework for python
- `flask-cors` - to allow cross origin requests
- `selenium` - a browser web driver
- `geckodriver` - the driver for Firefox

Installation instructions are not provided as they will change depending on your operating system. Note however that if you're running Windows, you'll have to add Node and Python to your `PATH` if you don't already have them.

## How to Build

To build this project is quite simple. First, navigate into the `react` folder and run an `npm install`, and then an `npm start`. The first command will install any dependencies that are located in the `package-lock.json`, as well as dependencies of those dependencies. If this is your first time building the project, this might take a while. The second command will start up the frontend locally on port 3000 and open a browser with `localhost:3000`. You can close this window though, as the proper Firefox window will be opened upon successful startup of the backend.

To run the backend, simply navigate to the `Server` folder and run a `python main.py`. This will spin up a local server on port 5000 as well as open a new Firefox browser on `localhost:3000`. After that, the project should be running and ready for use.
