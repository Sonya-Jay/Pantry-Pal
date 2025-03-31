const admin = require("firebase-admin");
const serviceAccount = require("./firebaseAdminConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pantrypal-48720.firebaseio.com",
});

const db = admin.firestore();
module.exports = db;
