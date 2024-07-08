#!/bin/bash

# Update package list
sudo apt-get update

# Install Erlang (dependency for RabbitMQ)
sudo apt-get install -y erlang

# Add the official RabbitMQ repository and key
echo 'deb http://www.rabbitmq.com/debian/ testing main' | sudo tee /etc/apt/sources.list.d/rabbitmq.list
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -

# Install RabbitMQ
sudo apt-get update
sudo apt-get install -y rabbitmq-server

# Enable and start RabbitMQ service
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server

# Enable the management plugin
sudo rabbitmq-plugins enable rabbitmq_management

# Add a user (adjust 'myuser' and 'mypassword' as needed)
sudo rabbitmqctl add_user myuser mypassword
sudo rabbitmqctl set_user_tags myuser administrator
sudo rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"

# Delete default user
sudo rabbitmqctl delete_user guest

echo "RabbitMQ setup complete."