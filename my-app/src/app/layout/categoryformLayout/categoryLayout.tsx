import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import AdminLayout from "../adminLayout/adminLayout";
import "./categoryLayout.css";
export default function CategoryLayout({
  namePagem,
  children, // will be a page or nested layout
}: {
  namePagem: string;
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
      <div className="category-wraprer">
        <div className="title-joint mt-4">
          <span>{namePagem} Manager</span>
        </div>
        <Row>
          <Col xl={3}>
            <div className="menu-create-ct-left">
              <span>{namePagem} Grups</span>
              <div className="link-list-category-box">
                <div>
                  <Link href={"/admin/hung/create-category"}>
                    <i className="fa-solid fa-tags"></i> category
                  </Link>
                </div>
                <div>
                  <Link href={"/admin/hung/create-list"}>
                    <i className="fa-solid fa-tags"></i> list
                  </Link>
                </div>
              </div>
            </div>
            <button className="btn-add">new</button>
          </Col>
          <Col xl={9}>{children}</Col>
        </Row>
      </div>
    </AdminLayout>
  );
}
