import { getAllFiles } from "@/api/files.api";
import { useEffect, useState, type ReactNode } from "react";
import type { FileStats } from "@/../../backend/types/index.ts";
import Header from "@/layouts/Header";
import FilesTableView from "@/components/files/views/FilesTableView";
import FilesCardsView from "@/components/files/views/FilesCardsView";
import { FolderX, LayoutGrid, TableProperties } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

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

  const { pathname } = useLocation();
  const pathArr = pathname.split("/").filter(Boolean);

  const {
    data: files,
    isError,
    error,
    isPending,
    isFetching,
    failureCount,
  } = useQuery({
    queryKey: ["files", pathname],
    queryFn: () => getAllFiles(pathname),
    retry: 3,
    refetchOnWindowFocus: (query) => query.state.data !== undefined,
  });

  useEffect(() => {
    sessionStorage.setItem("filesView", view);
  }, [view]);

  return (
    <main className="w-full">
      <Header />

      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              {pathname === "/" ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>./</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">./</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}

              {pathArr.map((route, i) => {
                const href = "/" + pathArr.slice(0, i + 1).join("/");
                return i !== pathArr.length - 1 ? (
                  <span key={href} className="flex items-center">
                    <BreadcrumbItem>
                      <BreadcrumbLink href={href}>{route}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </span>
                ) : (
                  <BreadcrumbItem key={href}>
                    <BreadcrumbPage>{route}</BreadcrumbPage>
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>

          <button
            className="flex items-center bg-secondary p-1 rounded-lg cursor-pointer"
            onClick={() => setView(view === "tables" ? "cards" : "tables")}
          >
            <div
              className={twMerge(
                "rounded-md p-2",
                view === "cards" && "bg-accent",
              )}
            >
              <LayoutGrid strokeWidth={1} />
            </div>
            <div
              className={twMerge(
                "rounded-md p-2",
                view === "tables" && "bg-accent",
              )}
            >
              <TableProperties strokeWidth={1} />
            </div>
          </button>
        </div>

        {(isPending || isFetching) && (
          <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Spinner />
            <span>
              Loading files
              {failureCount > 0 && ` (retrying ${failureCount}/3)`}
            </span>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2 text-red-500">
            <FolderX className="h-8 w-8" />
            <span>Failed to load files</span>
            <span className="text-xs opacity-70">
              {error instanceof Error ? error.message : "Unknown error"}
            </span>
          </div>
        )}

        {files && !isError && getView(view, files)}
      </div>
    </main>
  );
}
