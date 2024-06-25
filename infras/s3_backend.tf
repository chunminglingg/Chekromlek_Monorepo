resource "aws_s3_bucket" "backend_bucket" {
  bucket = "chekromlek-state-bucket"

  tags = {
    Name = "Terraform State Bucket"
  }
}


resource "aws_s3_bucket_versioning" "backend_bucket_versioning" {
  bucket = aws_s3_bucket.backend_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Example of managing encryption in a compliant manner if the above is deprecated
resource "aws_s3_bucket_server_side_encryption_configuration" "backend_bucket_encryption" {
  bucket = aws_s3_bucket.backend_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}