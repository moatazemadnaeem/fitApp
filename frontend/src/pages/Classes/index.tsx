import { Button } from "antd";
import lineImg from "../../assets/line.png";
import Classes from "../../components/classes";
import { Pages } from "../../types";
import { useState } from "react";
import CreateClassModal from "../../components/classes/createClassModal";
function CreatedClasses() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="created-classes">
      <div className="classes-section">
        <div className="classes-content">
          <h3>
            Created <span style={{ color: "var(--mainColor)" }}>Classes</span>
          </h3>
          <img src={lineImg} alt="" />
          <p>
            View the list of created classed that made by you feel free to edit
            them as you want or even add new classes.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Button onClick={showModal} className="btn-orange">
              Create Class
            </Button>
          </div>
          <CreateClassModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <Classes type={Pages.CLASSES} />
      </div>
    </div>
  );
}

export default CreatedClasses;
