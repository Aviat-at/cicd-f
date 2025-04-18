variable "project_name" {
  type        = string
  description = "Project name for resource naming"
}

variable "env" {
  type        = string
  description = "Environment name (dev, staging, prod)"
}

variable "location" {
  type    = string
  default = "East US"
}

variable "node_count" {
  type    = number
  default = 1
}

variable "vm_size" {
  type    = string
  default = "Standard_B2s"
}

variable "db_admin" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}
