const { lambda } = require('./lambda-client.js');

const util = require('util');

const fs = require('fs');

module.exports.CreateBucket = async function () {
  try {
    return await lambda.createFunction({
      FunctionName: 'awsd-officialcourse-demo-aws-xray-function_1',
      Runtime: 'nodejs12.x',
      MemorySize: 128,
      Handler: 'index.handler',
      Timeout: 5,
      Environment: {
        Variables: {
          'table_name': 'awsd-officialcourse-demo-aws-xray-table'
        }
      },
      Code: {
        ZipFile: fs.readFileSync('../function_1-code.js')
      },
      PackageType: 'Zip',
      // Role: 
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};