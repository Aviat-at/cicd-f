# Project Title

WorkWise  
An Employee and Machine Management System to streamline communication across shifts, manage machine maintenance, and schedule jobs based on shipping dates. test

## Table of Contents
- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
  - [How to run the server](#how-to-run-the-server)
  - [How to run the frontend](#how-to-run-the-frontend)

## Project Overview

WorkWise is designed to simplify communication and management in a company environment with multiple shifts and machines. The application provides:
- Machine maintenance ticketing
- Job scheduling based on priorities (such as shipping dates)
- Employee management and communication
- Department management system for better collaboration.

## Features
- **Employee Shift Management**: Easily manage employees across different shifts.
- **Machine Ticketing System**: Track machine maintenance and service tickets.
- **Job Scheduling**: Manage job schedules with shipping dates and priorities.
- **Department Management**: Enable department-based task and communication tracking.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Django REST Framework (Python), PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **CI/CD**: GitHub Actions

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Python 3.x](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

## How to run the server
- **Install the virtual env**: python -m venv venv
- **Active the virtual environment**: source venv/bin/activate
- **Install Django**: pip install Django
- **Change the folder**: cd workwise-01/backend/
- **Install dependencies**: pip install -r requirements.txt
- **Then run the server**: python manage.py runserver
- You can confirm it on a web browser with the url, http://127.0.0.1:8000
- **Run test**: python manage.py test

## How to run the frontend
- **Change the folder**:cd workwise-01/frontend/
- **Install dependencies**: npm install
- **Run the application**: npm start
- You can see the application on the browser