class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transactions = { inputUTXOs, outputUTXOs }
  }
  execute() {
    const isDoubleSpend = this.transactions.inputUTXOs.findIndex(
      (utxo) => utxo.spent === true
    )

    if (isDoubleSpend !== -1) {
      throw new Error('input TXO is already spent.')
    }

    const totalInputAmount = this.transactions.inputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    )
    const totalOutputAmount = this.transactions.outputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    )

    if (totalInputAmount < totalOutputAmount) {
      throw new Error(
        'insufficient amount: total value of the inputs is less than the total value of the outputs!'
      )
    }
  }
}

module.exports = Transaction
