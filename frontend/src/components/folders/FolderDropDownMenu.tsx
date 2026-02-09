import {
  EllipsisVertical,
  FolderOpen,
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
import { useNavigate } from "react-router-dom";
import type { FileStats } from "../../../../backend/types";
import DeleteFolderDialog from "./dialogs/DeleteFolderDialog";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

type Option = {
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: "default" | "destructive";
  subMenu?: Option[];
  fn?: () => void;
};

export default function FolderDropDownMenu({ folder }: { folder: FileStats }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const copyLink = async () => {
    try {
      await copyToClipboard(window.location.href + "/" + folder.name);
      toast("Link copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy link");
    }
  };

  const options: Option[] = [
    {
      text: "Open",
      icon: FolderOpen,
      fn: () => {
        navigate(folder.name);
      },
    },
    {
      text: "Share",
      icon: Share2,
      subMenu: [{ text: "Copy link", icon: Link2, fn: copyLink }],
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
      <DeleteFolderDialog
        open={deleteDialogOpen}
        setIsOpen={(open) => setDeleteDialogOpen(open)}
        folder={folder}
      />
    </DropdownMenu>
  );
}
