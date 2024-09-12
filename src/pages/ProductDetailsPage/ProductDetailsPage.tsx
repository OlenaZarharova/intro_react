import { useParams } from "react-router-dom";
import Product from "../../models/Product";
import { useEffect, useState } from "react";
import { Carousel, Container, Row, Image } from "react-bootstrap";
import classes from "./ProductDetailsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";
import httpError from "../../models/httpError";
import { AxiosError } from "axios";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [error, setError] = useState<httpError | undefined>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await productsService.getProduct(productId ?? "");
        setProduct(response);
      } catch (error) {
        const e = error as AxiosError;
        setError({ message: e.message });
      } finally {
        //setIsLoading(false);
      }

      // onPageChangeHandler(activePage);
      //setIsLoading(false);
    };

    getProducts();
  }, []);

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
      </Row>
    </Container>
  ) : (
    <div>
      <strong>Product with id of: {productId} was not found.</strong>
    </div>
  );
}
