import React, { FC, useContext, useEffect, useState } from "react";
import "./UploadIndicator.css";

import FileCard from "./FileCard";
import FileContext from "../../context/FileContext";
import useFiles from "../../hooks/useFiles";
import { MAX_SIZE } from "../../utils/computeQuantities";

interface Props {}

const UploadIndicator: FC<Props> = () => {
  const { remove, swap } = useContext(FileContext);
  const { progress } = useContext(FileContext);
  const files = useFiles();

  const [cappedFiles, setCappedFiles] = useState<{ [hash: string]: boolean }>(
    {}
  );

  useEffect(() => {
    let size = 0;
    for (const file of files) {
      size += file.blob.size / 2 ** 20;

      if (size <= MAX_SIZE) {
        setCappedFiles((prev) => ({ ...prev, [file.hash]: false }));
      } else {
        setCappedFiles((prev) => ({ ...prev, [file.hash]: true }));
      }
    }
  }, [files]);

  return (
    <div className="uploadIndicator">
      {files.map((file) => {
        return (
          <FileCard
            name={file.name}
            progress={progress[file.hash]}
            articles={file.articles}
            citations={file.citations}
            keywords={file.keywords}
            remove={() => remove(file.hash)}
            move={() => swap(file.hash)}
            capped={cappedFiles[file.hash]}
            size={file.blob.size / 2 ** 20}
            key={file.hash}
          />
        );
      })}
    </div>
  );
};

export default UploadIndicator;
