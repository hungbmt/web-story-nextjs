import { Col, Container, Row } from "react-bootstrap";
import "./footer.css";
export default function fooTerLayout() {
  return (
    <>
      <div className="footer-wraper">
        <div className="title-joint" style={{ margin: "30px 0 " }}>
          <span>HelloAz</span>
        </div>
        <Container className="pb-3">
          <Row>
            <Col xl={5}>
              <b>HelloAz</b> - Đọc truyện online, đọc truyện chữ, truyện hay.
              Website luôn cập nhật những bộ truyện mới thuộc các thể loại đặc
              sắc như truyện tiên hiệp, truyện kiếm hiệp, hay truyện ngôn tình
              một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính
              bảng.
            </Col>
            <div className="title-joint" style={{ margin: "20px 0 0 0" }}>
              <b>
                Website hoạt động dưới Giấy phép truy cập mở Creative Commons
                Attribution 4.0 International License
              </b>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
