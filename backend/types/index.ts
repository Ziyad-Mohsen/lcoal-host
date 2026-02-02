export type FileStats = {
  name: string;
  size: number;
  extension?: string | null;
  isFile: boolean;
  createdAt: Date;
};

export type StorageInfo = {
  maxSize: number;
  size: number;
  percentage: number;
};
