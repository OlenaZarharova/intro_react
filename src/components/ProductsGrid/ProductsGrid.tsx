import { useCallback, useContext } from "react";
import Product from "../../models/Product";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Products.module.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { UserContext } from "../../contexts/userContext";

interface ProductsGridProps {
  products: Product[];
  onDeleteProduct: (productId: string) => void;
  itemsPerRow?: number;
}
export default function ProductsGrid({
  products,
  onDeleteProduct,
  itemsPerRow = 3,
}: ProductsGridProps) {
  itemsPerRow = itemsPerRow ?? 3;
  const totalRowsCount = Math.ceil(products.length / itemsPerRow);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isAdmin = user?.email === "user1@email.com";

  const createGrid = useCallback((): JSX.Element[] => {
    const grid: JSX.Element[] = [];
    let rowNumber = 1;
    let sliceIndex = 0;

    while (rowNumber <= totalRowsCount) {
      const productsInRow = products.slice(
        sliceIndex,
        sliceIndex + itemsPerRow
      );
      grid.push(
        <Row key={rowNumber}>
          {productsInRow.map((product, i) => (
            <Col sm={12} md={4} className="mb-3" key={`${rowNumber}_${i}`}>
              <Card className={classes.card} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.images[0]}
                  height="200px"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>${product.price}</strong>
                  </Card.Text>
                  <Link
                    className="btn btn-primary"
                    to={`/products/${product.id}`}
                  >
                    More
                  </Link>
                </Card.Body>
                {/* <Card.Footer className="text-muted">
                  Posted @ {new Date(product.postedAt).toDateString()}
                </Card.Footer> */}
                <div className={classes.buttons_container}>
                  {isAdmin && (
                    <>
                      <Button
                        onClick={() => navigate(`/addProduct/${product.id}`)}
                        variant="info"
                        title="Edit"
                      >
                        <MdEdit />
                      </Button>
                      <Button
                        onClick={() => onDeleteProduct(product.id)}
                        variant="danger"
                        title="Delete"
                      >
                        <MdDeleteForever />
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      );

      rowNumber++;
      sliceIndex += itemsPerRow;
    }

    return grid;
  }, [totalRowsCount, products, itemsPerRow]);

  return totalRowsCount ? (
    createGrid()
  ) : (
    <Row>
      <p>No products found</p>
    </Row>
  );
}
