export function monthlyPayment(principal: number, annualRatePercent: number, months: number) {
  const r = annualRatePercent / 100 / 12; // monthly rate
  if (r === 0) return Number((principal / months).toFixed(2));
  const payment = (principal * r) / (1 - Math.pow(1 + r, -months));
  return Number(payment.toFixed(2));
}

export function amortizationSchedule(principal: number, annualRatePercent: number, months: number, startDate?: Date) {
  const r = annualRatePercent / 100 / 12;
  const payment = monthlyPayment(principal, annualRatePercent, months);
  const schedule: Array<any> = [];
  let balance = Number(principal);
  let current = startDate ? new Date(startDate) : new Date();

  for (let i = 1; i <= months; i++) {
    const interest = Number((balance * r).toFixed(2));
    let principalPaid = Number((payment - interest).toFixed(2));
    // Handle rounding for last payment
    if (i === months) {
      principalPaid = Number(balance.toFixed(2));
    }
    const paymentActual = Number((interest + principalPaid).toFixed(2));
    const newBalance = Number((balance - principalPaid).toFixed(2));

    schedule.push({
      installment: i,
      date: new Date(current).toISOString(),
      payment: paymentActual,
      principal: principalPaid,
      interest,
      balance: newBalance,
    });

    // advance month
    current.setMonth(current.getMonth() + 1);
    balance = newBalance;
  }

  return schedule;
}

export default { monthlyPayment, amortizationSchedule };
