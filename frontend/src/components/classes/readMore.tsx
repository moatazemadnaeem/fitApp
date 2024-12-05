import React, { useState } from "react";
import { fitClassBase, userInter } from "../../types";
import { formateStrToDate } from "../../utils/formateStrToDate";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { bookClassApi } from "../../api/fitClasses";
const ReadMore: React.FC<fitClassBase> = ({
  maxAttendees,
  attendingUsers,
  startDate,
  timePeriod,
  _id,
}) => {
  const { user } = useSelector<RootState>((state) => state.user) as userInter;
  const [loading, setLoading] = useState<boolean>(false);
  const handleBookClassApi = async (id: string) => {
    try {
      setLoading(true);
      const data = await bookClassApi(id);
      if (data.status) {
        message.success(data.msg);
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="read-container">
      {user ? (
        <Button
          loading={loading}
          onClick={() => handleBookClassApi(_id)}
          className="btn-read btn-orange"
          type="primary"
        >
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
