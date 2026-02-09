import type { FileDialogProps } from "./types";
import { getFileConfig } from "@/lib/fileTypeConfig";
import { formatFileSize, formatRelativeDate } from "@/lib/utils";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function FileInfo({ property, value }: { property: string; value: string }) {
  return (
    <span className="flex items-center">
      <span className="font-bold mr-2">{property}:</span>
      <span>{value}</span>
    </span>
  );
}

export default function FileInfoDialog({
  open,
  setIsOpen,
  file,
}: FileDialogProps) {
  const fileConfig = getFileConfig({
    extension: file.extension,
    mimeType: file.mimeType,
  });
  const FileIcon = fileConfig.icon;
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex max-md:flex-col items-center gap-5">
          <div
            className="p-5 rounded-lg"
            style={{
              color: fileConfig.color,
              backgroundColor: fileConfig.color + "40" /* Alpha value */,
            }}
          >
            <FileIcon />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-wrap text-ellipsis max-w-full overflow-hidden">
              {file.name}
            </DialogTitle>
            <DialogDescription>
              <FileInfo property="Size" value={formatFileSize(file.size)} />
              <FileInfo property="Type" value={file.mimeType || "unknown"} />
              <FileInfo
                property="Extension"
                value={file.extension || "unknown"}
              />
              <FileInfo
                property="Created at"
                value={
                  formatRelativeDate(Date.parse(file.createdAt)) || "unknown"
                }
              />
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
