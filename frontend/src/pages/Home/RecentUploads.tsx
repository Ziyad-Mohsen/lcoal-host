import UploadFileCard from "@/components/files/dialogs/UploadFileCard";
import { useUploadedFiles } from "@/contexts/UploadedFilesContext";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants";

export default function RecentUploads() {
  const { uploadedFiles, abortFileUpload } = useUploadedFiles();

  const hasUploads = uploadedFiles.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Recent uploads</h4>
          <p className="text-xs text-muted-foreground">
            Keep track of what you&apos;ve recently added.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to={`${ROUTES.STORAGE}?upload=1`}>
            <UploadCloud className="h-3.5 w-3.5 mr-1" />
            Upload files
          </Link>
        </Button>
      </div>

      {!hasUploads && (
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 px-4 py-6 text-center max-w-full">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium">No recent uploads yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Start by uploading files from your device.
          </p>
          <Button asChild size="sm" className="mt-3">
            <Link to={`${ROUTES.STORAGE}?upload=1`}>
              <UploadCloud className="h-3.5 w-3.5 mr-1" />
              Upload files
            </Link>
          </Button>
        </div>
      )}

      {hasUploads && (
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <UploadFileCard
              key={file.id}
              uploadedFile={file}
              onRemove={() => abortFileUpload(file.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
