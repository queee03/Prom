import React from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

interface FormItemProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { className, children, label, ...restProps } = props;
  const rowClasses = classnames(
    `${PM_PREFIX_CLS}-form-item-row`,
    {
      'no-label': !label,
    },
    className,
  );
  return (
    <div className={rowClasses} {...restProps}>
      {label && (
        <div className={`${PM_PREFIX_CLS}-form-item-label`}>
          <label title={label}>{label}</label>
        </div>
      )}
      <div className={`${PM_PREFIX_CLS}-form-item-content`}>{children}</div>
    </div>
  );
};

export default FormItem;
