let AWS = require("aws-sdk");

exports.listCognitoUsers = () => {
    const REGION = 'us-east-1'
    const USER_POOL_ID = 'us-east-1_W3bnhMGGM'

  var params = {
    UserPoolId: USER_POOL_ID,
    AttributesToGet: []
  };

  return new Promise((resolve, reject) => {
    AWS.config.update({ region: REGION });
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("data", data);
        resolve(data);
      }
    });
  });
};
