import ClassCard from "./classCard";
import "./classes.css";
import React, { useState } from "react";
import { Pages, PageType } from "../../types";
import { Button } from "antd";
import { useReadFitClasses } from "../../hooks/useReadFitClasses";
const FitClasses: React.FC<{ type: PageType }> = ({ type }) => {
  const [page, setPage] = useState<number>(1);
  const { classes, status, loading, error, createdClasses, dashboard } =
    useReadFitClasses(page, type);
  if (type === Pages.HOME) {
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
              className="btn-class btn-orange btn-load"
              loading={loading}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              type="primary"
            >
              Load More
            </Button>
          </div>
        );
      }
    }
    return <span className="no-classes no-classes-error">{error}</span>;
  }
  if (type === Pages.DASHBOARD) {
    if (dashboard.status) {
      if (dashboard.classes.length < 1) {
        return (
          <span className="no-classes">
            There Are No Classes For Now Please Come Soon!
          </span>
        );
      } else {
        return (
          <div className="class-list">
            {dashboard.classes.map((card) => (
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
              className="btn-class btn-orange btn-load"
              loading={dashboard.loading}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              type="primary"
            >
              Load More
            </Button>
          </div>
        );
      }
    }
    return (
      <span className="no-classes no-classes-error">{dashboard.error}</span>
    );
  }
  if (type === Pages.CLASSES) {
    if (createdClasses.status) {
      if (createdClasses.classes.length < 1) {
        return (
          <span className="no-classes">
            There Are No Classes For Now Please Come Soon!
          </span>
        );
      } else {
        return (
          <div className="class-list">
            {createdClasses.classes.map((card) => (
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
              className="btn-class btn-orange btn-load"
              loading={createdClasses.loading}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              type="primary"
            >
              Load More
            </Button>
          </div>
        );
      }
    }
    return (
      <span className="no-classes no-classes-error">
        {createdClasses.error}
      </span>
    );
  }
  return <></>;
};

export default FitClasses;
