interface Account {
  accounts: string[]
}
interface Accounts {
  [bank: string]: Account
}

const mockAccounts: Accounts = {
  "Bank of America": {
    accounts: ["9401", "checking 5858", "6273", "6292", "0055"],
  },
  Chase: {
    accounts: ["0407", "5644", "8034", "9881", "6377", "9919"],
  },
  "American Express": {
    accounts: ["2007", "4003"],
  },
}

export default mockAccounts
