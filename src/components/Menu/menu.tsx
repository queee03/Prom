import React, { cloneElement, FunctionComponentElement, useState } from 'react';

import classnames from 'classnames';

import MenuContext, { MenuContextProps, MenuIndex } from './menuContext';
import { MenuItemProps } from './menuItem';

export interface MenuProps extends MenuContextProps {
  defaultIndex?: MenuIndex;
  className?: string;
  style?: React.CSSProperties;
}

const Menu: React.FC<MenuProps> = ({
  defaultIndex,
  className,
  children,
  mode,
  defaultOpenSubMenus,
  onSelect,
  ...props
}) => {
  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classnames(
    'pm-menu',
    className,
    mode === 'vertical' ? 'pm-menu-vertical' : 'pm-menu-horizontal',
  );

  const handleClick = (index: MenuIndex) => {
    setCurrentActive(index);
    onSelect?.(index);
  };

  const passedContext: MenuContextProps = {
    currentIndex: currentActive || 0,
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
        return cloneElement(childElement, { index: i });
      }
      console.error('Warning: Menu has a child which is not a MenuItem component');
    });
  };

  return (
    <ul data-testid="pm-menu" className={classes} {...props}>
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
