import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormInput from "../../components/FormInput/FormInput";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import dummyProducts from "../../dummyData/dummyProducts";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Product from "../../models/Product";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function ProductFormPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setIsValidated(true);
      return;
    }

    const newProduct: Product = {
      id: String(dummyProducts.length + 1),
      name,
      price: Number(price),
      postedBy: user!.email,
      postedAt: new Date(),
      description,
      images:
        images.length > 0
          ? images.map((file) => URL.createObjectURL(file))
          : ["https://placehold.co/600x400"],
    };

    dummyProducts.push(newProduct);

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
    </Container>
  );
}
