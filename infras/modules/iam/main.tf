resource "aws_iam_role" "ec2_s3_iam_role" {
  name = var.iam_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = var.iam_role_service // Modify this as needed, e.g., "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole",
      },
    ],
  })
}

# IAM instance profile reference the IAM Role
resource "aws_iam_instance_profile" "ec2_s3_instance_profile" {
  name = "${var.iam_role_name}-profile"
  role = aws_iam_role.ec2_s3_iam_role.name
}