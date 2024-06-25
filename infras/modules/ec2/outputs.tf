output "ec2_id" {
  value       = aws_instance.app_instance.id
  description = "The id of EC2"
}