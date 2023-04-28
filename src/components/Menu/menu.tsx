import React, { cloneElement, FunctionComponentElement, useState } from 'react';

import classnames from 'classnames';

import { PM_PREFIX_CLS } from '@/configs/constant';

import MenuContext, { MenuContextProps, MenuIndex } from './menuContext';
import { MenuItemProps } from './menuItem';

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>,
    MenuContextProps {
  defaultIndex?: MenuIndex;
}

export const Menu: React.FC<MenuProps> = ({
  className,
  defaultIndex,
  children,
  mode,
  defaultOpenSubMenus,
  onSelect,
  ...restProps
}) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classnames(
    `${PM_PREFIX_CLS}-menu`,
    mode === 'vertical' ? `${PM_PREFIX_CLS}-menu-vertical` : `${PM_PREFIX_CLS}-menu-horizontal`,
    className,
  );

  const handleClick = (index: MenuIndex) => {
    setCurrentActive(index);
    onSelect?.(index);
  };

  const passedContext: MenuContextProps = {
    currentIndex: currentActive || '0',
    mode,
    defaultOpenSubMenus,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    // React.Children 提供了用于处理 props.children 不透明数据结构的实用方法
    // https://zh-hans.reactjs.org/docs/react-api.html#reactchildren
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return cloneElement(childElement, { index: i.toString() });
      }
      console.error('Warning: Menu has a child which is not a MenuItem component');
    });
  };

  return (
    <ul className={classes} {...restProps} data-testid="pm-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};
Menu.displayName = 'Menu';
export default Menu;
