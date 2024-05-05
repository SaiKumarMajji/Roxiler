import React, { useState, useEffect } from "react";
import "./Transactions.css";

import BarChart from "../BarChart/BarChart";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [currentPage, setCurrentPage] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchData();
  }, [search, selectedMonth, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:3001/api/transactions?search=${search}&page=${currentPage}`;

      if (selectedMonth) {
        url += `&month=${selectedMonth}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data.transactions);
      setStatistics(data.statistics);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="heading-tr">
        <h2>
          Transaction <br /> Dashboard
        </h2>
      </div>

      <div className="filter">
        <input
          className="search"
          type="search"
          placeholder="Search transaction"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="options"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{String(transaction.sold)}</td>
                <td>
                  <img
                    className="image"
                    src={transaction.image}
                    alt={transaction.title}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="page">
          <h4>Page No: {currentPage}</h4>
          <h4>
            <span style={{ cursor: "pointer" }} onClick={goToNextPage}>
              Next
            </span>
            {"  "}-{"  "}
            <span style={{ cursor: "pointer" }} onClick={goToPreviousPage}>
              Previous
            </span>{" "}
          </h4>

          <h4>Per Page: 10</h4>
        </div>

        <div className="statistics">
          <h3>Statistics - {selectedMonth}</h3>

          <div className="details">
            <p>
              Total sale{" "}
              <span style={{ marginLeft: "90px" }}>
                {statistics.totalSale.toFixed(2)}
              </span>
            </p>
            <p style={{ marginTop: "10px" }}>
              Total sold item{" "}
              <span style={{ marginLeft: "50px" }}>
                {statistics.totalSoldItems}
              </span>
            </p>
            <p style={{ marginTop: "10px" }}>
              Total not sold item{" "}
              <span style={{ marginLeft: "20px" }}>
                {statistics.totalNotSoldItems}
              </span>
            </p>
          </div>
        </div>

        <div className="Bar-chart">
          <h3>Transactions Bar Chart</h3>
          <h2 style={{ fontSize: "20px", marginLeft: "50px" }}>
            Bar Chart Stats - {selectedMonth}
          </h2>

          <BarChart transactions={transactions} selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
}
