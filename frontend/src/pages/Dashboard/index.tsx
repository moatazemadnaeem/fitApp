import lineImg from "../../assets/line.png";
import Classes from "../../components/classes";
import { Pages } from "../../types";
function DashBoard() {
  return (
    <div className="dashboard">
      <div className="classes-section">
        <div className="classes-content">
          <h3>
            Our <span style={{ color: "var(--mainColor)" }}>Dashboard</span>
          </h3>
          <img src={lineImg} alt="" />
          <p>
            View the list of classes that you booked and if you want to cancel a
            class feel free to that but we encourage you complete the classes to
            get the most benefit from it.
          </p>
        </div>
        <Classes type={Pages.DASHBOARD} />
      </div>
    </div>
  );
}

export default DashBoard;
