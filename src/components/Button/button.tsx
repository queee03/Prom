import React from 'react';

import classNames from 'classnames';

export type ButtonSize = 'large' | 'small';
enum ButtonSizeMap {
  large = 'lg',
  small = 'sm',
}

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
enum ButtonTypeMap {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link',
}

// 定义参数属性
type OriginButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type OriginAnchorProps = React.AnchorHTMLAttributes<HTMLElement>;
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: OriginButtonProps['type'];
  children: React.ReactNode;
  href?: string;
}
// 与原生属性交叉
type NativeButtonProps = Omit<OriginButtonProps, 'type'> & BaseButtonProps; // Omit排除接口中指定的属性
type AnchorButtonProps = OriginAnchorProps & BaseButtonProps;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // Partial 将类型定义的所有属性都修改为可选。

const Button: React.FC<ButtonProps> = (props) => {
  const { className, type, disabled, size, children, href, ...restProps } = props;
  const classes = classNames('pm-button', className, {
    [`pm-button-${ButtonTypeMap[type!]}`]: type,
    [`pm-button-${ButtonSizeMap[size!]}`]: size,
    disabled: type === 'link' && disabled,
  });
  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
};

export default Button;
