import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';

import Icon from '@/components/Icon';
import { PM_PREFIX_CLS } from '@/configs/constant';
import { isNil } from '@/utils/utils';

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
  const { className, disabled, size, icon, prepend, append, ...restProps } = props;
  const classes = classnames(
    `${PM_PREFIX_CLS}-input-wrapper`,
    {
      [`${PM_PREFIX_CLS}-size-${size}`]: size,
      [`${PM_PREFIX_CLS}-input-group`]: prepend || append,
      [`${PM_PREFIX_CLS}-input-group-prepend`]: prepend,
      [`${PM_PREFIX_CLS}-input-group-append`]: append,
      'no-border': props.type && ['hidden', 'checkbox', 'radio', 'range'].includes(props.type),
    },
    className,
  );

  if ('value' in props) {
    // 不可同时存在 value 和 defaultValue, 前者意味着组件受控, 此时 defaultValue 不应该生效
    delete restProps.defaultValue;
    restProps.value = isNil(props.value) ? '' : props.value;
  }

  if ('checked' in props) {
    restProps.checked = isNil(props.checked) ? false : props.checked;
  }

  return (
    <div className={classes} data-testid={`${PM_PREFIX_CLS}-input`}>
      {prepend && <div className={`${PM_PREFIX_CLS}-input-prepend`}>{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} />
        </div>
      )}
      <input className={`${PM_PREFIX_CLS}-input-inner`} disabled={disabled} {...restProps} />
      {append && <div className={`${PM_PREFIX_CLS}-input-append`}>{append}</div>}
    </div>
  );
};

Input.displayName = 'Input';
export default Input;
