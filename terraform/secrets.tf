resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "aws_secretsmanager_secret" "db_credentials" {
  name                    = "despachos-db-credentials"
  recovery_window_in_days = 0 # Force deletion immediately for lab environments
}

resource "aws_secretsmanager_secret_version" "db_credentials_version" {
  secret_id = aws_secretsmanager_secret.db_credentials.id
  secret_string = jsonencode({
    username             = "admin"
    password             = random_password.db_password.result
    despacho_db_name     = "bd_despachos"
    despacho_db_user     = "despacho_user"
    despacho_db_password = random_password.db_password.result
    ventas_db_name       = "bd_ventas"
    ventas_db_user       = "ventas_user"
    ventas_db_password   = random_password.db_password.result
  })
}
