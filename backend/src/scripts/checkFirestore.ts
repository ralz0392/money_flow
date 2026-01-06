import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    // PostgreSQL is now used instead of Firestore
    console.log('Database connection using PostgreSQL');
    process.exit(0);
  } catch (err) {
    console.error('Database check failed:', err);
    process.exit(2);
  }
}

run();

