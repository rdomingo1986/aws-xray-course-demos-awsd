const { S3 } = require('@aws-sdk/client-s3');

const AWSXRay = require('aws-xray-sdk-core');

const { v4: uuidv4 } = require('uuid');

const s3 = AWSXRay.captureAWSv3Client(new S3());

exports.handler = async function (event) {
  try {
    var response = await s3.putObject({
      Bucket: 'demo-xray-domingoramirez',
      Key: uuidv4() + '.txt',
      Body: JSON.parse(event.Records[0].body).number.toString()
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}