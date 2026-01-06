import dotenv from 'dotenv';
dotenv.config();

import { initializeFirebase, firestore } from '../config/firebase';

async function run() {
  try {
    initializeFirebase();
    const db = firestore();

    // Basic read/write check: write a small doc and read it back
    const ref = db.collection('dev_checks').doc('ping');
    const now = new Date().toISOString();

    await ref.set({ ts: now });
    const doc = await ref.get();

    console.log('Write/read OK. doc:', doc.id, doc.data());
  } catch (err) {
    console.error('Firestore check failed:', err);
    process.exit(2);
  }
}

run();
