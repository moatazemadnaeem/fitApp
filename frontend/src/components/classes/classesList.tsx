import ClassCard from "./classCard";
import "./classes.css";
import React from "react";
import { fitClassBase } from "../../types";
const ClassesList: React.FC<{ classes: fitClassBase[] }> = ({ classes }) => {
  return (
    <div className="class-list">
      {classes.map((card) => (
        <div key={card._id}>
          <ClassCard
            title={card.title}
            description={card.description}
            attendingUsers={card.attendingUsers}
            startDate={card.startDate}
            timePeriod={card.timePeriod}
            maxAttendees={card.maxAttendees}
            _id={card._id}
          />
        </div>
      ))}
    </div>
  );
};

export default ClassesList;
