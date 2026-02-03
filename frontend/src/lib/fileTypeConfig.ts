import {
  FileText,
  Image,
  Video,
  Music,
  FileArchive,
  FileCode,
  File,
  FileQuestionMark,
} from "lucide-react";

export type FileTypeConfig = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

export const FILE_TYPE_CONFIG: Record<string, FileTypeConfig> = {
  // Documents
  pdf: { icon: FileText, color: "#ef4444" }, // red-500
  doc: { icon: FileText, color: "#3b82f6" }, // blue-500
  docx: { icon: FileText, color: "#3b82f6" }, // blue-500
  txt: { icon: FileText, color: "#6b7280" }, // gray-500

  // Images
  png: { icon: Image, color: "#22c55e" }, // green-500
  jpg: { icon: Image, color: "#22c55e" }, // green-500
  jpeg: { icon: Image, color: "#22c55e" }, // green-500
  webp: { icon: Image, color: "#22c55e" }, // green-500

  // Video
  mp4: { icon: Video, color: "#a855f7" }, // purple-500
  mov: { icon: Video, color: "#a855f7" }, // purple-500

  // Audio
  mp3: { icon: Music, color: "#eab308" }, // yellow-500
  wav: { icon: Music, color: "#eab308" }, // yellow-500

  // Archives
  zip: { icon: FileArchive, color: "#f97316" }, // orange-500
  rar: { icon: FileArchive, color: "#f97316" }, // orange-500

  // Code
  js: { icon: FileCode, color: "#facc15" }, // yellow-400
  ts: { icon: FileCode, color: "#60a5fa" }, // blue-400
  json: { icon: FileCode, color: "#9ca3af" }, // gray-400

  // Major type
  video: { icon: Video, color: "#a855f7" }, // purple-500
  audio: { icon: Music, color: "#eab308" }, // yellow-500
  image: { icon: Image, color: "#22c55e" }, // green-500
  document: { icon: FileText, color: "#ef4444" }, // red-500
  text: { icon: FileText, color: "#6b7280" }, // gray-500
  file: { icon: File, color: "#6b7280" }, // gray-500
  unknown: { icon: FileQuestionMark, color: "#6b7280" }, // gray-500
};

export function getFileCategory(mimeType?: string | null) {
  if (!mimeType) return "unknown";

  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("text/")) return "text";
  if (mimeType.includes("pdf")) return "document";

  return "file";
}

export function getFileConfig({
  extension,
  mimeType,
}: {
  extension?: string | null;
  mimeType?: string | null;
}) {
  const fileConfig =
    FILE_TYPE_CONFIG[extension as string] ||
    FILE_TYPE_CONFIG[getFileCategory(mimeType)];
  return fileConfig;
}
