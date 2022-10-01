const socket = io();

// add profits
socket.on("add_profit", (profit) => {
  addProfit(profit);
});

// call for the profits
socket.emit("profits");

// display all profits from the data store
socket.on("profits", (profits) => {
  if (profits.length === 0) {
    return;
  }

  profits.forEach((profitData) => addProfit(profitData));
});

// Add profit to the table and chart
function addProfit(profitData) {
  updateTotalProfit(profitData);

  const {
    type,
    symbol,
    openPrice,
    takeProfit,
    stopLoss,
    lotSize,
    commission,
    profit,
  } = profitData;

  const table = document
    .getElementById("profit-table")
    .getElementsByTagName("tbody")[0];

  const row = table.insertRow(1);
  const typeCell = row.insertCell(0);
  const symbolCell = row.insertCell(1);
  const openPriceCell = row.insertCell(2);
  const takeProfitCell = row.insertCell(3);
  const stopLossCell = row.insertCell(4);
  const lotSizeCell = row.insertCell(5);
  const profitCell = row.insertCell(6);

  let icon = '<i class="fa fa-arrow-down text-danger"></i> ';
  if (["BUY", "buy"].includes(type)) {
    icon = '<i class="fa fa-arrow-up text-success"></i> ';
  }

  typeCell.innerHTML = icon + type.toUpperCase();
  symbolCell.innerHTML = symbol.toUpperCase();
  openPriceCell.innerHTML = openPrice;
  takeProfitCell.innerHTML = takeProfit;
  stopLossCell.innerHTML = stopLoss;
  lotSizeCell.innerHTML = parseFloat(lotSize).toFixed(2);
  profitCell.innerHTML = "$" + (profit.toFixed(2) - commission);
  profitCell.className = profit > 0 ? "text-success" : "text-danger";
}

function updateTotalProfit(profitData) {
  const profits = document.getElementById("totalProfit");
  const total =
    parseFloat(profits.innerText) + (profitData.profit - profitData.commission);
  profits.innerText = parseFloat(total).toFixed(2);

  if (total > 0) {
    profits.className = "text-success";
  } else {
    profits.className = "text-danger";
  }

  calculatePercentage(total);
}

function calculatePercentage(totalProfit) {
  const capital = 100000;
  document.getElementById("capitalPercentage").innerText = parseFloat(
    (100 * totalProfit) / capital
  ).toFixed(2);
}
