const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/transactions", async (req, res) => {
  try {
    const { search = "", page = 1, perPage = 10, month } = req.query;

    const apiUrl =
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const response = await axios.get(apiUrl);
    const transactions = response.data;

    const monthIndex = getMonthIndex(month);

    let filteredTransactions = transactions;
    if (month) {
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateOfSale);
        return transactionDate.getMonth() === monthIndex;
      });
    }

    const soldTransactions = filteredTransactions.filter(
      (transaction) => transaction.sold
    );

    const totalSale = soldTransactions.reduce(
      (acc, transaction) => acc + transaction.price,
      0
    );
    const totalSoldItems = filteredTransactions.filter(
      (transaction) => transaction.sold
    ).length;
    const totalNotSoldItems = filteredTransactions.filter(
      (transaction) => !transaction.sold
    ).length;

    const regex = new RegExp(search, "i");
    const filteredAndPaginatedTransactions = filteredTransactions
      .filter(
        (transaction) =>
          transaction.title.match(regex) ||
          transaction.description.match(regex) ||
          String(transaction.price).match(regex) ||
          transaction.category.match(regex)
      )
      .slice((page - 1) * perPage, page * perPage);

    res.json({
      transactions: filteredAndPaginatedTransactions,
      statistics: {
        totalSale,
        totalSoldItems,
        totalNotSoldItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function getMonthIndex(monthName) {
  const months = [
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
  ];
  return months.indexOf(monthName);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
