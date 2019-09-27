let AWS = require('aws-sdk');

exports.listCognitoUsers = () => {
    const REGION = 'us-east-2'
    const USER_POOL_ID = 'us-east-2_tK9rNdAB1'

	var params = {
	  UserPoolId: USER_POOL_ID, 
	  AttributesToGet: [],
	};
	
	return new Promise((resolve, reject) => {
		AWS.config.update({ region: REGION});
		var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
		cognitoidentityserviceprovider.listUsers(params, (err, data) => {
			if (err) {
				console.log(err);
				reject(err)
			}
			else {
				console.log("data", data);
				resolve(data)
			}
		})
	});
}