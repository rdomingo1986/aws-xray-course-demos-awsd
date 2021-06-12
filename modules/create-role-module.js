const { iam } = require('./iam-client');

const util = require('util');

module.exports.CreateRole = async function () {
  try {
    return await iam.createRole({
      RoleName: 'awsd-officialcourse-demo-aws-xray-rolefunctions',
      AssumeRolePolicyDocument: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
              Effect: "Allow",
              Principal: {
                "Service": "lambda.amazonaws.com"
              },
              Action: "sts:AssumeRole"
          }
        ]
      }),
      
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};