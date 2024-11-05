"use client";

import MyChart from "@/app/component/dashBoardComponent/chart/chart";
import ParameterComponent from "@/app/component/dashBoardComponent/parameter/parameter";
import NotiFiCrawlStory from "@/app/component/notifiCrawlStory/notifiCrawlStory";
import { createAxios } from "@/Helper/CreateInterceptors";
import { apiChartViewDashBoard, apiParameter } from "@/lib/apiRequest/api";
import { LoginSuccess } from "@/lib/features/auth/login/loginSlider";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function DashBoard() {
  const dispatch = useAppDispatch();
  const stateUSer = useAppSelector((state) => state.loginReducer?.data);
  const accessToken = stateUSer.AccessToken;
  const data = useAppSelector((state) => state.chartDashBoardReducer.data);
  const dataParameter = useAppSelector((state) => state.parameterReducer.data);
  const createAxioss = useMemo(
    () => createAxios(stateUSer, dispatch, LoginSuccess),
    [dispatch, stateUSer]
  );
  useEffect(() => {
    apiChartViewDashBoard(dispatch, accessToken, createAxioss);
  }, [dispatch, accessToken, createAxioss]);
  useEffect(() => {
    apiParameter(dispatch, accessToken, createAxioss);
  }, [accessToken, dispatch, createAxioss]);
  return (
    <Container>
      <Row>
        <ParameterComponent dataParameter={dataParameter} />
        <Row>
          <Col lg={6}>
            <MyChart data={data} />
          </Col>
          <Col lg={6}>
            <NotiFiCrawlStory />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
