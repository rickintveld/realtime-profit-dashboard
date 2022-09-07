feather.replace({ "aria-hidden": "true" });
const socket = io();
const chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
    time,
  } = profitData;

  const date = new Date(time);

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
  commissionCell.innerHTML = "$" + parseFloat(commission).toFixed(2);
  commissionCell.className = "text-danger";
  profitCell.innerHTML = "$" + profit.toFixed(2);
  profitCell.className = profit > 0 ? "text-success" : "text-danger";

  chart.data.datasets[0].data.forEach((p, i) => {
    const month = new Date(
      `${date.getFullYear()}-${i + 1}-${date.getDay()}`
    ).getMonth();

    if (month >= date.getMonth()) {
      chart.data.datasets[0].data[month] = p + (profit - commission);
    }
  });
  chart.update();
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
  document.getElementById("capitalPercentage").innerText = parseFloat(
    (100 * totalProfit) / 50000
  ).toFixed(2);
}
