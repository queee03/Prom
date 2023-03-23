/* eslint-disable require-atomic-updates */
import { useRef, useState } from 'react';

import axios from 'axios';
import classnames from 'classnames';
import Button from 'components/Button';
import { PM_PREFIX_CLS } from 'configs/constant';
import { generateId } from 'utils';

import { UploadFile, UploadListProps, UploadProps } from './interface';
import UploadList from './uploadList';

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    className,
    children,
    action,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    // maxCount,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
    ...restProps
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
    const uploadFile: UploadFile = {
      uid: generateId(),
      name: file.name,
      size: file.size,
      status: 'ready',
      percent: 0,
      raw: file,
    };
    setFileList((current) => current.concat(uploadFile));
    if (onChange) onChange(uploadFile);

    const formData = new FormData();
    formData.append(name || 'file', file);

    if (data) {
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
    }

    try {
      const res = await axios.post(action, formData, {
        headers: {
          'Content-Type': 'mulitipart/form-data',
          ...headers,
        },
        withCredentials,
        onUploadProgress: (e) => {
          if (e.total) {
            const percentage = Math.round((e.loaded * 100) / e.total);
            uploadFile.status = 'uploading';
            uploadFile.percent = percentage;
            updateFileList(uploadFile);
            if (onProgress) onProgress(percentage, uploadFile);
            if (onChange) onChange(uploadFile);
          }
        },
      });

      uploadFile.status = 'success';
      uploadFile.respense = res.data;
      updateFileList(uploadFile);
      if (onSuccess) onSuccess(res.data, uploadFile);
      if (onChange) onChange(uploadFile);
    } catch (err) {
      uploadFile.status = 'error';
      uploadFile.error = err;
      updateFileList(uploadFile);
      if (onError) onError(err, uploadFile);
      if (onChange) onChange(uploadFile);
    }
  };

  const updateFileList = (target: UploadFile) => {
    setFileList((current) => {
      return current.map((item) => {
        if (item.uid === target.uid) return target;
        return item;
      });
    });
  };

  return (
    <div className={classnames(`${PM_PREFIX_CLS}-upload`, className)}>
      <span
        className={`${PM_PREFIX_CLS}-upload-input`}
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        {children}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          {...restProps}
          style={{ display: 'none' }}
        />
      </span>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file',
  multiple: false,
};
export default Upload;
