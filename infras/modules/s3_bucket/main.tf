# S3 Bucket Creation
resource "aws_s3_bucket" "chekromlek_resource" {
  bucket = var.bucket_name
}


# Bucket Policy
resource "aws_s3_bucket_policy" "chekromlek_resource_policy" {
  bucket = aws_s3_bucket.chekromlek_resource.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${var.account_id}:role/${var.iam_role_name}"
        }
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "arn:aws:s3:::${aws_s3_bucket.chekromlek_resource.bucket}/*"
      }
    ]
  })
}