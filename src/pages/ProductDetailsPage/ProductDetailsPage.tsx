import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import { useState } from "react";
import dummyProducts from "../../dummyData/dummyProducts";
import { Carousel, Container, Row, Image } from "react-bootstrap";
import classes from "./ProductDetailsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const [product] = useState<Product | undefined>(
    dummyProducts.find((p) => p.id === productId)
  );

  console.log(product);

  return product ? (
    <Container fluid>
      <PageTitle title={product.name} />
      <Row>
        <Carousel data-bs-theme="dark">
          {product.images.map((imageUrl, i) => (
            <Carousel.Item key={i}>
              <Image
                className={classes.image + " rounded mx-auto d-block"}
                src={imageUrl}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
      <Row className={classes.details_section + " mt-5 mb-5"}>
        <h5>Price: ${product.price}</h5>
        <hr />
        {product.description && <p>{product.description}</p>}
        <hr />
        <p>Posted @ {product.postedAt.toDateString()}</p>
        <p>
          Seller email:
          <a href={`mailto:${product.postedBy}`}>{product.postedBy}</a>
        </p>
      </Row>
    </Container>
  ) : (
    <div>
      <strong>Product with id of: {productId} was not found.</strong>
    </div>
  );
}
