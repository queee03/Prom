import { useState } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import { DraggerProps } from './interface';

export const Dragger: React.FC<DraggerProps> = (props) => {
  const { className, children, onFileDrop, ...restProps } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classnames(
    `${PM_PREFIX_CLS}-upload-dragger`,
    {
      'is-dragover': dragOver,
    },
    className,
  );

  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFileDrop?.(Array.from(e.dataTransfer.files));
  };

  return (
    <div
      className={classes}
      {...restProps}
      /* onDragOver 在元素正在拖动到放置目标时触发 */
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

Dragger.displayName = 'Dragger';
export default Dragger;
