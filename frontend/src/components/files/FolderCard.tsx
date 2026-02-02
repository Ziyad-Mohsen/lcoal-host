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
      <Link to={folder.name}>
        <Folder />
        {folder.name}
      </Link>
    </Card>
  );
}
