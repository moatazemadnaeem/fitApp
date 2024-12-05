import { data } from "./temp_data";
import ClassCard from "./classCard";
import "./classes.css";
import React from "react";
import { fitClassBase } from "../../types";
const ClassesList: React.FC<{ classes: fitClassBase[] }> = ({ classes }) => {
  return (
    <div className="class-list">
      {classes.map((card, indx) => (
        <div key={indx}>
          <ClassCard
            title={card.title}
            description={card.description}
            attendingUsers={card.attendingUsers}
            date={card.date}
            time={card.time}
            maxAttendees={card.maxAttendees}
          />
        </div>
      ))}
    </div>
  );
};

export default ClassesList;
