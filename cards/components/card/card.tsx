import React, { useContext, useEffect, useState, useCallback } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import errorPicture from "../../../../assets/images/error.png";
import Loading from "../../../../components/Shared/loading";
import CardScanApiContext from "../../../../context/cardScanApiContext";
import { CardDetailsResponse } from "../../../../model/Card/Card";
import { CardActionDropDown } from "../DropDown";
import "./card.css";

const CardInfoItem: React.FC<{ title: string; value?: string }> = (props: {
  title: string;
  value?: string;
}) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <small>{props.title}</small>
        </Col>
        <Col xs="auto">
          <a href="#!">
            <small className="item-owner">{props.value ?? " "}</small>
          </a>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export const CardComponent: React.FC<{ card: CardDetailsResponse }> = ({
  card,
}) => {
  const actionLabels = ["Action", "Another action", "Something else here"];
  const [imageLoading, setImageLoading] = useState(false);
  const createdDate = new Date(card.created_at ?? "").toDateString();

  const memberId = card.details?.member_number?.value;
  const memberName = card.details?.member_name?.value;
  const payerName = card.details?.payer_name?.value;
  const groupId = card.details?.group_number?.value;

  const cardId = card.card_id;
  const { cardScanApi } = useContext(CardScanApiContext);
  const [cardImage, setCardImage] = useState("");
  useEffect(() => {
    setImageLoading(true);
    cardScanApi
      ?.getCardImage(cardId)
      .then((res: any) => {
        setCardImage(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setImageLoading(false);
      });
    return () => {
      setCardImage("");
    };
  }, [cardId, cardScanApi]);

  const getDefaultImage = useCallback((e) => {
    console.log(e);
    e.target.onerror = null;
    e.target.src = errorPicture;
  }, []);
  return (
    <Col md={6} xl={4}>
      <Card className="card-list-item scanned-card-list">
        <Card.Body>
          <Row className="state">{card.state}</Row>
          <Row className="align-items-center">
            <Col></Col>
            <Col xs="auto">
              <CardActionDropDown actionLabels={actionLabels} />
            </Col>
          </Row>

          <a href="#!" className="avatar avatar-xl card-avatar scanned-avatar">
            {imageLoading ? (
              <Loading />
            ) : (
              <img
                src={cardImage}
                onError={getDefaultImage}
                className="avatar-img rounded"
                alt="..."
              />
            )}
          </a>

          <div className="text-center mb-5">
            <Card.Title>
              <a className="item-name" href="#!">
                {memberName ?? `\u00A0`}
              </a>
            </Card.Title>
          </div>

          <hr className="card-divider mb-0" />

          <ListGroup variant="flush" className="mb-n3">
            <CardInfoItem title="Payer" value={payerName} />
            <CardInfoItem title="Group ID" value={groupId} />
            <CardInfoItem title="Member ID" value={memberId} />
            <CardInfoItem title="Created" value={createdDate} />
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};
