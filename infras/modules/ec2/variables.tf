variable "ec2_instance_type" {
  description = "The instance type of EC2"
  type        = string
  default     = "t2.micro"
}

variable "ec2_ami" {
  description = "The ami of EC2"
  type        = string
}

variable "ec2_tag_name" {
  description = "The tag name of Ec2"
  type        = string
  default     = "app instance"
}

variable "iam_instance_profile_name" {
  type        = string
  description = "The name of the IAM instance profile to attach to the EC2 instance"
}