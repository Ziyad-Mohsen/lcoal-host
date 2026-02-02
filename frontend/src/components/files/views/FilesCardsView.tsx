import type { FileStats } from "../../../../../backend/types";
import FileCard from "../FileCard";
import FolderCard from "../FolderCard";

export default function FilesCardsView({ files }: { files: FileStats[] }) {
  return (
    <div>
      {files.map((file) =>
        file.isFile ? <FileCard file={file} /> : <FolderCard folder={file} />,
      )}
    </div>
  );
}
