let AWS = require("aws-sdk");

exports.listCognitoUsers = () => {
  const REGION = "us-east-2";
  const USER_POOL_ID = "us-east-2_tK9rNdAB1";

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


// let AWS = require("aws-sdk");
// let EMAIL_FILTER_STRING = 'email = \"'+ res.attributes.email + '\"'
// let params = {
//   "AttributesToGet": ["email"],
//   "Filter": EMAIL_FILTER_STRING,
//   "Limit": 1,
//   "UserPoolId": USER_POOL_ID
// }
// COGNITO_CLIENT.listUsers(params, (err, data) => {
//   if (err) {
//       console.log(err);
//   }
//   else {
//     if (data.Users[0].UserStatus === "CONFIRMED") {
//       // If user is confirmed and has full profile
//       window.location.href = '/accueil'
//       // this.state.parent.setState({ user: res });
//     } else {
//       // If user is not confirmed
//       toast.error("Check your email to verify your account")
//       this.props.parent.afficher(TYPE_PROFILE)
//     }
//   }
// })