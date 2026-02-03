export type FileStats = {
  name: string;
  size: number;
  extension?: string | null;
  mimeType?: string | null;
  isFile: boolean;
  createdAt: string;
};

export type StorageInfo = {
  maxSize: number;
  size: number;
  percentage: number;
};
