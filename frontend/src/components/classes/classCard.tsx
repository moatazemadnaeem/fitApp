import React from "react";
import { fitClassBase } from "../../types";
import fitImg from "../../assets/fitImg.png";
import "./classes.css";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import ReadMore from "./readMore";
const text = `
  fitness is your way to achieve your peak.
`;

const ClassCard: React.FC<fitClassBase> = (props) => {
  const { title, description } = props;
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Read More",
      children: <ReadMore {...props} />,
    },
  ];
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
