import {
  Download,
  EllipsisVertical,
  FolderOpen,
  Info,
  Link,
  Link2,
  Share2,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteFileDialog from "./dialogs/DeleteFileDialog";
import type { FileStats } from "../../../../backend/types";

type Option = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: "default" | "destructive";
  subMenu?: Option[];
  fn?: () => void;
};

export default function FileDropDownMenu({ file }: { file: FileStats }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const options: Option[] = [
    { text: "Open", icon: FolderOpen },
    { text: "Download", icon: Download },
    {
      text: "Share",
      icon: Share2,
      subMenu: [{ text: "Copy link", icon: Link2 }],
    },
    {
      text: "Info",
      icon: Info,
    },
    {
      text: "Delete",
      icon: Trash,
      variant: "destructive",
      fn: () => {
        setDeleteDialogOpen(true);
      },
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-sm" variant="ghost" className="hover:bg-transparent">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          {options.map((option) => {
            const key = option.text;
            return option.subMenu ? (
              <DropdownMenuSub key={key}>
                <DropdownMenuSubTrigger>
                  <Link />
                  {option.text}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {option.subMenu.map((subOption) => (
                      <DropdownMenuItem
                        key={option.text + subOption.text}
                        variant={subOption.variant || "default"}
                        onClick={subOption.fn}
                      >
                        {subOption.icon && <subOption.icon />}
                        {subOption.text}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={key}
                variant={option.variant || "default"}
                onClick={option.fn}
              >
                {option.icon && <option.icon />}
                {option.text}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* Dialogs */}
      <DeleteFileDialog
        open={deleteDialogOpen}
        setIsOpen={(open) => setDeleteDialogOpen(open)}
        file={file}
      />
    </DropdownMenu>
  );
}
