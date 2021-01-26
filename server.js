const express = require("express");

const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const app = express();
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// const projectId = 'google-secret-manager'
// const keyFilename = '/Personal/Jay/Jay_Work_Folder/Websites/Practice_Sites/google_secret_manager/google-secret-manager-a3a43942fe79.json'

//const client = new SecretManagerServiceClient({projectId,keyFilename});
const client = new SecretManagerServiceClient();
const name = 'projects/249464646999/secrets/firstsecret/versions/latest'

async function accessSecretVersion() {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
  console.info(`Payload: ${payload}`);
}

accessSecretVersion();



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
