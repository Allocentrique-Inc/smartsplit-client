// Connexion à AWSSecretManager pour récupérer des secrets
let getParameter = exports.getParameter = function (paramKey) {    
    const AWS = require('aws-sdk');
    const REGION = 'us-east-2';
    AWS.config.update({
        region: REGION
    });
    const ssm = new AWS.SSM();
    let params = {
        Name: paramKey,
        WithDecryption: /*true ||*/ false
    };
    ssm.getParameter(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            return (data.Parameter.Value);
        };
    })
}