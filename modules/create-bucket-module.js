const { s3 } = require('./s3-client.js');

const util = require('util');

module.exports.CreateBucket = async function () {
  try {
    return await s3.createBucket({
      Bucket: 'awsd-officialcourse-demo-aws-xray-bucket'
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};