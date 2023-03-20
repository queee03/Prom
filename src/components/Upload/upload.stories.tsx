import { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';

import Upload from './index';
import { UploadProps } from './upload';

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big');
    return false;
  }
  return true;
};

const renameFile = (file: File) => {
  return new File([file], `new name ${file.name}`, { type: file.type });
};

const Com: ComponentMeta<typeof Upload> = {
  title: 'Upload',
  component: Upload,
};
export default Com;

export const Default = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      multiple={true}
      // beforeUpload={checkFileSize}
      beforeUpload={renameFile}
      onProgress={action('onProgress')}
      onSuccess={action('onSuccess')}
      onError={action('onError')}
    />
  );
};
Default.storyName = '基本使用';
