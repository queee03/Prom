import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import Icon from 'components/Icon';
import { PM_PREFIX_CLS } from 'configs/constant';
import { isNil } from 'utils';

type InputSize = 'lg' | 'sm';
type PendType = string | React.ReactElement;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: PendType;
  append?: PendType;
}

export const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, ...restProps } = props;
  const classes = classnames(
    `${PM_PREFIX_CLS}-input-wrapper`,
    {
      [`${PM_PREFIX_CLS}-size-${size}`]: size,
      [`${PM_PREFIX_CLS}-input-group`]: prepend || append,
    },
    className,
  );

  const fixControlledValue = (value?: string | number | readonly string[]) => {
    if (isNil(value)) return '';
    return value;
  };

  if ('value' in props) {
    // 不可同时存在 value 和 defaultValue, 前者意味着组件受控, 此时 defaultValue 不应该生效
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} data-testid={`${PM_PREFIX_CLS}-input`}>
      {prepend && <div className={`${PM_PREFIX_CLS}-input-group-prepend`}>{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className={`${PM_PREFIX_CLS}-input-inner`} disabled={disabled} {...restProps} />
      {append && <div className={`${PM_PREFIX_CLS}-input-group-append`}>{append}</div>}
    </div>
  );
};

Input.displayName = 'Input';
export default Input;
