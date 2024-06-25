# THIS FILE: contains the Terraform configs that applies to all environments or common resource configs.

module "chekromlek_dev" {
  source     = "./environments/production"
  account_id = var.account_id
}

