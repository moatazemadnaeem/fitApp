import React, { useState } from "react";
import { fitClassBase, userInter, PagesPaths } from "../../types";
import { formateStrToDate } from "../../utils/formateStrToDate";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { bookClassApi, cancelClassApi } from "../../api/fitClasses";
import { useLocation } from "react-router-dom";
import EditClassModal from "./editClassModal";
const ReadMore: React.FC<fitClassBase> = ({
  maxAttendees,
  attendingUsers,
  startDate,
  timePeriod,
  _id,
  description,
  title,
}) => {
  const { user } = useSelector<RootState>((state) => state.user) as userInter;
  const location = useLocation();
  const path = location.pathname;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

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
  const handleCancelClassApi = async (id: string) => {
    try {
      setLoadingCancel(true);
      const data = await cancelClassApi(id);
      if (data.status) {
        message.success(data.msg);
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoadingCancel(false);
    }
  };
  const handleButtonFitClass = () => {
    if (user) {
      if (path === PagesPaths.HOMEPATH) {
        return (
          <Button
            loading={loading}
            onClick={() => handleBookClassApi(_id)}
            className="btn-read btn-orange"
            type="primary"
          >
            Book
          </Button>
        );
      }
      if (path === PagesPaths.DASHBOARDPATH) {
        return (
          <Button
            onClick={() => handleCancelClassApi(_id)}
            loading={loadingCancel}
            className="btn-read btn-orange"
            type="primary"
          >
            Cancel
          </Button>
        );
      }
      if (path === PagesPaths.CLASSESPATH) {
        return (
          <Button
            onClick={showModal}
            className="btn-read btn-orange"
            type="primary"
          >
            Edit
          </Button>
        );
      }
    }
    return <span className="read-content">Sign In To Book</span>;
  };
  return (
    <div className="read-container">
      {handleButtonFitClass()}
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
      <EditClassModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        record={{
          maxAttendees,
          startDate,
          timePeriod,
          description,
          _id,
          attendingUsers,
          title,
        }}
      />
    </div>
  );
};

export default ReadMore;
