import { Folder } from "lucide-react";
import type { FileStats } from "../../../../backend/types";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";
import FolderDropDownMenu from "./FolderDropDownMenu";

interface FolderCardProps {
  folder: FileStats;
}

export default function FolderCard({ folder }: FolderCardProps) {
  return (
    <Card className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <FolderDropDownMenu folder={folder} />
      </div>
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
