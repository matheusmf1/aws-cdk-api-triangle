# Welcome to the Triangle API Classificatiojn using AWS CDK

## Prerequisites

* AWS Account
* AWS CLI configured on your machine
* AWS CDK configured on your machine
* NodeJS configured on your machine
* npm configured on your machine

## How to run the application

* `npm install` --> Install application dependencies
* `cdk deploy` --> Deploy aws infrastructure and code into your default AWS account/region
* `npm test` --> To run unit tests
* `npx aws-cdk destroy` --> To destroy your deployed stack
  

## API Endpoints
* When you deploy your stack, the URL generated from API Gateway will be shown as output.
* To access the API-Resource, just add in the end of the URL the path for the resource `/triangle-api`
* Example of url, https://RANDOM.execute-api.us-east-1.amazonaws.com/prod/triangle-api
* The API has mathods POST and GET
  
## How to use the API 
  * **Method POST**:
  The below JSON is an example of body  
  ```json
  {
    "side_1":10,
    "side_2":12,
    "side_3":15
  }
  ```

  * **Method GET**:
  The code below is an example of return to get the historic of results 
  ```json
  [
    {
        "sides": "1: 10, 2: 12, 3: 15",
        "result": "Scalene Triangle",
        "id": "2dfc0a68-bd0e-43b9-a144-a16957ae7e61"
    }
]
  ```

## What was implemented from the requirements

### 1. API
  * It should be a REST API with a single POST endpoint that receives a JSON containing the lengths of the 3 sides of the triangle.
   * It should answer a JSON response with the triangle type (equilateral, isosceles, or scalene)
   * Must be created an API endpoint to get history from database
   * Bonus points if it is on AWS API Gateway

### 2. Code
  * Implement the solution using NodeJS
  * Create validation for input values
  * Tests must be implemented
    * Unit test
  
### 3. Database
  * Each result must be saved on a database table
  * Bonus points if it is saved on an AWS managed database - Used DynamoDB

### 4. Monitoring
* The application must have logs (especially for errors)
  * It must be on AWS CloudWatch

### 5. Infrastructure
* Bonus points if it is represented by code 6. Documentation
* How to run the application
*  How to run tests
*  API endpoints description