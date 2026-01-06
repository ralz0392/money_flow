// Deprecated: Using PostgreSQL controllers instead of Firestore service

export async function getAccount(id: string) {
  throw new Error('Account service is deprecated. Use PostgreSQL queries in controllers instead.');
}

export async function adjustBalance(id: string, delta: number) {
  throw new Error('Account service is deprecated. Use PostgreSQL queries in controllers instead.');
}


export default { getAccount, adjustBalance };
