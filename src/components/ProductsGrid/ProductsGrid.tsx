import { useCallback } from "react";
import Product from "../../models/Product";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Products.module.css";

interface ProductsGridProps {
  products: Product[];
  itemsPerRow?: number;
}
export default function ProductsGrid({
  products,
  itemsPerRow = 3,
}: ProductsGridProps) {
  itemsPerRow = itemsPerRow ?? 3;
  const totalRowsCount = Math.ceil(products.length / itemsPerRow);

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
                <Card.Img variant="top" src={product.imageUrl} height="200px" />
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
                <Card.Footer className="text-muted">
                  Posted @ {product.postedAt.toDateString()}
                </Card.Footer>
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
