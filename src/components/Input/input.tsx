import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import Icon from 'components/Icon';
import { PM_PREFIX_CLS } from 'configs/constant';

type InputSize = 'lg' | 'sm';
type PendType = string | React.ReactElement;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: PendType;
  append?: PendType;
}

export const Input: React.FC<InputProps> = ({
  disabled,
  size,
  icon,
  prepend,
  append,
  ...props
}) => {
  const classes = classnames(`${PM_PREFIX_CLS}-input-wrapper`, {
    [`${PM_PREFIX_CLS}-size-${size}`]: size,
    [`${PM_PREFIX_CLS}-group`]: prepend || append,
    [`${PM_PREFIX_CLS}-group-prepend`]: prepend,
    [`${PM_PREFIX_CLS}-group-append`]: append,
  });

  // const pendComponent = (pend: PendType, pendProps?: React.HTMLAttributes<HTMLElement>) => {
  //   if (typeof pend === 'string') {
  //     return <div {...pendProps}>{pend}</div>;
  //   }
  //   return cloneElement(pend, pendProps);
  // };

  return (
    <div className={classes}>
      {prepend && <div className={`${PM_PREFIX_CLS}-input-group-prepend`}>{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className={`${PM_PREFIX_CLS}-input-inner`} disabled={disabled} {...props} />
      {append && <div className={`${PM_PREFIX_CLS}-input-group-append`}>{append}</div>}
    </div>
  );
};

export default Input;
