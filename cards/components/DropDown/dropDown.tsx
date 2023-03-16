import React from "react";
import { Dropdown } from "react-bootstrap";
import "./dropDown.css";

type CardActionDropDownProps = {
  actionLabels: string[];
};
export const CardActionDropDown: React.FC<CardActionDropDownProps> = (
  props: CardActionDropDownProps
) => {
  const { actionLabels } = props;
  return (
    <Dropdown className="dropdown action-dropdown">
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="dropdown-ellipses dropdown-toggle"
      >
        <i className="fe fe-more-vertical"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {actionLabels.map((actionLabel, index) => (
          <Dropdown.Item href="#!" className="dropdown-item" key={index}>
            {actionLabel}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
