import SideBar from "@/app/component/layoutComponent/sidebar/sideBar";
import { Col, Container, Row } from "react-bootstrap";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-wraprer">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Col xl={2}>
        <SideBar />
      </Col>
      <Col xl={10}>
        <Container>
          <Row>{children}</Row>
        </Container>
      </Col>
    </div>
  );
}
