import './ExchangeRates.scss';
import RateTable from "../../components/RateTable/RateTable.jsx";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { format } from 'date-fns';

function ExchangeRates() {
  const { currency } = useParams();
  const [ rates, setRates ] = useState();
  const [ error, setError ] = useState();
  const [ totalPages, setTotalPages ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ minRate, setMinRate ] = useState(1);
  const [ maxRate, setMaxRate ] = useState(1);
  const [ avgRate, setAvgRate ] = useState(1);
  const [ lastUpdate, setLastUpdate ] = useState(1);

  const fetchRates = useCallback(() => {
    axiosClient
      .get(`/rates/fetch/${currency}?page=${currentPage}`)
      .then(({data}) => {
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
      })
  }, [currency, currentPage]);

  useEffect(() => {
    fetchRates()
  }, [fetchRates]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="heading">1 EUR to { currency } Exchange Rate</div>
      { error && <div className="error">{ error }</div> }

      { rates &&
        <div>
          <div className="updated">Last updated: {format(new Date(lastUpdate), 'dd.MM.yyyy')}</div>
          <Pagination
            totalPages={ totalPages }
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <RateTable rates={ rates } />
          <Pagination
            totalPages={ totalPages }
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="stats">
            Minimum: {minRate.toFixed(4)} {currency}
            Maximum: {maxRate.toFixed(4)} {currency}
            Average: {avgRate.toFixed(4)} {currency}
          </div>
        </div>
      }
    </div>
  )
}

export default ExchangeRates;
