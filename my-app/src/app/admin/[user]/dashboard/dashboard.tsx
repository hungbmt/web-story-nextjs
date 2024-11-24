"use client";

import MyChart from "@/app/component/dashBoardComponent/chart/chart";
import ParameterComponent from "@/app/component/dashBoardComponent/parameter/parameter";
import NotiFiCrawlStory from "@/app/component/notifiCrawlStory/notifiCrawlStory";
import { CreateAxios } from "@/Helper/CreateInterceptors";
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

  // const createAxioss = useMemo(
  //   () => CreateAxios(stateUSer, dispatch, LoginSuccess),
  //   [dispatch, stateUSer]
  // );
  const CreateApiRf = CreateAxios(stateUSer, dispatch, LoginSuccess);
  const createAxioss = useEffect(() => {
    if (accessToken) {
      apiChartViewDashBoard(dispatch, accessToken, CreateApiRf);
    }
  }, [dispatch, accessToken, CreateApiRf]);

  useEffect(() => {
    if (accessToken) {
      apiParameter(dispatch, accessToken, CreateApiRf);
    }
  }, [accessToken, dispatch, CreateApiRf]);
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
