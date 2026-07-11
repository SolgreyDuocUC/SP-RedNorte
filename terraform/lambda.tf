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
  # En AWS Academy (Learner Lab), debes usar el LabRole que ya está creado y proveído.
  # No tienes permisos para crear nuevos roles (aws_iam_role)
  role          = data.aws_iam_role.lab_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  tags = {
    Name = "rednorte-lambda"
  }
}
