import "./home.css";
import lineImg from "../../assets/line.png";
import ClassesList from "../../components/classes";
function Home() {
  return (
    <div className="home">
      {/* Welcome section */}
      <div className="fullscreen-background">
        <div className="centered-text">
          <h1>
            With Our <span style={{ color: "var(--mainColor)" }}>Club</span>
          </h1>
          <p>Maximize Your Strength and Achieve Peak Performance</p>
        </div>
      </div>
      {/* classes section */}
      <div className="classes-section">
        <div className="classes-content">
          <h3>
            Our <span style={{ color: "var(--mainColor)" }}>Classes</span>
          </h3>
          <img src={lineImg} alt="" />
          <p>
            Explore the range of fitness classes offered by other users, book
            your preferred sessions, and start your fitness journey today.
          </p>
        </div>
        {/* classes cards + load more button */}
        <ClassesList />
      </div>
    </div>
  );
}

export default Home;
