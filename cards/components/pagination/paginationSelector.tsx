import React from "react";
import * as _ from "lodash";
import { ConditionalToolTip } from "../../../../components/Shared/conditionalTooltip";
import { Row } from "react-bootstrap";

type PaginationSelectorProps = {
  totalPage: number;
  pageNum: number;
  viewRadius: number;
  changePageNum: (page: number) => void;
  loading: boolean;
};
export const PaginationSelector: React.FC<PaginationSelectorProps> = (
  props: PaginationSelectorProps
) => {
  const { totalPage, pageNum, viewRadius, changePageNum, loading } = props;
  const PrevTxt = "Prev",
    NextTxt = "Next";

  let start = 1;
  if (pageNum > viewRadius + 1) {
    if (pageNum + viewRadius <= totalPage) {
      start = pageNum - viewRadius;
    } else {
      start = Math.max(totalPage - viewRadius * 2, 1);
    }
  }
  const end = Math.min(start + viewRadius * 2, totalPage);

  const handleMoveButtonClick = (amount: number) => () => {
    if (pageNum + amount < 1 || pageNum + amount > totalPage) return;
    changePageNum(pageNum + amount);
  };

  const pageNumberList = [];
  if (start > 1)
    pageNumberList.push(
      <li key={Math.random()}>
        <a
          className="page"
          href="#!"
          onClick={(e) => changePageNum(pageNum - viewRadius - 1)}
        >
          ...
        </a>
      </li>
    );

  _.range(start - 1, end).forEach((pageNo: number) => {
    pageNumberList.push(
      <li className={pageNo + 1 === pageNum ? "active" : ""} key={pageNo}>
        <a
          className="page"
          href="#!"
          onClick={(e) => changePageNum(pageNo + 1)}
        >
          {pageNo + 1}
        </a>
      </li>
    );
  });

  if (end < totalPage)
    pageNumberList.push(
      <li key={Math.random()}>
        <a
          className="page"
          href="#!"
          onClick={(e) => changePageNum(pageNum + viewRadius + 1)}
        >
          ...
        </a>
      </li>
    );
  return (
    <Row className="g-0">
      <ul className="col list-pagination-prev pagination pagination-tabs justify-content-end">
        <li className="page-item">
          <ConditionalToolTip
            condition={!loading && pageNum === 1}
            tooltipTxt={"Start page"}
          >
            <a
              className="page-link"
              href="#!"
              onClick={handleMoveButtonClick(-1)}
            >
              <i className="fe fe-arrow-left me-1"></i> {PrevTxt}
            </a>
          </ConditionalToolTip>
        </li>
      </ul>

      {/* <ul className="col list-pagination pagination pagination-tabs justify-content-center">
        {pageNumberList}
      </ul> */}

      <ul className="col list-pagination-next pagination pagination-tabs justify-content-start">
        <li className="page-item">
          <ConditionalToolTip
            condition={!loading && pageNum === totalPage}
            tooltipTxt={"End page"}
          >
            <a
              className="page-link"
              href="#!"
              onClick={handleMoveButtonClick(1)}
            >
              {NextTxt} <i className="fe fe-arrow-right ms-1"></i>
            </a>
          </ConditionalToolTip>
        </li>
      </ul>
    </Row>
  );
};
