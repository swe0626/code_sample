import React, { useCallback, useState } from "react";
import PaginationContainer from "../components/pagination/paginationContainer";
import ApiKeySwitcher from "../../../components/Shared/apiKeySwitcher/apiKeySwitcher";
import Title from "../../../components/Shared/title";
import { CardDetailsResponse } from "../../../model/Card/Card.js";
import { CardComponent } from "../components/card/card";
import { StateSelectionNav } from "../components/stateSelectionNav";
import { Col, Container, Row } from "react-bootstrap";

const allowedSizes = [
  { key: '5 per page', value: 5 },
  { key: '10 per page', value: 10 },
  { key: '20 per page', value: 20 },
];

const stateList = [
  {value: "All", count:682},
  {value: "Completed", count:23},
  {value: "Processing", count:43},
  {value: "Errors", count:23},
];

const CardListView: React.FC<{data: CardDetailsResponse[]}> = (props) => {
  const {data} = props;
  const cardData = data ?? []
  return (
    <>
      {cardData.map((item: CardDetailsResponse, i: number) => (
        <CardComponent card={item} key={i} />
      ))}
    </>
  );
};

export const CardsPage: React.FC = () => {
  const [selectedStateValue, setSelected] = useState('All')
  const [data, setData] = useState<CardDetailsResponse[]>([])
  const [sandMode, setSandMode] = useState(false);

  const changeSelected = useCallback((index: number) => {
    setSelected(stateList[index].value)
  }, [])

  const changeAPIKey = useCallback((checked: boolean) => {
    setSandMode(checked);
  }, [])

  const handleDataChanged = (data: CardDetailsResponse[]) => {
    setData(data);
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs lg={12}>
          <div className="header">
            <div className="header-body">
              <Row className="align-items-center">
                <Col>
                  <Title title = "Companies" preTitle = "Overview"/>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col className="d-flex justify-content-between align-items-center cardlist-header-md">
                  <StateSelectionNav stateList={stateList} changeSelected={changeSelected} selectedStateValue={selectedStateValue}/>
                  <ApiKeySwitcher changeAPIKey={changeAPIKey}/>
                </Col>
              </Row>
            </div>
          </div>
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="companiesCardsPane"
              role="tabpanel"
              aria-labelledby="companiesCardsTab"
            >
              <div id="companiesCards">
                <PaginationContainer
                  searchBox={true}
                  filterDialog={false}
                  allowedSizes={allowedSizes}
                  sandMode={sandMode}
                  handleDataChanged={handleDataChanged}
                > 
                  <Row className="list">
                    <CardListView data= {data}/>
                  </Row>
                </PaginationContainer>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
