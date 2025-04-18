variable "project_name" {
  type = string
  default = "demo"
}

variable "env" {
  type = string
  default = "prod"
}

variable "location" {
  type = string
  default = "East US"
}

variable "node_count" {
  type = number
  default = 1
}

variable "vm_size" {
  type = string
  default = "Standard_B2s"
}
