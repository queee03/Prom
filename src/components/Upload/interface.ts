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
  className?: string;
  style?: React.CSSProperties;
  action: string;
  name?: string;
  headers?: Record<string, unknown>;
  data?: Record<string, string | Blob>;
  withCredentials?: boolean;
  accept?: string;
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

export interface UploadListProps extends React.HTMLAttributes<HTMLUListElement> {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}
