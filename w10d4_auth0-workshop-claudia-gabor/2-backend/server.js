const express = require("express");
const { auth } = require("express-oauth2-jwt-bearer");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const checkScopes = requiredScopes("read:messages");
const cors = require("cors");
var request = require("request");

const app = express();
const port = 5000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

let options = {
  method: "POST",
  url: "https://dev-mp2o7i2c.us.auth0.com/oauth/token",
  headers: { "content-type": "application/json" },
  body: '{"client_id":"cKe8j8p56X4BJfq7ut5Yd6agdlfHxWPj","client_secret":"imMsL0jAY1Aqy0TmChfZo1JBWCgGmKK-1yTCTbCPE_DIQ8eRUQbAxhnmDOnSXv_H","audience":"https://quickstart/api","grant_type":"client_credentials"}',
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.

const checkJwt = auth({
  audience: "https://quickstart/api",
  issuerBaseURL: `https://dev-mp2o7i2c.us.auth0.com/`,
});

// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});
