$(document).ready(function () {
  var charts = [];

  function buildChartData(positions) {
    var data = {
      labels: [],
      datasets: []
    }
    var smaDataset = {
      type: "line",
      label: "SMA",
      data: [],
      fill: false,
      borderColor: "rgb(33, 133, 181)",
      pointRadius: 0
    };
    var priceDataset = {
      type: "bar",
      label: "Price",
      data: [],
      backgroundColor: "rgba(35, 139, 69, 0.5)"
    };
    positions.forEach(function (position) {
      var date = formatDate(position.date);
      var status = position.invested ? "Invested" : "Move to G";
      data.labels.push([date, status]);
      smaDataset.data.push(position.sma);
      priceDataset.data.push(position.price);
    });
    data.datasets.push(smaDataset);
    data.datasets.push(priceDataset);
    return data;
  }

  function renderChart(targetElement, data) {
    var chart = new Chart(targetElement, {
      type: "bar",
      data: data
    });
  }

  function formatDate(isoDate) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dateComponents = isoDate.split("-");
    var year = dateComponents[0];
    var month = parseInt(dateComponents[1]);
    return monthNames[month - 1] + " " + year;
  }

  $("canvas.chart").each(function () {
    var fund = $(this).data("fund");
    var targetElement = $(this);
    $.getJSON("/data/" + fund + ".json", function (json) {
      var positions = json["positions"];
      var data = buildChartData(positions);
      renderChart(targetElement, data);
    });
  });
});
