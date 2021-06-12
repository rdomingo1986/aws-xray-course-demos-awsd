const { IAM } = require('@aws-sdk/client-iam');

const iam = new IAM({
  region: 'us-east-1'
});

module.exports.iam = iam;