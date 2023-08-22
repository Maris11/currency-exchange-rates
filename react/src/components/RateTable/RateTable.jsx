import './RateTable.scss';
import {useParams} from "react-router-dom";

function RateTable({ rates }) {
  const { currency } = useParams();

  return (
    <div>
      {rates.map(rate => (
        <li>{rate.rate} {rate.created_at}</li>
      ))}
    </div>
  )
}

export default RateTable;
