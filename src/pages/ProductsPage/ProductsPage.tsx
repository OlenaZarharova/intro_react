import { useCallback, useContext, useMemo, useState } from "react";
// import User from "../../models/user";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Col, Container, InputGroup, Row } from "react-bootstrap";
import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import dummyProducts from "../../dummyData/dummyProducts";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
// import { UserContext } from "../../contexts/userContext";
import { FiSearch } from "react-icons/fi";
import classes from "./ProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

const PRODUCTS_PER_PAGE = 3;

export default function ProductsPage() {
  // const { user } = useContext(UserContext);

  const [products] = useState<Product[]>([...dummyProducts]);
  const [productsOnPage, setProductsOnPage] = useState<Product[]>(
    dummyProducts.slice(0, PRODUCTS_PER_PAGE)
  );
  const [activePage, setActivePage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(products.length / PRODUCTS_PER_PAGE),
    [products.length]
  );

  const onPageChangeHandler = useCallback(
    (pageNumber: number) => {
      const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
      const end = start + PRODUCTS_PER_PAGE;

      setProductsOnPage(products.slice(start, end));
      setActivePage(pageNumber);
    },
    [products]
  );

  return (
    <Container>
      <PageTitle title="Kirdimer" />
      <Row>
        <Col className="mb-3">
          <Link
            className={classes.add_product + " btn btn-light"}
            to="/me/products"
          >
            Add a product
          </Link>
        </Col>
        <Col className="mb-3">
          <InputGroup>
            <Form.Control
              placeholder="Search"
              aria-label="Search Products"
              aria-describedby="Search Products"
            />
            <Button
              className={classes.btn_search + " btn btn-light"}
              variant="light"
            >
              <FiSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Container>
        <ProductsGrid products={productsOnPage} />
        {/* <p>{totalPages}</p> */}
        <CustomPagination
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
        />
      </Container>
    </Container>
  );
  // : (
  //   // <Navigate to="/account/register" />
  //   <Navigate to="/products" />
  // );
}
