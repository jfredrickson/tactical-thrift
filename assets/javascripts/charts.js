(function () {

  function buildChartData(fundName, allPositions) {
    const positions = allPositions
      .filter(position => position.fund === fundName)
      .slice(-12);

    const data = {
      labels: [],
      datasets: []
    };
    const smaDataset = {
      type: "line",
      label: "10-month SMA",
      data: [],
      fill: false,
      borderColor: "rgb(33, 133, 181)"
    };
    const priceDataset = {
      type: "line",
      label: "Price",
      data: [],
      fill: false,
      borderColor: "rgb(35, 139, 69)"
    };
    positions.forEach(function (position) {
      const date = formatDate(position.date);
      const status = position.invested ? "Invested" : "Move to G";
      data.labels.push([date, status]);
      smaDataset.data.push(position.tenMonthAverage);
      priceDataset.data.push(position.tenthMonthPrice);
    });
    data.datasets.push(smaDataset);
    data.datasets.push(priceDataset);
    return data;
  }

  function renderChart(chartCanvas, data) {
    new Chart(chartCanvas, {
      type: "line",
      data: data
    });
  }

  function renderError(chartCanvas, error) {
    console.error("Error fetching positions data:", error);
    chartCanvas.getContext("2d").fillText("Error loading chart data.", 10, 10);
  }

  function formatDate(isoDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateComponents = isoDate.split("-");
    const year = dateComponents[0];
    const month = parseInt(dateComponents[1]);
    return monthNames[month - 1] + " " + year;
  }

  document.querySelectorAll("canvas.chart").forEach(function (chartCanvas) {
    const fundName = chartCanvas.dataset.fund;
    fetch("/data/positions.json")
      .then(response => response.json())
      .then(positions => {
        const chartData = buildChartData(fundName, positions);
        renderChart(chartCanvas, chartData);
      })
      .catch(error => {
        renderError(chartCanvas, error);
      });
  });

})();