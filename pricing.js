function formatPrice(price) {
  return parseInt(price * 100) / 100
}


function calcPrice(price, product) {
  var dollarsOff

  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }

  return price
}


function calcVolLifePrice(product, coverageLevels) {
  var price = 0

  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage
    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }
  return price
}


function calcLtdPrice(product, employee) {
  var salaryPercentage = product.coveragePercentage / 100

  return ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price

}


module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var discountedPrice


  switch (product.type) {
    case 'volLife':
      var volLifePrice = calcVolLifePrice(product, coverageLevels)
      discountedPrice = calcPrice(volLifePrice, product)
      return formatPrice(discountedPrice)
    case 'ltd':
      var ltdPrice = calcLtdPrice(product, employee)
      discountedPrice = calcPrice(ltdPrice, product)
      return formatPrice(discountedPrice)

    default:
      return 0
  }
}
