import type { AppProps } from "next/app";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface type {
  dataParameter: {
    totalStory: number;
    totalViewPage: number;
    totalUser: number;
    totalError: number;
  };
}

const ParameterComponent: React.FC<type> = ({ dataParameter }) => {
  console.log(dataParameter);
  return (
    <>
      <div className="title-joint mt-5">
        <span>dashboard</span>
      </div>
      <div className="dashboard-parameter-wraper">
        <Row>
          <Col xl={3} md={6}>
            <div className="dashboard-parameter-box story-backgrourd">
              <div className="icon-wraper">
                <i className="fa-solid fa-table-list"></i>
              </div>
              <span>{dataParameter.totalStory}</span>
              <span className="text-sub">Tổng số truyện</span>
            </div>
          </Col>
          <Col xl={3} md={6}>
            <div className="dashboard-parameter-box view-backgrourd">
              <div className="icon-view-wraper">
                <i className="fa-solid fa-eye"></i>
              </div>
              <span>{dataParameter.totalViewPage}</span>
              <span className="text-sub">Tổng số view</span>
            </div>
          </Col>
          <Col xl={3} md={6}>
            <div className="dashboard-parameter-box user-backgrourd">
              <div className="icon-wraper icon-user">
                <i className="fa-solid fa-users"></i>
              </div>
              <span>{dataParameter.totalUser}</span>
              <span className="text-sub">Tổng số user</span>
            </div>
          </Col>
          <Col xl={3} md={6}>
            <div className="dashboard-parameter-box user-backgrourd">
              <div className="icon-wraper icon-user">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <span>{dataParameter.totalError}</span>
              <span className="text-sub">error Chapter</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ParameterComponent;
