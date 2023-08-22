import './ExchangeRates.scss';
import RateTable from "../../components/RateTable/RateTable.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";

function ExchangeRates() {
  const { currency } = useParams();
  const [ rates, setRates ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    axiosClient.get('/rates/fetch/' + currency)
      .then(({data}) => {
        setRates(data.rates);
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status === 404) {
          setError(response.data);
        }
      })
  }, []);

  return (
    <div>
      { error && <div className="error">{ error }</div> }
      { rates && <RateTable rates={ rates } /> }
    </div>
  )
}

export default ExchangeRates;
