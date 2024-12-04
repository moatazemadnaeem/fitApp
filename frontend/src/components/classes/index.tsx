import { data } from "./temp_data";
import ClassCard from "./classCard";
import "./classes.css";

function ClassesList() {
  return (
    <div className="class-list">
      {data.map((card, indx) => (
        <div key={indx}>
          <ClassCard
            title={card.title}
            description={card.description}
            attendingUsers={card.attendingUsers.length}
            date={card.date}
            time={card.date}
            maxAttendees={card.maxAttendees}
          />
        </div>
      ))}
    </div>
  );
}

export default ClassesList;
