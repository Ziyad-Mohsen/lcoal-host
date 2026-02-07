import * as z from "zod";

export const CreateFolderRequestBody = z.object({
  folderName: z.string().min(1, "Folder name is required").nonoptional(),
  path: z.string().min(1, "Path is required").nonoptional(),
});

export type CreateFolderRequestBody = z.infer<typeof CreateFolderRequestBody>;
