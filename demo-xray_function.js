const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { SNS } = require('@aws-sdk/client-sns');

const AWSXRay = require('aws-xray-sdk-core');

const dynamodb = AWSXRay.captureAWSv3Client(new DynamoDB());

const sns = AWSXRay.captureAWSv3Client(new SNS());

exports.handler = async function (event, context) {
  const segment = AWSXRay.getSegment();
  
  const subsegment = segment.addNewSubsegment("Result");
  try {
    const number = parseInt(Math.floor(Math.random() * 10) + 1);
    if(number % 2 == 0) {
      var response = await  dynamodb.putItem({
        TableName: 'demo-xray',
        Item: {
          'awsRequestId': {
            S: context.awsRequestId
          },
          'number': {
            N: number.toString()
          },
          'lambdaName': {
            S: 'demo-xray'
          }
        }
      });
    } else {
      var response = await sns.publish({
        TopicArn: 'arn:aws:sns:us-east-1:864613434505:demo-xray',
        Message: JSON.stringify({
          number: number
        })
      });
    }
    subsegment.addAnnotation("data", JSON.stringify(response));
    subsegment.close();
    console.log(response);
    return {
      number: number,
      response: response
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}