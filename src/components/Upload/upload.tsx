import { useRef, useState } from 'react';

import axios from 'axios';
import Button from 'components/Button';
import { PM_PREFIX_CLS } from 'configs/constant';
import { generateId } from 'utils';

import { UploadFile, UploadListProps, UploadProps } from './interface';
import UploadList from './uploadList';

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    multiple = false,
    // maxCount,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
  } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target; // files: FileList | null
    if (files) {
      uploadFiles(Array.from(files)); // Array.from 将 FileList 展开为数组
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove: UploadListProps['onRemove'] = (file) => {
    const remove = () => {
      setFileList((current) => current.filter((item) => item.uid !== file.uid));
    };
    if (onRemove) {
      Promise.resolve(onRemove(file)).then((result) => {
        if (result) remove();
      });
    } else {
      remove();
    }
  };

  const uploadFiles = (files: File[]) => {
    files.forEach((file) => {
      if (beforeUpload) {
        // 不需要判断 beforeUpload 是否为 Promise
        Promise.resolve(beforeUpload(file, [...fileList, ...files])).then((result) => {
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

    const uploadFile: UploadFile = {
      uid: generateId(),
      name: file.name,
      size: file.size,
      status: 'ready',
      percent: 0,
      raw: file,
    };
    setFileList((current) => current.concat(uploadFile));

    try {
      const res = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'mulitipart/form-data',
        },
        onUploadProgress: (e) => {
          if (e.total) {
            const percentage = Math.round((e.loaded * 100) / e.total);
            updateFileList(uploadFile, { percent: percentage });
            if (onProgress) onProgress(percentage, uploadFile);
          }
        },
      });
      updateFileList(uploadFile, { status: 'success', respense: res.data });
      if (onSuccess) onSuccess(res.data, uploadFile);
      if (onChange) onChange(uploadFile);
    } catch (err) {
      updateFileList(uploadFile, { status: 'error', error: err });
      if (onError) onError(err, uploadFile);
      if (onChange) onChange(uploadFile);
    }
  };

  const updateFileList = (target: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((current) => {
      return current.map((item) => {
        if (item.uid === target.uid) {
          return {
            ...item,
            ...updateObj,
          };
        }
        return item;
      });
    });
  };

  console.log(fileList);

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
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
