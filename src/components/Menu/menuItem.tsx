import React, { useContext } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import MenuContext, { MenuIndex } from './menuContext';

export interface MenuItemProps {
  index?: MenuIndex;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = ({ className, index, disabled, children, ...props }) => {
  const context = useContext(MenuContext);

  const classes = classnames(`${PM_PREFIX_CLS}-menu-item`, className, {
    'is-disabled': disabled,
    'is-active': context.currentIndex === index,
  });

  const handleClick = () => {
    if (disabled) return;
    if (context.onSelect && index) {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} {...props} onClick={handleClick}>
      {children}
    </li>
  );
};

// React 内置的静态属性
MenuItem.displayName = 'MenuItem';
export default MenuItem;
