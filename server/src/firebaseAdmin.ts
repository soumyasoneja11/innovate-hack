import admin from 'firebase-admin';
import * as path from 'path';

// Load the file using 'require' or 'fs'
// We use path.join to ensure it finds the file regardless of where the script runs
const serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();