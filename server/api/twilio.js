require("dotenv").config();

var faker = require("faker");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

module.exports = (request, response) => {
  var identity = faker.name.findName();

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created

  var token = new AccessToken(
      process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      process.env.REACT_APP_TWILIO_API_KEY_SID,
      process.env.REACT_APP_TWILIO_API_KEY_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
 // Grant token access to the Video API features
 token.addGrant(grant);

 // Serialize the token to a JWT string and include it in a JSON response
 response.send({
     identity: identity,
     token: token.toJwt()
 });
};