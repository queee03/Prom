import React from "react";
import classNames from "classnames";

// different?
// type ButtonSize = {
//   Large: "lg",
//   Small: "sm",
// };
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
  const { type, disabled, size, children, href } = props;
  const classes = classNames("pm-button", {
    [`pm-button-${type}`]: type,
    [`pm-button-${size}`]: size,
    disabled: type === ButtonType.Link && disabled,
  });
  if (type === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  type: ButtonType.Default,
};

export default Button;
