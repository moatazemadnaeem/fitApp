import React from "react";
import { fitClassBase, userInter } from "../../types";
import { formateStrToDate } from "../../utils/formateStrToDate";
import { Button } from "antd";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../../types";
const ReadMore: React.FC<fitClassBase> = ({
  maxAttendees,
  attendingUsers,
  startDate,
  timePeriod,
  _id,
}) => {
  const { user } = useSelector<RootState>((state) => state.user) as userInter;

  return (
    <div className="read-container">
      {user ? (
        <Button className="btn-read btn-orange" type="primary">
          Book
        </Button>
      ) : (
        <span className="read-content">Sign In To Book</span>
      )}

      <div className="read-content read-attending">
        {maxAttendees === attendingUsers.length ? (
          <span>Class Is Full</span>
        ) : (
          <>
            <span>Users In The Class</span>
            <span>
              {attendingUsers.length}/{maxAttendees}
            </span>
          </>
        )}
      </div>
      <div className="read-content class-start">
        <span>Class Starts In </span>
        <span>{formateStrToDate(startDate)}</span>
      </div>
      <div className="read-content class-ends">
        <span>Class Ends In </span>
        <span>{formateStrToDate(timePeriod)}</span>
      </div>
    </div>
  );
};

export default ReadMore;
