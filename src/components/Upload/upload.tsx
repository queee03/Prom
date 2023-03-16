import { useRef } from 'react';

import axios from 'axios';
import Button from 'components/Button';
import { PM_PREFIX_CLS } from 'configs/constant';

export interface UploadProps {
  action: string;
  multiple?: boolean;
  beforeUpload?: (file: File, files: File[]) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: unknown, file: File) => void;
  onError?: (err: unknown, file: File) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    multiple = false,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target; // files: FileList | null
    if (files) {
      uploadFiles(Array.from(files)); // Array.from 将 FileList 展开为数组
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const uploadFiles = (files: File[]) => {
    files.forEach((file) => {
      if (beforeUpload) {
        // 不需要判断 beforeUpload 是否为 Promise
        Promise.resolve(beforeUpload(file, files)).then((result) => {
          if (result) {
            if (result === true) {
              post(file);
            } else {
              post(result);
            }
          }
        });
      } else {
        post(file);
      }
    });
  };

  const post = async (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    try {
      const res = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'mulitipart/form-data',
        },
        onUploadProgress: (e) => {
          if (onProgress && e.total) {
            const percentage = Math.round((e.loaded * 100) / e.total);
            onProgress(percentage, file);
          }
        },
      });
      if (onSuccess) onSuccess(res.data, file);
      if (onChange) onChange(file);
    } catch (err) {
      if (onError) onError(err, file);
      if (onChange) onChange(file);
    }
  };

  return (
    <div className={`${PM_PREFIX_CLS}-upload`}>
      <Button
        type="primary"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Upload
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Upload;
