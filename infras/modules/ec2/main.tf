# EC2 creation
resource "aws_instance" "app_instance" {
  ami                  = var.ec2_ami
  instance_type        = var.ec2_instance_type
  iam_instance_profile = var.iam_instance_profile_name
  key_name             = "chekromlek-instance"

  tags = {
    Name = var.ec2_tag_name
  }
}

# COMMENT THIS OUT AFTER FIRST APPLY
