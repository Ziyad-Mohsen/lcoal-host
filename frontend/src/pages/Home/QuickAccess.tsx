import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STORAGE_ROOT } from "@/constants";
import {
  useQuickAccess,
  type QuickAccessFolder,
} from "@/contexts/QuickAccessContext";
import { Folder, FolderOpen, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickAccess() {
  const { quickAccessFolders } = useQuickAccess();

  const hasQuickAccess = quickAccessFolders.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Quick access</h4>
          <p className="text-xs text-muted-foreground">
            Jump into folders you open frequently.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to={STORAGE_ROOT}>
            <FolderOpen className="h-3.5 w-3.5 mr-1" />
            Browse storage
          </Link>
        </Button>
      </div>
      <div className="scrollable-content-x no-scrollbar flex gap-3">
        {hasQuickAccess ? (
          quickAccessFolders.map((folder) => (
            <QuickAccessFolderCard key={folder.path} folder={folder} />
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 px-4 py-6 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Folder className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">No quick access folders yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pin folders from storage to see them here.
            </p>
            <Button asChild size="sm" className="mt-3">
              <Link to={STORAGE_ROOT}>
                <FolderOpen className="h-3.5 w-3.5 mr-1" />
                Open storage
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAccessFolderCard({ folder }: { folder: QuickAccessFolder }) {
  const { setQuickAccessFolders } = useQuickAccess();

  return (
    <Link to={folder.path}>
      <Card className="relative flex-row items-center min-w-70 p-5 gap-4 hover:bg-accent/60 transition-colors">
        <div>
          <Folder className="text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground truncate max-w-full">
            {folder.path}
          </span>
          <p className="font-medium">{folder.name}</p>
        </div>
        <Button
          className="absolute top-2 right-2 rounded-full w-6 h-6 hover:bg-destructive dark:hover:bg-destructive hover:text-destructive-foreground dark:hover:text-destructive-foreground"
          size="icon-sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setQuickAccessFolders((prevFolders) =>
              prevFolders.filter(
                (prevFolder) =>
                  prevFolder.path + prevFolder.name !==
                  folder.path + folder.name,
              ),
            );
          }}
        >
          <X size={8} />
        </Button>
      </Card>
    </Link>
  );
}
