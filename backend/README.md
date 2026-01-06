# Money Flow Backend (TypeScript + Express + Firestore)

## Quickstart (development)

1. Copy `.env.example` to `.env` and fill values:
   - `FIREBASE_CREDENTIALS_BASE64` = base64 encoded Firebase service account JSON
   - `JWT_SECRET` = your JWT secret
   - `SUPERUSER_USERNAME` / `SUPERUSER_PASSWORD` for dev auth

2. Install dependencies:
   npm install

3. Start dev server:
   npm run dev

4. Health check:
   GET http://localhost:4000/healthz

5. Create a token:
   POST /api/auth/token { "username": "admin", "password": "password" }

6. Use the token for protected routes:
   Authorization: Bearer <token>
---

## Running tests

Locally (Node.js):

1. Install Node.js 18+ and npm.
2. cd backend
3. npm install
4. npm test

In Docker (no Node required locally):

1. Build and run tests:
   ./scripts/test-in-docker.sh

In CI: GitHub Actions is included under `.github/workflows/nodejs.yml` and will run tests on push/PR to `main`.

---

## Using real Firestore locally

You can connect this backend to a real Firestore project by creating a Firebase service account JSON and setting it as `FIREBASE_CREDENTIALS_BASE64` in your `.env` file.

1) Create a service account key in the GCP console:
   - Go to IAM & Admin → Service Accounts → Create Service Account
   - Grant the service account `Cloud Datastore Owner` or `Cloud Firestore Owner` role (or the minimal roles you prefer)
   - Create a JSON key and download it (e.g. `serviceAccount.json`)

2) Encode the JSON to Base64 and set env var

   Windows PowerShell:

   $bytes = [IO.File]::ReadAllBytes('C:\path\to\serviceAccount.json')
   $base64 = [Convert]::ToBase64String($bytes)
   # Then set FIREBASE_CREDENTIALS_BASE64 in .env to the contents of $base64

   macOS/Linux or WSL:

   base64 serviceAccount.json | tr -d '\n' > serviceAccount.base64
   # Copy the contents into the FIREBASE_CREDENTIALS_BASE64 value in your .env

3) Security note
   - Never commit the service account JSON or the base64 value to your repo. Add `.env` and any JSON keys to `.gitignore`.

4) Verify connectivity
   - Start the backend: `npm run dev`
   - The app initializes Firestore from the env var at startup. You can use the `scripts/check-firestore` helper below to run a quick connectivity check.

### Quick check script

I added a small script to verify the connection and perform a simple read/write: `npm run check:firestore`.

### Firestore emulator (local development, optional)

If you prefer to run Firestore locally without a real GCP project, the Firebase emulator is supported.

1) Install Firebase CLI (if you didn't already):
   npm install -g firebase-tools

2) Start emulator (from `backend/`):
   npm run emulator:start

   This will run a local Firestore instance on port 8080 (see `firebase.json`).

3) Start the backend connected to the emulator:
   npm run dev:emulator

   This sets `FIRESTORE_EMULATOR_HOST=localhost:8080` for the dev server so the app connects to the emulator.

Notes
- When using the emulator you do not need to set `FIREBASE_CREDENTIALS_BASE64` — the SDK will connect to the emulator without credentials.
- Use `firebase emulators:export <dir>` and `firebase emulators:start --import <dir>` to persist data between runs.
## Notes
- Firestore is initialized from `FIREBASE_CREDENTIALS_BASE64` to simplify CI/CD on Render.
- This scaffold includes basic account, transaction, loan, and analytics routes to build upon.
