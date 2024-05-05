import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ transactions }) => {
  const groupByPriceRange = (transactions) => {
    const priceRanges = {
      "0 - 100": 0,
      "101 - 200": 0,
      "201 - 300": 0,
      "301 - 400": 0,
      "401 - 500": 0,
      "501 - 600": 0,
      "601 - 700": 0,
      "701 - 800": 0,
      "801 - 900": 0,
      "901 above": 0,
    };

    transactions.forEach((transaction) => {
      const price = transaction.price;
      if (price >= 0 && price <= 100) {
        priceRanges["0 - 100"]++;
      } else if (price >= 101 && price <= 200) {
        priceRanges["101 - 200"]++;
      } else if (price >= 201 && price <= 300) {
        priceRanges["201 - 300"]++;
      } else if (price >= 301 && price <= 400) {
        priceRanges["301 - 400"]++;
      } else if (price >= 401 && price <= 500) {
        priceRanges["401 - 500"]++;
      } else if (price >= 501 && price <= 600) {
        priceRanges["501 - 600"]++;
      } else if (price >= 601 && price <= 700) {
        priceRanges["601 - 700"]++;
      } else if (price >= 701 && price <= 800) {
        priceRanges["701 - 800"]++;
      } else if (price >= 801 && price <= 900) {
        priceRanges["801 - 900"]++;
      } else {
        priceRanges["901 above"]++;
      }
    });

    return priceRanges;
  };

  const priceRangeData = groupByPriceRange(transactions);
  const data = {
    labels: Object.keys(priceRangeData),
    datasets: [
      {
        label: "Number of Items",
        data: Object.values(priceRangeData),
        backgroundColor: "#26E2E2",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  console.log("Chart Data:", data);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
