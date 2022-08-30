feather.replace({ "aria-hidden": "true" });
const socket = io();
const chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = new Date();

// Data chart
const ctx = document.getElementById("profitChart");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: chartData,
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});

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
  const commissionCell = row.insertCell(6);
  const profitCell = row.insertCell(7);

  typeCell.innerHTML = '<i class="fa fa-arrow-down text-danger"></i> ' + type;
  symbolCell.innerHTML = symbol;
  openPriceCell.innerHTML = openPrice;
  takeProfitCell.innerHTML = takeProfit;
  stopLossCell.innerHTML = stopLoss;
  lotSizeCell.innerHTML = lotSize;
  commissionCell.innerHTML = "$" + commission;
  commissionCell.className = "text-danger";
  profitCell.innerHTML = "$" + profit;
  profitCell.className = profit > 0 ? "text-success" : "text-danger";

  chart.data.datasets[0].data[date.getMonth()] =
    chart.data.datasets[0].data[date.getMonth()] + profit;
  chart.update();
}

function updateTotalProfit(profitData) {
  const profits = document.getElementById("totalProfit");
  const total =
    parseFloat(profits.innerText) + (profitData.profit - profitData.commission);
  profits.innerText = parseFloat(total);

  if (total > 0) {
    profits.className = "text-success";
  } else {
    profits.className = "text-danger";
  }
}
