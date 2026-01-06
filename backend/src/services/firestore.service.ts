import { firestore } from '../config/firebase';

export function collection(name: string) {
  return firestore().collection(name);
}

export default { collection };
