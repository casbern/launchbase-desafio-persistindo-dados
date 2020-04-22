module.exports = {
  age(timestamp) {
    const today = new Date()
    const birth = new Date(timestamp)

    let age = today.getFullYear() - birth.getFullYear()
    const month = today.getMonth() - birth.getMonth()

    if(month < 0 || month == 0 && today.getDate() < birth.getDate()) {
      age = age - 1
    }
    return age
  },
  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  grade(schoolYear) {
    const [year, notNeeded, letter] = schoolYear.split("")
  
      if(letter == "F") {
        return `${year}º Ano do Ensino Fundamental`
      } else if (letter == "M") {
        return `${year}º Ano do Ensino Médio`
      } else {
        return false
      }
  }
}

  
