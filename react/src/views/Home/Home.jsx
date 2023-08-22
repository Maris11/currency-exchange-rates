import background from "../../assets/background.jpg";
import './Home.scss';
import {Link} from "react-router-dom";

function Home() {
  return (
    <div
      className={"home"}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={"heading"}>Currency Exchange Rates</div>
      <Link to={'/rates/GBP'}>EUR → GBP</Link>
      <Link to={'/rates/USD'}>EUR → USD</Link>
      <Link to={'/rates/AUD'}>EUR → AUD</Link>
      <a href="https://www.freepik.com/free-vector/digital-global-currency-icons-concept-background_4025866.htm#query=currency%20exchange%20background&position=1&from_view=search&track=ais#position=1&query=currency%20exchange%20background">Image by starline</a> on Freepik
    </div>
  )
}

export default Home;
