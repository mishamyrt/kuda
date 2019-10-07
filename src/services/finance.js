const storageKey = 'kuda_data'

export default class FinanceService {
  constructor () {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const settings = JSON.parse(stored)
      this.freeMoney = settings.freeMoney
      const today = new Date()
      const date = new Date(Date.parse(settings.historyDate))
      const isToday = date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      if (isToday) {
        this.history = settings.history
      } else {
        this.history = settings.history
        const lastAmount = this.availableToday
        this.history = []
        if (lastAmount < 0) {
          this.addOperation(-lastAmount, true)
        }
        this.saveState()
      }
    } else {
      this.freeMoney = 30000
      this.history = []
    }
    console.log({
      freeMoney: this.freeMoney,
      history: this.history,
    })
  }

  saveState () {
    const today = new Date()
    localStorage.setItem(storageKey, JSON.stringify({
      historyDate: today.toISOString(),
      history: this.history,
      freeMoney: this.freeMoney
    }))
  }

  setFreeMoney (freeMoney) {
    this.freeMoney = freeMoney
    this.saveState()
  }

  clearStorage () {
    this.history = []
    this.saveState()
  }

  get availableToday () {
    let amount = (this.freeMoney / this.daysInMonth)
    if (this.history) {
      for (const operation of this.history) {
        if (operation.substract) {
          amount -= operation.amount
        } else {
          amount += operation.amount
        }
      }
    }
    return amount
  }

  addOperation (amount, substract) {
    const today = new Date()
    this.history.push({
      amount,
      substract,
      date: today.toISOString()
    })
    this.saveState()
  }

  get daysInMonth () {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }
}
