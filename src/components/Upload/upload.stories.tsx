// import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta } from '@storybook/react';

import Button from '@/components/Button';

import Upload from './index';

// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big');
//     return false;
//   }
//   return true;
// };

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
      name="object"
      accept=".jpg"
      multiple={true}
      // beforeUpload={checkFileSize}
      beforeUpload={renameFile}
      // onChange={(file) => {
      //   console.log('file', file);
      // }}
      onProgress={action('onProgress')}
      onSuccess={(...props) => {
        console.log('success', props);
      }}
      onRemove={(file) => true}
      onError={action('onError')}
    >
      Upload
      <Button>Upload</Button>
      <Upload.Dragger>here</Upload.Dragger>
    </Upload>
  );
};
Default.storyName = '基本使用';
