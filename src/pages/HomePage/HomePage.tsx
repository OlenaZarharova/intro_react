import { Container, Row } from "react-bootstrap";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function homePage() {
  return (
    <Container>
      <PageTitle title="Kidimer" />
      <Row>
        <h2>About</h2>
      </Row>
    </Container>
  );
}
