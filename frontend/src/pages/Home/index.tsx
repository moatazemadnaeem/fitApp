import "./home.css";
import lineImg from "../../assets/line.png";
import ClassesList from "../../components/classes";
import { useReadFitClasses } from "../../hooks/useReadFitClasses";
import { Button } from "antd";
import { useState } from "react";
function Home() {
  const [page, setPage] = useState<number>(1);
  const { classes, loading } = useReadFitClasses(page);
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
        {classes.length < 1 ? (
          <span className="no-classes">
            There Are No Classes For Now Please Come Soon!
          </span>
        ) : (
          <>
            <ClassesList classes={classes} />
            <Button
              className="btn-orange"
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              loading={loading}
              type="primary"
            >
              Load More
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
