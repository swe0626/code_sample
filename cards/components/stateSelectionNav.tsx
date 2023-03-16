import React, { MouseEvent } from "react";
type StateSelectionNavProps = {
  stateList: Array<{ value: string; count: number }>;
  selectedStateValue: string;
  changeSelected: (index: number) => void;
};

export const StateSelectionNav: React.FC<StateSelectionNavProps> = (
  props: StateSelectionNavProps
) => {
  const { stateList, selectedStateValue, changeSelected } = props;
  const handleClick = React.useCallback(
    (index) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      changeSelected(index);
    },
    [changeSelected]
  );

  return (
    <ul className="nav nav-tabs nav-overflow header-tabs">
      {stateList.map((stateItem, index) => (
        <li className="nav-item" key={index}>
          <a
            href="#!"
            className={
              "nav-link text-nowrap" +
              (selectedStateValue === stateItem.value ? " active" : "")
            }
            style={{ cursor: "pointer" }}
            onClick={handleClick(index)}
          >
            {stateItem.value}{" "}
            <span className="badge rounded-pill bg-secondary-soft">
              {stateItem.count}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};
