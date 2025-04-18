provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "this" {
  name     = "${var.project_name}-${var.env}-rg"
  location = var.location
}

resource "azurerm_virtual_network" "this" {
  name                = "${var.project_name}-${var.env}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
}

resource "azurerm_subnet" "this" {
  name                 = "${var.project_name}-${var.env}-subnet"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_kubernetes_cluster" "this" {
  name                = "${var.project_name}-${var.env}-aks"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  dns_prefix          = "${var.project_name}-${var.env}"

  default_node_pool {
    name       = "default"
    node_count = var.node_count
    vm_size    = var.vm_size
    vnet_subnet_id = azurerm_subnet.this.id
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = var.env
    project     = var.project_name
  }
}

resource "azurerm_postgresql_flexible_server" "this" {
  name                   = "${var.project_name}-${var.env}-pg"
  resource_group_name    = azurerm_resource_group.this.name
  location               = azurerm_resource_group.this.location
  administrator_login    = var.db_admin
  administrator_password = var.db_password
  sku_name               = "B1ms"
  version                = "13"
  storage_mb             = 32768

  authentication {
    password_auth_enabled = true
  }

  delegated_subnet_id = azurerm_subnet.this.id

  depends_on = [azurerm_subnet.this]
}
