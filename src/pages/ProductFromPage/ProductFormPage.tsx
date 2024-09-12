import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../../components/FormInput/FormInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { UserContext } from "../../contexts/userContext";
import { useNavigate, useParams } from "react-router-dom";
import Product from "../../models/Product";
import PageTitle from "../../components/PageTitle/PageTitle";
import productsService from "../../services/productsService";

export default function ProductFormPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [products] = useState<Product[]>([]);
  // const [product, setProduct] = useState<Product | undefined>(undefined);

  // const product = products.find((p) => p.id === productId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const { name, price, description } = await productsService.getProduct(
          productId!
        );
        setName(name);
        setPrice(price.toString());
        setDescription(description ?? "");
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsValidated(true);
      return;
    }

    const newProduct: Product = {
      // id: String(dummyProducts.length + 1),
      id: "",
      name,
      price: Number(price),
      ownerId: user!.id,
      ownerEmail: user!.email,
      postedAt: new Date(),
      description,
      images:
        images.length > 0
          ? images.map((file) => URL.createObjectURL(file))
          : ["https://placehold.co/600x400"],
    };

    // dummyProducts.push(newProduct);

    navigate(`/products/${newProduct.id}`);
  };

  return (
    <Container>
      <PageTitle title="Add a product" />
      <Form noValidate validated={isValidated} onSubmit={onSubmitHandler}>
        <Row className="mb-5">
          <Col>
            <Button type="submit" className="float-end">
              Publish
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormInput
              required
              title="Product Name"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></FormInput>
          </Col>
          <Col>
            <FormInput
              required
              title="Price"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            ></FormInput>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <FormInput
              title="Description"
              type="textarea"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></FormInput>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <ImageUpload
              onChange={(files) => setImages(files)}
              onImageDelete={(i) =>
                setImages((prev) => {
                  const newPreviewUrl = [...prev];
                  newPreviewUrl.splice(i, 1);
                  return newPreviewUrl;
                })
              }
            />
          </Col>
        </Row>
      </Form>
      {/* {hasError ? "Error Message Alert" : pageContent} */}
    </Container>
  );
}
