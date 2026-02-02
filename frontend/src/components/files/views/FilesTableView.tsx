import { Link, useLocation } from "react-router-dom";
import type { FileStats } from "../../../../../backend/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function FilesTableView({ files }: { files: FileStats[] }) {
  const path = useLocation().pathname;
  return (
    <Table className="rounded-lg overflow-hidden">
      <TableCaption>Files</TableCaption>
      <TableHeader className="bg-primary">
        <TableRow>
          <TableHead className="flex-1">Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Created_at</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {path != "/" && (
          <TableRow>
            <TableCell colSpan={3}>
              <Link to="..">../</Link>
            </TableCell>
          </TableRow>
        )}
        {files && files.length ? (
          files.map((file, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {file.isFile ? (
                  file.name
                ) : (
                  <Link to={file.name}>{file.name}</Link>
                )}
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.createdAt.toString()}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>no files</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
