# Full-Stack Deployment on Azure with Django, React, PostgreSQL, and Kubernetes

## Project Overview
A cloud-native deployment pipeline for a full-stack application (Django + React + PostgreSQL) on Azure, featuring:

- **Infrastructure-as-Code**: Azure VM + K3s cluster provisioned via Terraform  
- **Containerization**: Dockerized Django backend and React frontend  
- **Orchestration**: Kubernetes deployments with persistent storage  
- **CI/CD Automation**:  
  - **CI**: GitHub Actions for build and image publishing  
  - **CD**: Jenkins pipeline for deployment workflows  

## Key Components

| Component | Description |
|-----------|-------------|
| AKS Cluster | Managed Kubernetes service with auto-scaling |
| PostgreSQL | Database (containerized or Azure Database) |
| Django API | Backend container with Gunicorn/ASGI |
| React Frontend | Static assets served via Nginx |
| Jenkins | CD automation server for deployments |
| GitHub Actions | CI automation for builds |
| ACR | Azure Container Registry for Docker images |

## Deployment Phases

### 1. Infrastructure Provisioning (Terraform)

**Azure Resources:**
- **Resource Group**  
  Central container for all resources  
- **Virtual Network (VNet)**  
  Private network space for components  
- **Kubernetes Cluster (AKS)**  
  Managed Kubernetes service  
- **PostgreSQL Database**  
  Flexible Server with VNet integration  

### 2. Application Containerization

**Django:**
- Multi-stage Docker build  
- Environment variables for configuration  
- Security scanning in build process  

**React:**
- Optimized production build  
- Nginx with proper caching headers  

**Registry:**
- Images built and pushed to ACR via GitHub Actions  
- Tags based on Git commit SHA  

### 3. CI Pipeline (GitHub Actions)

**Workflow Triggers:**
- On push to main branch  
- On pull requests  

**CI Steps:**
1. **Build & Test**  
   - Install Python/Node dependencies  
   - Run unit tests for Django/React  
   - Build production assets  

2. **Container Build**  
   - Build Docker images for backend/frontend  
   - Scan images for vulnerabilities  

3. **Registry Push**  
   - Authenticate with ACR  
   - Push images with `git-commit-sha` tags  
   - Additional `latest` tag for main branch  

### 4. CD Pipeline (Jenkins) (Future Implementation): 

**Deployment Workflow:**
1. **Trigger Conditions**  
   - Successful CI completion  
   - Manual approval for production  
2. **Cluster Configuration**  
3. **Deployment Strategies**  
4. **Post-Deployment**  

  
#

## Application Overview
WorkWise  
An Employee and Machine Management System to streamline communication across shifts, manage machine maintenance, and schedule jobs based on shipping dates. test

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

