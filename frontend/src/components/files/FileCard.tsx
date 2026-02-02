import { Card } from "@/components/ui/card";
import type { FileStats } from "../../../../backend/types";

interface FileCardProps {
  file: FileStats;
}

export default function FileCard({ file }: FileCardProps) {
  return <Card>{file.name}</Card>;
}
