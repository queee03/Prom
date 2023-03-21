export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  respense?: unknown;
  error?: unknown;
}

export interface UploadProps {
  action: string;
  multiple?: boolean;
  maxCount?: number;
  defaultFileList?: UploadFile[];
  beforeUpload?: (
    file: File,
    files: Array<File | UploadFile>,
  ) => boolean | File | Promise<boolean | File>;
  onChange?: (file: UploadFile) => void;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: unknown, file: UploadFile) => void;
  onError?: (err: unknown, file: UploadFile) => void;
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
}

export interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}
