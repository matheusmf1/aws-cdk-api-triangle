const cdk = require('aws-cdk-lib');
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const iam = require("aws-cdk-lib/aws-iam");


class AwsCdkApiTriangleStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);


    // Dynamo table definition
    const table = new dynamodb.Table( this, "api-triangle", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING }
    });

    // lambda function triangle classification
    const mainLambda = new lambda.Function( this, "TriangleClassification", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "lambda_triangle.main",
      environment: {
        Dynamo_Table_Name: table.tableName
      }
    });

    // permission to lambda access dynamo table
    table.grantReadWriteData( mainLambda );

    const getResultLambda = new lambda.Function( this, "api-triangle-historic", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "lambda_getResult.main",
      environment: {
        Dynamo_Table_Name: table.tableName
      }
    });

    //Required permissions for Lambda function to interact with DynamoDB table
    const tableReadPermissionPolicy = new iam.PolicyStatement(
      {
        actions: [ "dynamodb:Scan" ],
        resources: [table.tableArn]
      }
    );
    
    //Attaching an inline policy to the role
    getResultLambda.role?.attachInlinePolicy(
      new iam.Policy(this, `API-Triangle-DynamoDBTableReadPermissions`, {
        statements: [tableReadPermissionPolicy],
      }),
    );

    // create API Gateway
    const apigtw = new apigateway.RestApi( this, "cdk-api" );
    
    apigtw.root
      .resourceForPath("triangle-api")
      .addMethod("POST", new apigateway.LambdaIntegration( mainLambda ));

    apigtw.root
      .resourceForPath("triangle-api")
      .addMethod("GET", new apigateway.LambdaIntegration( getResultLambda ));
  

    // Outputs, to check the URL from api
    new cdk.CfnOutput( this, "HTTP API URL", {
      value: apigtw.url ?? "Something went wrong creating the API Gateway"
    });

  }

}

module.exports = { AwsCdkApiTriangleStack }
