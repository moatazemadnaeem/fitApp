import ClassCard from "./classCard";
import "./classes.css";
import React, { useState } from "react";
import { Pages, PageType } from "../../types";
import { Button } from "antd";
import { useReadFitClasses } from "../../hooks/useReadFitClasses";
const FitClasses: React.FC<{ type: PageType }> = ({ type }) => {
  const [page, setPage] = useState<number>(1);
  const { classes, loadingDash, status, error, loading, loadingClass } =
    useReadFitClasses(page, type);
  const handleLoading = () => {
    if (type === Pages.HOME) {
      return loading;
    }
    if (type === Pages.DASHBOARD) {
      return loadingDash;
    }
    if (type === Pages.CLASSES) {
      return loadingClass;
    }
    return loading;
  };
  if (status) {
    if (classes.length < 1) {
      return (
        <span className="no-classes">
          There Are No Classes For Now Please Come Soon!
        </span>
      );
    } else {
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
          <Button
            className="btn-class btn-orange"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            loading={handleLoading()}
            type="primary"
          >
            Load More
          </Button>
        </div>
      );
    }
  }
  return <span className="no-classes no-classes-error">{error}</span>;
};

export default FitClasses;
