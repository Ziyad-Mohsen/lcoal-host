import { getAllFiles } from "@/api/files.api";
import { useEffect, useState, type ReactNode } from "react";
import type { FileStats } from "@/../../backend/types/index.ts";
import Header from "@/layouts/Header";
import FilesTableView from "@/components/files/views/FilesTableView";
import FilesCardsView from "@/components/files/views/FilesCardsView";
import { LayoutGrid, TableProperties } from "lucide-react";
import { twMerge } from "tailwind-merge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

type View = "tables" | "cards";

const getView = (view: View, files: FileStats[]): ReactNode => {
  const viewOptions: Record<View, ReactNode> = {
    tables: <FilesTableView files={files} />,
    cards: <FilesCardsView files={files} />,
  };
  return viewOptions[view];
};

export default function Home() {
  const [view, setView] = useState<View>(
    (sessionStorage.getItem("filesView") as View) || "tables",
  );
  const [files, setFiles] = useState<FileStats[]>([]);
  const path = useLocation().pathname;
  const pathArr = path.split("/").filter((segment) => segment.length > 0);

  useEffect(() => {
    sessionStorage.setItem("filesView", view);
  }, [view]);

  useEffect(() => {
    (async () => {
      const data = await getAllFiles(path);
      setFiles(data);
    })();
  }, [path]);

  return (
    <main className="w-full">
      <Header />
      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {path === "/" ? (
                  <BreadcrumbPage>./</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href="/">./</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
              {pathArr.map((route, i) => {
                const href = "/" + pathArr.slice(0, i + 1).join("/");
                return i !== pathArr.length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={href}>{route}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{route}</BreadcrumbPage>
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <button
            className="flex items-center bg-muted p-1 rounded-lg cursor-pointer"
            onClick={() => setView(view == "tables" ? "cards" : "tables")}
          >
            <div
              className={twMerge(
                "rounded-md p-2",
                view == "cards" && "bg-accent",
              )}
            >
              <LayoutGrid strokeWidth={1} />
            </div>
            <div
              className={twMerge(
                "rounded-md p-2",
                view == "tables" && "bg-accent",
              )}
            >
              <TableProperties strokeWidth={1} />
            </div>
          </button>
        </div>
        {getView(view, files)}
      </div>
    </main>
  );
}
