import { Folder } from "lucide-react";
import type { FileStats } from "../../../../backend/types";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";

interface FolderCardProps {
  folder: FileStats;
}

export default function FolderCard({ folder }: FolderCardProps) {
  return (
    <Card>
      <Link
        className="w-full h-full flex flex-col items-center justify-center gap-2"
        to={folder.name}
      >
        <div className="w-fit p-5 bg-primary text-primary-foreground rounded-lg">
          <Folder strokeWidth={1.5} />
        </div>
        {folder.name}
      </Link>
    </Card>
  );
}
