import { Container, Row } from "react-bootstrap";
import DefaultLayout from "../layout/defaultLayout/DefaulrLayout";
import AuthComponent from "../component/authComponent/auth/auth";
const Auth = () => {
  return (
    <DefaultLayout>
      <div className="auth-wraper">
        <Container>
          <AuthComponent />
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default Auth;
