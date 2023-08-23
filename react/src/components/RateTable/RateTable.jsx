import "./RateTable.scss";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { FaSortUp, FaSortDown } from "react-icons/fa";

function RateTable({ rates, onSortChange, sortColumn, sortOrder }) {
  const { currency } = useParams();

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSortChange("created_at")}>
            Date
            {sortColumn === "created_at" &&
              (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
          </th>
          <th onClick={() => onSortChange("rate")}>
            EUR to {currency}
            {sortColumn === "rate" &&
              (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
          </th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.id}>
            <td>
              {format(
                utcToZonedTime(new Date(rate.created_at), "Europe/Riga"),
                "dd.MM.yyyy",
              )}
            </td>
            <td>{rate.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

RateTable.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default RateTable;
