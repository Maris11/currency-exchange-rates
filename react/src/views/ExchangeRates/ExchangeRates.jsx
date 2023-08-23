import "./ExchangeRates.scss";
import RateTable from "../../components/RateTable/RateTable.jsx";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function ExchangeRates() {
  const { currency } = useParams();
  const [rates, setRates] = useState();
  const [error, setError] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [minRate, setMinRate] = useState(1);
  const [maxRate, setMaxRate] = useState(1);
  const [avgRate, setAvgRate] = useState(1);
  const [lastUpdate, setLastUpdate] = useState(1);

  const fetchRates = useCallback(() => {
    axiosClient
      .get(
        `/rates/fetch/${currency}?page=${currentPage}&sort_column=${sortColumn}&sort_order=${sortOrder}`,
      )
      .then(({ data }) => {
        console.log(data);
        setRates(data.rates.data);
        setTotalPages(data.rates.last_page);
        setMinRate(data.minRate);
        setMaxRate(data.maxRate);
        setAvgRate(data.avgRate);
        setLastUpdate(data.lastUpdate);
      })
      .catch((error) => {
        const response = error.response;
        setError(response.data);
      });
  }, [currency, currentPage, sortColumn, sortOrder]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  return (
    <div className="exchange-rates">
      {error && <div className="error">{error}</div>}

      {rates && (
        <div className="rates-container">
          <div className="heading">1 EUR to {currency} Exchange Rate</div>
          <div className="updated">
            Last updated:{" "}
            {format(
              utcToZonedTime(new Date(lastUpdate), "Europe/Riga"),
              "dd.MM.yyyy",
            )}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <RateTable
            rates={rates}
            onSortChange={handleSort}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="stats">
            Minimum: {minRate.toFixed(4)} {currency}, Maximum:{" "}
            {maxRate.toFixed(4)} {currency}
            <br />
            Average: {avgRate.toFixed(4)} {currency}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExchangeRates;
