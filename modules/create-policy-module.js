const { iam } = require('./iam-client');

const util = require('util');

module.exports.CreatePolicy = async function () {
  try {
    return await iam.createPolicy({
      PolicyName: 'awsd-officialcourse-demo-aws-xray-rolefunctionspolicy',
      PolicyDocument: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
              Effect: "Allow",
              Action: "dynamodb:PutItem",
              Resource: "*"
          },
          {
            Effect: "Allow",
            Action: "sns:Publish",
            Resource: "*"
          }
        ]
      })
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};