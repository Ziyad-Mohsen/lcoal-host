import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-3 border-b shadow-md">
      <Logo />
      <div className="flex items-center gap-2">
        <Button className="">
          Upload <Upload />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
}
