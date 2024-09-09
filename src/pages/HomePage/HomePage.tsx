import { Col, Container, Row } from "react-bootstrap";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function HomePage() {
  return (
    <Container>
      <PageTitle title="Kirdimer" />
      <Row className="text-center">
        <Col>
          <h3>Portfolio</h3>
        </Col>
        <Col>
          <h3>Shop</h3>
        </Col>
        <Col>
          <h3>Blog</h3>
        </Col>
      </Row>
    </Container>
  );
}
