import type { FileStats } from "@/../../backend/types/index";

export interface FileDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  file: FileStats;
}
