require("dotenv").config();
import faker from "faker";
import twilio from "twilio";

export default function token() {
    var identity = faker.name.findName();

    var AccessToken = twilio.jwt.AccessToken;
    var VideoGrant = AccessToken.VideoGrant;
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET
    );

    // Assign the generated identity to the token
    token.identity = identity;

    const grant = new VideoGrant();
    // Grant token access to the Video API features
    token.addGrant(grant);

    console.log(`identity: ${identity}`);
    console.log(`token: ${token.toJwt}`);
};