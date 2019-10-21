'use strict';
let config = require('./config');

/**
 * Create a new user using the admin auth flow
 * @param poolId cognito user poool id
 * @param clientId cognito application id
 * @param username username
 * @param attributes cognito user attributes
 * @return {Promise}
 */
function adminCreateUser (poolId, clientId, username, attributes) {

  function randomPassword(Length) {
    let length = Length - 4;
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890";
    let password = (Math.round(Math.random()) > 0.5) ? "A1a*" : "Z0z!";
    for (let x = 3; x < length; x++) {
        let i = Math.floor(Math.random() * chars.length);
        password += chars.charAt(i);
    }
    return password;
    }

  return new Promise((resolve, reject) => {
    let password = randomPassword(16);
    let createUserParams = {
      UserPoolId: poolId,
      Username: username,
      MessageAction: 'SUPPRESS',
      TemporaryPassword: 'temp' + password,
      UserAttributes: attributes
    };

    let userPools = new config.AWS.CognitoIdentityServiceProvider();
    userPools.adminCreateUser(createUserParams, (err, cognitoUser) => {
      if (err) {
        reject(err);
      } else {
        let adminInitiateAuthParams = {
          AuthFlow: 'ADMIN_NO_SRP_AUTH',
          ClientId: clientId,
          UserPoolId: poolId,
          AuthParameters: {
            USERNAME: cognitoUser.User.Username,
            PASSWORD: 'temp' + password
          }
        };
        userPools.adminInitiateAuth(adminInitiateAuthParams, (err, data) => {
          if (err) {
            reject(err);
          } else {
            let adminChallengeResponse = {
              ChallengeName: 'NEW_PASSWORD_REQUIRED',
              ClientId: clientId,
              UserPoolId: poolId,
              ChallengeResponses: {
                USERNAME: cognitoUser.User.Username,
                NEW_PASSWORD: password
              },
              Session: data.Session
            };
            userPools.adminRespondToAuthChallenge(adminChallengeResponse, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  user: cognitoUser,
                  password: password
                });
              }
            });
          }
        });
      }
    });
  });
}

/**
 * Update a user's attributes using admin flow.
 * @param poolId cognito user pool id
 * @param username username
 * @param attributes cognito user attributes
 * @return {Promise}
 */
function adminUpdateUserAttributes(poolId, username, attributes) {
  return new Promise((resolve, reject) => {
    let params = {
      UserAttributes: attributes,
      UserPoolId: poolId,
      Username: username
    };

    let userPools = new config.AWS.CognitoIdentityServiceProvider();
    userPools.adminUpdateUserAttributes(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  });
}


module.exports = {
  adminUpdateUserAttributes,
  adminCreateUser
};