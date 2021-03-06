import React, { useRef, useState, ChangeEvent } from "react";
import { Input } from "semantic-ui-react";

type Props = {
  accept?: string;
  disabled?: boolean;
  id: string;
  multiple?: boolean;
  onFilePick: (result: File | Array<File>) => void;
};

const FilePicker: React.FC<Props> = ({
  accept,
  disabled,
  id,
  multiple,
  onFilePick
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const handleBrowse = () => {
    inputRef?.current?.click();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      setFileName(files.map(file => file.name).join(", "));
      onFilePick(multiple ? files : files[0]);
    }
  };

  return (
    <div>
      <input
        accept={accept}
        disabled={disabled}
        id={id}
        multiple={multiple}
        onChange={handleChange}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
      />

      <Input
        action={{ content: "Browse", onClick: handleBrowse, type: "button" }}
        onClick={handleBrowse}
        readOnly
        value={fileName}
      />
    </div>
  );
};

export default FilePicker;
