const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// let moneyAccumulate = 1000000;

const calculatePension = async () => {
  let salary = 10000;
  let moneyAccumulate, depositFeePercentage, cumulativeFee, InsuranceCost, years, annualInterest;
  let hasMaxFee = false;
  let maxFeeAmount = 0;
  const PensionMonthlyDeposit = salary * 0.20830434782608695; // 20.83%

  moneyAccumulate = parseFloat(await askQuestion("Enter the amount of money accumulated : "));
  // depositFeePercentage = parseFloat(await askQuestion("Enter deposit fee percentage (e.g., enter 1 for 1%): "));
  depositFeePercentage = parseFloat(await askQuestion("Enter deposit fee percentage (e.g., enter 1 for 1%): "));
  if (depositFeePercentage > 0) {
    const hasMaxFeeResponse = await askQuestion("Is there a maximum fee for deposit? (yes/no): ");
    if (hasMaxFeeResponse.toLowerCase() === "yes") {
      hasMaxFee = true;
      maxFeeAmount = parseFloat(await askQuestion("Enter the maximum fee amount: "));
    }
  }
  cumulativeFee = parseFloat(await askQuestion("Enter cumulative fee percentage: "));
  InsuranceCost = parseFloat(await askQuestion("Enter insurance cost: "));
  years = parseInt(await askQuestion("Enter number of years: "));
  annualInterest = parseFloat(await askQuestion("Enter annual interest rate: "));

  // const depositFee =
  //   PensionMonthlyDeposit * (depositFeePercentage / 100) > 35
  //     ? 35
  //     : PensionMonthlyDeposit * (depositFeePercentage / 100);
  const depositFee = hasMaxFee
    ? Math.min(maxFeeAmount, PensionMonthlyDeposit * (depositFeePercentage / 100))
    : PensionMonthlyDeposit * (depositFeePercentage / 100);

  const totalMonthlyDeductions = InsuranceCost + depositFee;
  const actualMonthlyDeposit = PensionMonthlyDeposit - totalMonthlyDeductions;
  const addInterest = 1 + annualInterest / 100;
  const deductCumulativeFee = 1 + cumulativeFee / 100;

  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      moneyAccumulate += actualMonthlyDeposit;
    }
    moneyAccumulate = moneyAccumulate * addInterest;
    moneyAccumulate = moneyAccumulate / deductCumulativeFee;
  }

  console.log(`**********************************`);
  console.log(`Cumulative Fee: ${cumulativeFee}%`);
  console.log(`Deposit Fee: ${depositFeePercentage}%`);
  console.log("Accumulate: ", moneyAccumulate);

  rl.close(); // Close the interface
};

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

calculatePension();
