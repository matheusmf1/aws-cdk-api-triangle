const AWS = require( 'aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// @ts-ignore
const main = async ( event, context ) => {
  try {

    const body = JSON.parse( event['body'] );

    const result = checkTriangle( body['side_1'], body['side_2'], body['side_3'] );

    const params = { 
      TableName: `${process.env.Dynamo_Table_Name}`,
      Item: {
        "id": context.awsRequestId,
        "sides": `1: ${body['side_1']}, 2: ${body['side_2']}, 3: ${body['side_3']}`,
        "result": result
      }
    }
    
    await dynamodb.put(params, (err, data) => {

      if (err) {
        console.log("Error on write dynamo data");
      }
      else {
        console.log("Data saved on Dynamo: ", data )
      }
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify( {
        'sides': `1: ${body['side_1']}, 2: ${body['side_2']}, 3: ${body['side_3']}`,
        'result': result
      })
    }
    
  } 
  catch (error) {
    console.log( '-----ERROR-----')
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify( "Something went wrong" )
    }
  }
  
}


// @ts-ignore
const checkTriangle = ( x, y, z ) => {

  //check positive length
  if ( x > 0 && y > 0 && z > 0 ) {

    //check two sides sum
    if ( (x + y >= z) || (x + z >= y) || (y + z >= x) ) {

      if (x === y && x === z) {
        return "Equilateral Triangle";
      }
      else if ( x === y || y === z || z === x ) {
        return "Isosceles Triangle";
      }
      else {
        return "Scalene Triangle";
      }
    }
    else{
      return "Invalid length size";
    }
  }

  else {
    return "Invalid length size, must be positive";
  }

}

module.exports = { main, checkTriangle }