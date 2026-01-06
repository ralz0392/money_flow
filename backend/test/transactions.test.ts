import * as txController from '../src/controllers/transactions.controller';
import * as firebaseConfig from '../src/config/firebase';

describe('Transactions controller - happy path (income)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('createTransaction records income and returns 201', async () => {
    // Mock DB with runTransaction that simulates reading and updating an account
    const mockDb: any = {
      collection: (name: string) => ({ doc: (id: string) => ({ id, name }) }),
      runTransaction: async (fn: any) => {
        const t = {
          get: async (ref: any) => ({ exists: true, data: () => ({ balance: 100 }) }),
          update: (ref: any, data: any) => {
            // noop - pretend update succeeded
          },
          set: (ref: any, payload: any) => {
            // noop - pretend set succeeded
          },
        };
        await fn(t);
      },
    };

    const spy = jest.spyOn(firebaseConfig, 'firestore').mockImplementation(() => mockDb as any);

    const req: any = { body: { amount: 50, type: 'income', account_id: 'acc1' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

    await txController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ amount: 50, type: 'income' }));

    spy.mockRestore();
  });
});
