import React, { FC } from "react";
import { fitClass } from "../../types";
import fitImg from "../../assets/fitImg.png";
import "./classes.css";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

const text = `
  fitness is your way to achieve your peak.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Discover More",
    children: <p>{text}</p>,
  },
];
const ClassCard: React.FC<fitClass> = ({ title, description }) => {
  return (
    <div className="class-card">
      <img src={fitImg} alt="" />
      <div className="class-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Collapse ghost items={items} />
      </div>
    </div>
  );
};
//   <Collapse ghost items={items} />
export default ClassCard;
