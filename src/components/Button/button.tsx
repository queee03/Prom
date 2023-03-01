import React from 'react';

import classNames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

export type ButtonSize = 'large' | 'small';
enum ButtonSizeMap {
  large = 'lg',
  small = 'sm',
}

export type ButtonType = 'default' | 'primary' | 'danger' | 'link';
enum ButtonTypeMap {
  default = 'default',
  primary = 'primary',
  danger = 'danger',
  link = 'link',
}

// 定义参数属性
type OriginButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type OriginAnchorProps = React.AnchorHTMLAttributes<HTMLElement>;
interface BaseButtonProps {
  className?: string;
  /** disabled 注释测试 */
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  htmlType?: OriginButtonProps['type'];
  children: React.ReactNode;
  href?: string;
}
// 与原生属性交叉
type NativeButtonProps = Omit<OriginButtonProps, 'type' | 'disabled'> & BaseButtonProps; // Omit排除接口中指定的属性
type AnchorButtonProps = OriginAnchorProps & BaseButtonProps;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // Partial 将类型定义的所有属性都修改为可选。

/**
 * [JSDoc 注释示例] 这是按钮组件
 * ### 引用方法
 * ```js
 * import { Button } from 'prom';
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  className,
  type,
  disabled,
  size,
  children,
  href,
  ...props
}) => {
  const classes = classNames(`${PM_PREFIX_CLS}-button`, className, {
    [`${PM_PREFIX_CLS}-button-${ButtonTypeMap[type!]}`]: type,
    [`${PM_PREFIX_CLS}-button-${ButtonSizeMap[size!]}`]: size,
    disabled: type === 'link' && disabled,
  });
  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
};
Button.displayName = 'Button';
export default Button;
