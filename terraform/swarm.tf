data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_instance" "swarm_manager" {
  ami                    = data.aws_ami.amazon_linux_2023.id
  instance_type          = "t3.small"
  subnet_id              = aws_subnet.public_1.id
  vpc_security_group_ids = [aws_security_group.swarm_sg.id]

  # IAM Role if needed for SSM access
  # iam_instance_profile = aws_iam_instance_profile.ssm_profile.name

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user
              
              # Inicializar Docker Swarm Manager
              PRIVATE_IP=$(curl http://169.254.169.254/latest/meta-data/local-ipv4)
              docker swarm init --advertise-addr $PRIVATE_IP
              EOF

  tags = {
    Name = "Docker-Swarm-Manager"
  }
}

resource "aws_instance" "swarm_worker" {
  ami                    = data.aws_ami.amazon_linux_2023.id
  instance_type          = "t3.small"
  subnet_id              = aws_subnet.public_2.id
  vpc_security_group_ids = [aws_security_group.swarm_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install docker -y
              systemctl enable docker
              systemctl start docker
              usermod -aG docker ec2-user
              
              # En un escenario 100% automatizado, este nodo worker
              # leería el token del manager (via SSM o Parameter Store)
              # para unirse automáticamente.
              EOF

  tags = {
    Name = "Docker-Swarm-Worker"
  }
}
