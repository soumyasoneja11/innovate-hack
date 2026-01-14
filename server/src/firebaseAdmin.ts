import admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

// Load the file using 'require' or 'fs'
// We use path.join to ensure it finds the file regardless of where the script runs
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

let db: admin.firestore.Firestore | null = null;

// Only initialize Firebase if the service account key exists
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  db = admin.firestore();
  console.log('✅ Firebase Admin initialized successfully');
} else {
  console.warn('⚠️  Firebase service account key not found. Firebase features will be disabled.');
  console.warn('   To enable Firebase, add serviceAccountKey.json to the server directory.');
}

export { db };