const { S3 } = require('@aws-sdk/client-s3');
const { SQS } = require('@aws-sdk/client-sqs');

const { v4: uuidv4 } = require('uuid');

const util = require('util');

const s3 = new S3();

const sqs = new SQS();

const run = async function () {
  try {
    var response = await sqs.receiveMessage({
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/864613434505/demo-xray',
      VisibilityTimeout: 30,
      WaitTimeSeconds: 20
    });
    if(response.Messages != undefined) {
      var RecipeHandle = response.Messages[0].ReceiptHandle;
      var number = JSON.parse(response.Messages[0].Body).number;
      response = await s3.putObject({
        Bucket: 'demo-xray-domingoramirez',
        Key: uuidv4() + '.txt',
        Body: number.toString()
      });
      subsegment.addAnnotation("data", JSON.stringify(response));
      subsegment.close();
      console.log(util.inspect(response, false, null, true));
      response = await sqs.deleteMessage({
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/864613434505/demo-xray',
        ReceiptHandle: RecipeHandle
      });
      
      run();
    } else {
      run();
    }
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}

run();