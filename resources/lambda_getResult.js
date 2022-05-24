const AWS = require( 'aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// @ts-ignore
exports.main = async ( event, context ) => {
  try {

    const params = { 
      TableName: `${process.env.Dynamo_Table_Name}`, 
    }

    const historicData = await dynamodb.scan( params ).promise();

    return {
      statusCode: 200,
      body: JSON.stringify( historicData["Items"] )
    }
    
  }
  catch (error) {
    console.log( '-----ERROR-----')
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify( "Something went wrong while fetching the data" )
    }
  }
  
}