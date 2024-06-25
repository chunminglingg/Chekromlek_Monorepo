module "ec2_instance" {
  source                    = "../../modules/ec2"
  ec2_ami                   = "ami-04b70fa74e45c3917"
  ec2_instance_type         = "t2.micro"
  ec2_tag_name              = "chekromlek instance"
  iam_instance_profile_name = module.ec2_s3_iam_role.instance_profile_name
}

module "s3_bucket" {
  source        = "../../modules/s3_bucket"
  bucket_name   = "chekromlek-resource"
  account_id    = var.account_id
  iam_role_name = "USER_SERVICE"
}

module "ec2_s3_iam_role" {
  source           = "../../modules/iam"
  iam_role_service = "ec2.amazonaws.com"
  iam_role_name    = "USER_SERVICE"
}