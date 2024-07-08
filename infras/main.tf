# THIS FILE: contains the Terraform configs that applies to all environments or common resource configs.

module "chekromlek_dev" {
  source     = "./environments/production"
  account_id = var.account_id
}

terraform {
  backend "s3" {
    bucket         = "chekromlek-state-bucket"
    key            = "terraform/state"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "chekromlek-lock-table"
  }
}