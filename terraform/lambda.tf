data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name               = "rednorte_lambda_exec_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Payload dummy inicial para la función Lambda Serverless
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "lambda_function.zip"
  
  source {
    content  = <<EOF
exports.handler = async (event) => {
    console.log("Evento Serverless recibido:", JSON.stringify(event));
    return {
        statusCode: 200,
        body: JSON.stringify('Procesamiento completado desde AWS Lambda Serverless!'),
    };
};
EOF
    filename = "index.js"
  }
}

resource "aws_lambda_function" "notification_processor" {
  function_name = "rednorte-serverless-function"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  tags = {
    Name = "rednorte-lambda"
  }
}
