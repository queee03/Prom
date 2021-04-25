import React from "react";
import classNames from "classnames";

export type ButtonSize = "large" | "small";
enum ButtonSizeMap {
  large = "lg",
  small = "sm",
}

export type ButtonType = "primary" | "default" | "danger" | "link";
export enum ButtonTypeMap {
  primary = "primary",
  default = "default",
  danger = "danger",
  link = "link",
}

// 定义参数属性
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  styleType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// 与原生属性交叉
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // Partial 将类型定义的所有属性都修改为可选。

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    styleType,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames("pm-button", className, {
    [`pm-button-${ButtonTypeMap[styleType!]}`]: styleType,
    [`pm-button-${ButtonSizeMap[size!]}`]: size,
    disabled: styleType === ButtonTypeMap.link && disabled,
  });
  if (styleType === ButtonTypeMap.link && href) {
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
  styleType: ButtonTypeMap.default,
};

export default Button;
