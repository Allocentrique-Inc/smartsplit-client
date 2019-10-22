const AWS = require("aws-sdk");
const REGION = 'us-east-2'
AWS.config.update({ region: REGION });

const USER_POOL_ID = 'us-east-2_tK9rNdAB1'
const COGNITO_CLIENT = new AWS.CognitoIdentityServiceProvider();
const axios = require('axios');

axios.post('http://dev.api.smartsplit.org:8080/v1/proposal/decode', body)
.then((resp)=>{            
    let SUB = resp.data.rightHolderId
    let USERNAME_FILTER_STRING = 'sub = \"'+ SUB + '\"';
    let params = {
      "AttributesToGet": ["gender", "email"],
      "Filter": USERNAME_FILTER_STRING,
      "Limit": 1,
      "UserPoolId": USER_POOL_ID
    }
    COGNITO_CLIENT.listUsers(params, (err, data) => {
      if (err) {
          console.log(err);
      }
      else {
        if (data.Users[0].Attributes[0].Value === "initiatorCreatedUser") {
          // window.location.href = '/choose-password'
          console.log(data.Users[0]);
          console.log("************* User created by initiator ==> /choose-password", data.Users[0].Attributes[1].Value);
        } else if (data.Users[0].Attributes[0].Value === "registeredUser"){
          // window.location.href = '/login'
          console.log(data.Users[0]);
          console.log("************* Self registered User ==> /choose-password")
        } else {
          console.log(data);
        }
      }
    })

})
.catch((error) => {
    console.log(error.message)
})



