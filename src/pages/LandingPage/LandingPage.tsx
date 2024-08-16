import { useState } from "react";
import User from "../../models/user";
import { Navigate, useLocation } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import classes from "./LandingPage.module.css";
import dummyProducts from "../../dummyData/dummyProducts";

const PRODUCTS_PER_PAGE = 3;

export default function LandingPage() {
  const { state } = useLocation();
  const [user] = useState<User>(state?.user);
  const [products] = useState<Product[]>([...dummyProducts]);
  const [activePage, setActivePage] = useState<number>(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const generatePagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={activePage === i ? classes.active : ""}>
          <Button onClick={() => setActivePage(i)}>{i}</Button>
        </li>
      );
    }

    return <ul className={classes.pagination}>{pages}</ul>;
  };

  return user ? (
    <Container>
      <Row className={classes.title + " mt-4 mb-4"}>
        <h1>Hello {user.firstName ?? ""}</h1>
      </Row>
      <Container>
        <ProductsGrid products={products} />
        {/* <p>{totalPages}</p> */}
        {generatePagination()}
      </Container>
    </Container>
  ) : (
    <Navigate to="/account/register" />
  );
}
