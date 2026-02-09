import { Card, CardContent } from "@/components/ui/card";
import type { FileStats } from "../../../../backend/types";
import { getFileConfig } from "@/lib/fileTypeConfig";
import { formatFileSize, formatRelativeDate } from "@/lib/utils";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "@/lib/axios";
import FileDropDownMenu from "./FileDropDownMenu";
import { useStoragePath } from "@/hooks/useStoragePath";

interface FileCardProps {
  file: FileStats;
}

export default function FileCard({ file }: FileCardProps) {
  const path = useStoragePath();
  const fileConfig = getFileConfig({
    extension: file.extension,
    mimeType: file.mimeType,
  });
  const Icon = fileConfig.icon;
  const filePath = path.join(file.name);
  return (
    <Card className="relative items-center p-5">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Button size="icon-sm" variant="outline" asChild>
          <Link to={`${apiBaseUrl}/files/download?path=${filePath}`}>
            <Download />
          </Link>
        </Button>
        <FileDropDownMenu file={file} />
      </div>
      <div
        className="w-fit p-5 rounded-lg"
        style={{
          color: fileConfig.color,
          backgroundColor: fileConfig.color + "40" /* Alpha value */,
        }}
      >
        <Icon strokeWidth={1} />
      </div>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
        <div className="w-3/4 text-center text-ellipsis text-nowrap overflow-hidden">
          {file.name}
        </div>
        <div className="text-sm text-muted-foreground">
          <span>{formatFileSize(file.size)}</span> &bull;{" "}
          <span>{formatRelativeDate(Date.parse(file.createdAt))}</span>
        </div>
      </CardContent>
    </Card>
  );
}
