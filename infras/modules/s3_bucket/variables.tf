variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "account_id" {
  description = "Account ID of AWS"
  type        = string
}

variable "iam_role_name" {
  description = "IAM Role name that should have access to the bucket"
  type        = string
}

# VARIABLE: in terraform is the same as Programming Language