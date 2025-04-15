# Full-Stack Deployment on Azure with Django, React, PostgreSQL, and Kubernetes

## Project Overview
A cloud-native deployment pipeline for a full-stack application (Django + React + PostgreSQL) on Azure, featuring:
- **Infrastructure-as-Code**: Azure VM + K3s cluster provisioned via Terraform
- **Containerization**: Dockerized Django backend and React frontend
- **Orchestration**: Kubernetes deployments with persistent storage
- **CI/CD Automation**: Jenkins pipeline for build/deploy workflows (future implementation)

---

## Key Components
| Component           | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Azure VM**         | Hosts lightweight K3s Kubernetes cluster                                    |
| **K3s**              | Production-grade Kubernetes distribution optimized for resource efficiency |
| **PostgreSQL**       | Database (containerized or Azure Database for PostgreSQL)                   |
| **Django API**       | Backend container with Gunicorn/ASGI server                                 |
| **React Frontend**   | Static assets served via Nginx container                                    |
| **Jenkins**          | CI/CD automation server (to be deployed post-demo)                          |
| **Azure Container Registry** | Private Docker image storage                                            |

---

## Deployment Phases

### 1. Infrastructure Provisioning (Terraform)
- **Azure Resources**:  
  1. **Resource Group**  
   - Central container for all resources
  
2. **Virtual Network (VNet)**  
   - Private network space
   - Isolated environment for all components

3. **Kubernetes Cluster (AKS)**  
   - Managed Kubernetes service

4. **PostgreSQL Database**  
   - Flexible Server with VNet integration
     
### 2. Application Containerization
- **Django**:  
  - Multi-stage build for Python dependencies
  - Environment variables for database/config
    
- **React**:  
  - Optimized production build with caching
  - Nginx reverse proxy configuration
    
- **Registry**:  
  - Images pushed to Azure Container Registry (ACR)
  - Versioned using Git commit hashes

### 3. Kubernetes Deployment (Jenkins Pipeline)
- **Cluster Configuration**:  
  - Namespace isolation (`prod`/`staging`)
  - Deployment objects with readiness probes
  - Services (ClusterIP for internal communication)
  - PersistentVolumeClaims for PostgreSQL
    
- **Jenkins Workflow** (Future Implementation):  
  - Pipeline-as-Code (`Jenkinsfile`)
  - Automated image builds on Git push
  - Canary deployment strategy
  - Rollback on failed health checks


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

