import { monthlyPayment, amortizationSchedule } from '../src/services/calculation.service';

describe('Calculation service - happy path', () => {
  test('monthlyPayment computes expected monthly amount for 12 months', () => {
    const payment = monthlyPayment(1000, 12, 12);
    // Known approximate value for 1000 @ 12% annual for 12 months
    expect(payment).toBeCloseTo(88.85, 2);
  });

  test('amortizationSchedule has correct length and last balance near zero', () => {
    const schedule = amortizationSchedule(1000, 12, 12, new Date('2025-01-01'));
    expect(schedule).toHaveLength(12);
    const last = schedule[schedule.length - 1];
    expect(last.balance).toBeCloseTo(0, 2);
  });
});
