import { useContext, useEffect, useMemo, useState } from "react";
// import User from "../../models/user";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  Alert,
  Button,
  Col,
  Container,
  InputGroup,
  Row,
} from "react-bootstrap";
import Product from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
// import dummyProducts from "../../dummyData/dummyProducts";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
// import { UserContext } from "../../contexts/userContext";
import { FiSearch } from "react-icons/fi";
import classes from "./ProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";
import { UserContext } from "../../contexts/userContext";

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
  // const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useContext(UserContext);
  const isAdmin = user?.email === "user1@email.com";

  // const [productsOnPage, setProductsOnPage] = useState<Product[]>([]);

  // const [products] = useState<Product[]>([...dummyProducts]);
  // const [productsOnPage, setProductsOnPage] = useState<Product[]>(
  //   dummyProducts.slice(0, PRODUCTS_PER_PAGE)
  // );
  const [activePage, setActivePage] = useState<number>(1);
  const [hasError, setHasError] = useState<boolean>(false);

  const totalPages = useMemo(
    () => Math.ceil(products.length / PRODUCTS_PER_PAGE),
    [products.length]
  );

  const startProductIndex = useMemo(
    () => (activePage - 1) * PRODUCTS_PER_PAGE,
    [activePage]
  );

  const lastProductIndex = useMemo(
    () => startProductIndex + PRODUCTS_PER_PAGE,
    [startProductIndex]
  );

  // const onPageChangeHandler = useCallback(
  //   (pageNumber: number) => {
  //     const start = (pageNumber - 1) * PRODUCTS_PER_PAGE;
  //     const end = start + PRODUCTS_PER_PAGE;

  //     setProductsOnPage(products.slice(start, end));
  //     setActivePage(pageNumber);
  //   },
  //   []
  // );

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await productsService.getAllProducts();
        setProducts(response);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }

      // onPageChangeHandler(activePage);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  const onDeleteProductHandler = async (productId: string) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      return;
    }

    try {
      setIsLoading(true);
      await productsService.deleteProduct(productId);

      setProducts((prev) => {
        return prev.filter((product) => product.id !== productId);
      });
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   onPageChangeHandler(1);
  // }, [onPageChangeHandler, products]);

  const pageContent = (
    <>
      <Row>
        <Col className="mb-3">
          {isAdmin && (
            <Link
              className={classes.add_product + " btn btn-light"}
              to="/me/products"
            >
              Add a product
            </Link>
          )}
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
        {isLoading ? (
          <h5>Loading...</h5>
        ) : (
          <>
            {/* <ProductsGrid products={productsOnPage} /> */}
            <ProductsGrid
              products={products.slice(startProductIndex, lastProductIndex)}
              onDeleteProduct={onDeleteProductHandler}
            />
            {/* <p>{totalPages}</p> */}
            {products.length > PRODUCTS_PER_PAGE && (
              <CustomPagination
                activePage={activePage}
                totalPages={totalPages}
                // onPageChange={onPageChangeHandler}
                onPageChange={(pageNumber) => setActivePage(pageNumber)}
              />
            )}
          </>
        )}
      </Container>
    </>
  );

  return (
    <Container>
      <PageTitle title="Kidimer" />
      {hasError ? (
        <Alert variant="danger">Something went wrong. Please try again.</Alert>
      ) : (
        pageContent
      )}
    </Container>
  );
  // : (
  //   // <Navigate to="/account/register" />
  //   <Navigate to="/products" />
  // );
}
