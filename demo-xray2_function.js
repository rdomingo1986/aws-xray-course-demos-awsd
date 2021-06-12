const { DynamoDB } = require('@aws-sdk/client-dynamodb');

const { S3 } = require('@aws-sdk/client-s3');

const AWSXRay = require('aws-xray-sdk-core');

const { GetObjectContent } = require('./get-object-content.js');

const dynamodb = AWSXRay.captureAWSv3Client(new DynamoDB());

const s3 = AWSXRay.captureAWSv3Client(new S3());

exports.handler = async function (event, context) {
  try {
    var response = await s3.getObject({
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key
    });
    var content = await GetObjectContent(response.Body);
    
    var response = await  dynamodb.putItem({
        TableName: 'demo-xray',
        Item: {
          'awsRequestId': {
            S: context.awsRequestId
          },
          'number': {
            N: content.toString()
          },
          'lambdaName': {
            S: 'demo-xray2'
          }
        }
    });
    console.log(response);
    return {
      number: content,
      response: response
    };
  } catch (err) {
    console.log(err);
    return err;
  }
}