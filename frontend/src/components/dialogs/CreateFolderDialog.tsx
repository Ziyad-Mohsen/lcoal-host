import { Folder, FolderPlus, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocation } from "react-router-dom";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Field, FieldError } from "@/components/ui/field";
import { createFolder } from "@/api/folders.api";
import { useQueryClient } from "@tanstack/react-query";

export function CreateFolderDialog() {
  const pathname = useLocation().pathname;
  const formRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!folderName) {
      setError("Must provide folder name");
      return;
    }

    setIsLoading(true);
    const data = await createFolder({ path: pathname, folderName });
    setIsLoading(false);

    if (!data?.success) {
      setError(data?.message);
    } else {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      setError(null);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setFolderName("");
        setOpen(open);
        setError(null);
        setIsLoading(false);
      }}
    >
      <div>
        <DialogTrigger asChild>
          <Button variant="outline">
            Create Folder <FolderPlus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>
              New folder will be created in:{" "}
              <span className="py-1 px-2 bg-secondary rounded-lg">
                {pathname}
                {folderName && `/${folderName}`}
              </span>
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} onSubmit={handleFormSubmit}>
            <Field>
              <InputGroup>
                <InputGroupAddon>
                  <Folder />
                </InputGroupAddon>
                <InputGroupInput
                  value={folderName}
                  placeholder="Folder Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFolderName(e.target.value)
                  }
                />
                <InputGroupAddon align="inline-end">
                  {folderName && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        setFolderName("");
                      }}
                    />
                  )}
                </InputGroupAddon>
              </InputGroup>
              {error && (
                <FieldError className="flex items-center gap-1">
                  <Info size={18} />
                  {error}
                </FieldError>
              )}
            </Field>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              type="submit"
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
