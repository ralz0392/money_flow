import { firestore } from '../config/firebase';

export async function getAccount(id: string) {
  const db = firestore();
  const doc = await db.collection('debit_accounts').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...(doc.data() as any) };
}

export async function adjustBalance(id: string, delta: number) {
  const db = firestore();
  const ref = db.collection('debit_accounts').doc(id);
  await db.runTransaction(async (t) => {
    const doc = await t.get(ref);
    if (!doc.exists) throw new Error('Account not found');
    const balance = Number((doc.data() as any).balance || 0);
    const newBalance = Number((balance + delta).toFixed(2));
    t.update(ref, { balance: newBalance, updated_at: new Date().toISOString() });
  });
}

export default { getAccount, adjustBalance };
