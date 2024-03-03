// SUB-FUNCTIONS
// Input Functions
function getInputValue(inputId) {
  var inputElement = document.getElementById(inputId);
  return Number(inputElement.value);
}

// Calculating Functions
function calculateRevenue(quantityCard, quantityCash, cost, tax) {
  var revenue = (quantityCard + quantityCash) * cost * (1 + tax);
  return revenue;
}

function calculateCardRevenue(quantityCard, cost, tax) {
  return (quantityCard * cost) * tax;
}

function calculateFees(numCardSwipes, cardRevenue, perSwipeFee, cardUsageFee) {
  return (numCardSwipes * perSwipeFee) + (cardRevenue * cardUsageFee);
}

function calculateTotalSales(numCard, numCash) {
  return numCard + numCash;
}

function calculateSalesTax(totalSales, cost, tax) {
  return (totalSales * cost) * tax;
}

function calculateProfit(revenueTotal, salesTaxTotal, cardFeesTotal, monthlyExpenses) {
  return revenueTotal - salesTaxTotal - cardFeesTotal - monthlyExpenses;
}

// Output Functions
function generateOutputMessage(total, itemName, revenue) {
  return "<p>" + total + " " + itemName + " sold: $" + revenue.toFixed(2) + "</p>";
}

function displayLines() {

  // Splits the outputMessage into an array of individual lines
  var lines = outputMessage.split(/<\/p>/);

  // Loops through the lines in the array
  for (var i = 0; i < lines.length; i++) {

    // Use setTimeout to delay the display of each line
    (function (index) {
      setTimeout(function () {

        // Add the line to the output area after 1000 milliseconds delay
        outputArea.innerHTML += lines[index] + "</p>";
      }, 1000 * index);
    })(i);
  }
}

// FORM
var form = document.getElementById("foodSalesForm");

form.addEventListener("submit", function (event) {
  
  // VARIABLE DECLARATIONS
  // Input Variables
  var numDrinksSoldCard = "";
  var numDrinksSoldCash = "";
  var numDrinksSoldTotal = "";
  var numBitesSoldCard = "";
  var numBitesSoldCash = "";
  var numBitesSoldTotal = "";
  var numParfaitsSoldCard = "";
  var numParfaitsSoldCash = "";
  var numParfaitsSoldTotal = "" ;
  
  // Calculated Variables
  var monthlyExpenses = 0;
  var drinksRevenue = 0;
  var bitesRevenue = 0;
  var parfaitsRevenue = 0;
  var cardRevenue = 0;
  var cashRevenue = 0;
  var revenueTotal = 0;
  var numCardSwipes = 0;
  var cardFeesTotal = 0;
  var salesTaxTotal = 0;
  var profit = 0;

  // Output Variables
  var backgroundColor = "";
  var profitLabel = "";
  var output = document.getElementById("output");
  
  // Constants
  var drinksCost = 5;
  var bitesCost = 6.49;
  var parfaitCost = 5;
  var salesTax = 0.055;
  var cardUsageFee = 0.029;
  var perSwipeFee = 0.3;

  event.preventDefault();

  // User inputs
  numDrinksSoldCard = getInputValue("drinksSoldCredit");
  numDrinksSoldCash = getInputValue("drinksSoldCash");
  numBitesSoldCard = getInputValue("bitesSoldCredit");
  numBitesSoldCash = getInputValue("bitesSoldCash");
  numParfaitsSoldCard = getInputValue("parfaitsSoldCredit");
  numParfaitsSoldCash = getInputValue("parfaitsSoldCash");
  monthlyExpenses = getInputValue("monthlyExpenses");

  // Processing
  numDrinksSoldTotal = calculateTotalSales(numDrinksSoldCard, numDrinksSoldCash);
  numBitesSoldTotal = calculateTotalSales(numBitesSoldCard, numBitesSoldCash);
  numParfaitsSoldTotal = calculateTotalSales(numParfaitsSoldCard, numParfaitsSoldCash);

  drinksRevenue = calculateRevenue(numDrinksSoldCard, numDrinksSoldCash, drinksCost, salesTax);
  bitesRevenue = calculateRevenue(numBitesSoldCard, numBitesSoldCash, bitesCost, salesTax);
  parfaitsRevenue = calculateRevenue(numParfaitsSoldCard, numParfaitsSoldCash, parfaitCost, salesTax);

  numCardSwipes = numDrinksSoldCard + numBitesSoldCard + numParfaitsSoldCard;

  cardRevenue = calculateCardRevenue(numDrinksSoldCard, drinksCost, salesTax) +
                calculateCardRevenue(numBitesSoldCard, bitesCost, salesTax) +
                calculateCardRevenue(numParfaitsSoldCard, parfaitCost, salesTax);

  cashRevenue = calculateCardRevenue(numDrinksSoldCash, drinksCost, salesTax) +
                calculateCardRevenue(numBitesSoldCash, bitesCost, salesTax) +
                calculateCardRevenue(numParfaitsSoldCash, parfaitCost, salesTax);

  cardFeesTotal = calculateFees(numCardSwipes, cardRevenue, perSwipeFee, cardUsageFee);

  revenueTotal = drinksRevenue + bitesRevenue + parfaitsRevenue;

  salesTaxTotal = calculateSalesTax(numDrinksSoldTotal, drinksCost, salesTax) +
                  calculateSalesTax(numBitesSoldTotal, bitesCost, salesTax) +
                  calculateSalesTax(numParfaitsSoldTotal, parfaitCost, salesTax);

  profit = calculateProfit(revenueTotal, salesTaxTotal, cardFeesTotal, monthlyExpenses);


  // Output Conditionals
  switch (true) {
    case profit > 0 && profit < 500:
      backgroundColor = "rgb(208,144,62)";
      profitLabel = "PROFIT:";
      break;
    case profit >= 500:
      backgroundColor = "rgb(100,108,56)";
      profitLabel = "HUGE PROFIT:";
      break;
    default:
      backgroundColor = "rgb(150,0,0)";
      profitLabel = "LOSS:";
  }

  output.style.color = "white";
  output.style.backgroundColor = backgroundColor;

  // Output
  outputMessage =
    "<h2>Monthly Sales Statement</h2>" + 
    generateOutputMessage(numDrinksSoldTotal, "drinks", drinksRevenue) +
    generateOutputMessage(numBitesSoldTotal, "protein bites", bitesRevenue) +
    generateOutputMessage(numParfaitsSoldTotal, "parfaits", parfaitsRevenue) +
    "<p>Card Fees: $" + cardFeesTotal.toFixed(2) + "</p>" +
    "<p>Sales Tax: $" + salesTaxTotal.toFixed(2) + "</p>" +
    "<p>Monthly Expenses: $" + monthlyExpenses.toFixed(2) + "</p>" +
    "<h2>" + profitLabel + " $" + profit.toFixed(2) + "</h2>";

  // Fetch output area and place the message into the output area
  outputArea = document.getElementById("output");
  
  // Call displayLines to slowly display each line
  displayLines(0);
});
