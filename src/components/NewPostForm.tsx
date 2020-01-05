import React, { useState, FormEvent } from "react";
import { Button, Form, Image, Message, TextArea } from "semantic-ui-react";
import { FormProps } from "../types";
import FilePicker from "./FilePicker";

export const readFileAsDataURL = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });

export type NewPostFormValues = {
  caption: string;
  fileContent: string;
  fileName: string;
};

type Props = FormProps<NewPostFormValues>;

const NewPostForm: React.FC<Props> = ({ disabled, errorMessage, onSubmit }) => {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [caption, setCaption] = useState("");
  const handleFilePick = async (result: File | Array<File>) => {
    if (result instanceof File) {
      setFileName(result.name);
      setFileContent(await readFileAsDataURL(result));
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (fileContent) {
      onSubmit({ fileName, fileContent, caption });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        {fileContent && (
          <Image
            alt={fileName}
            rounded
            size="large"
            src={fileContent}
            style={{ marginBottom: "1rem" }}
          />
        )}
        <FilePicker accept="image/*" id="picture" onFilePick={handleFilePick} />
      </Form.Field>

      <Form.Field>
        <TextArea
          disabled={disabled}
          onChange={(_e, { value }) => setCaption(value as string)}
          placeholder="Write a caption"
          required
          value={caption}
        />
      </Form.Field>

      {errorMessage && <Message negative>{errorMessage}</Message>}

      <Button disabled={disabled} primary type="submit">
        Create new post
      </Button>
    </Form>
  );
};

export default NewPostForm;
