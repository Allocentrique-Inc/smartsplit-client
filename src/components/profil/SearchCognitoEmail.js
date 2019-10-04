let AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1'});

const COGNITO_CLIENT = new AWS.CognitoIdentityServiceProvider()
const EMAIL_ADDRESS = 'david@iptoki.com'
const EMAIL_FILTER_STRING = 'email = \"'+ EMAIL_ADDRESS + '\"'

const params = {
    "AttributesToGet": ["email"],
    "Filter": EMAIL_FILTER_STRING,
    "Limit": 1,
    "UserPoolId": 'us-east-1_W3bnhMGGM'
}

  COGNITO_CLIENT.listUsers(params, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("data", data);
            console.log("USER IS", data.Users[0].UserStatus )
            console.log(data.Users[0].UserStatus === "CONFIRMED" )
            console.log("Attribute: ", data.Users[0].Attributes[0].Value)
            return (data)
        }
})
