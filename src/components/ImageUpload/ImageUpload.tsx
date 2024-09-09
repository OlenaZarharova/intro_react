import { Button, Form } from "react-bootstrap";
import classes from "./ImageUpload.module.css";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
  onImageDelete: (index: number) => void;
}

export default function ImageUpload({
  onChange,
  onImageDelete,
}: ImageUploadProps): JSX.Element {
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const filesArray = [...files];
    setIsLoading(true);
    setPreviewUrl(filesArray.map((file) => URL.createObjectURL(file)));
    onChange(filesArray);
  };

  const onDeleteClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setPreviewUrl((prev) => {
      const newPreviewUrl = [...prev];
      newPreviewUrl.splice(index, 1);
      return newPreviewUrl;
    });
    onImageDelete(index);
  };

  return (
    <div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Select images</Form.Label>
        <Form.Control
          onChange={onChangeHandler}
          type="file"
          multiple
          accept=".jpg,.png,.jpeg"
        />
      </Form.Group>

      <ul className={classes.preview_list}>
        {previewUrl.map((url, i) => (
          <li key={i}>
            <img
              src={url}
              alt="Preview image"
              onLoad={() => {
                if (i === Array.length - 1) {
                  setIsLoading(false);
                }
              }}
            />
            {!isLoading && (
              <Button
                onClick={(e) => onDeleteClickHandler(e, i)}
                type="button"
                variant="danger"
              >
                <MdDeleteOutline />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
