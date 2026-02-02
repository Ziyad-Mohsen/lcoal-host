export type FileStats = {
  name: string;
  size: number;
  extension?: string | null;
  isFile: boolean;
  createdAt: Date;
};
