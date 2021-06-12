const { Lambda } = require('@aws-sdk/client-lambda');

const lambda = new Lambda({
  region: 'us-east-1'
});

module.exports.lambda = lambda;