import React, { useState, FormEvent } from "react";
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
    <form onSubmit={handleSubmit}>
      {fileContent && (
        <img alt={fileName} src={fileContent} style={{ maxWidth: 400 }} />
      )}
      <FilePicker accept="image/*" id="picture" onFilePick={handleFilePick} />

      <div>
        <label htmlFor="caption">Write a caption</label>
        <br />
        <textarea
          disabled={disabled}
          id="caption"
          onChange={e => setCaption(e.target.value)}
          required
          value={caption}
        />
      </div>

      {errorMessage && <div>{errorMessage}</div>}

      <button disabled={disabled} type="submit">
        Create new post
      </button>
    </form>
  );
};

export default NewPostForm;
