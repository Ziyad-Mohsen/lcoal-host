import { Link, useLocation } from "react-router-dom";
import type { FileStats } from "../../../../../backend/types";
import FileCard from "../FileCard";
import FolderCard from "../../folders/FolderCard";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function FilesCardsView({ files }: { files: FileStats[] }) {
  const path = useLocation().pathname;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {path != "/" && (
        <Card>
          <Link
            to=".."
            relative="path"
            className="flex items-center justify-center w-full h-full"
          >
            <ArrowLeft />
          </Link>
        </Card>
      )}
      {files.map((file) =>
        file.isFile ? (
          <FileCard key={path + file.name} file={file} />
        ) : (
          <FolderCard key={path + file.name} folder={file} />
        ),
      )}
    </div>
  );
}
