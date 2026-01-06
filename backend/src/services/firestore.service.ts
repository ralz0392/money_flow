// Deprecated: Using PostgreSQL instead of Firestore

export function collection(name: string) {
  throw new Error('Firestore service is deprecated. Use PostgreSQL queries instead.');
}

export default { collection };

