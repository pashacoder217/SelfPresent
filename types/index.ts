import { type ClientUploadedFileData } from "uploadthing/types"

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
export type EndPoint = "docUploader" | "evidenceUploader"