output "kube_config" {
  value = azurerm_kubernetes_cluster.this.kube_config_raw
  sensitive = true
}

output "postgres_host" {
  value = azurerm_postgresql_flexible_server.this.fqdn
}
