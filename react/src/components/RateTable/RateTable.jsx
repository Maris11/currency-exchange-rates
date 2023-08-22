import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

function RateTable({ rates }) {
  const { currency } = useParams();

  return (
    <table>
      <thead>
      <tr>
        <th>Date</th>
        <th>EUR to { currency }</th>
      </tr>
      </thead>
      <tbody>
      {
        rates.map(rate => (
          <tr key={ rate.id }>
            <td>{ format(new Date(rate.created_at), 'dd.MM.yyyy') }</td>
            <td>{ rate.rate }</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

RateTable.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RateTable;
