import React, { cloneElement, FunctionComponentElement, useContext } from 'react';

import classnames from 'classnames';

import MenuContext from './menuContext';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  const classes = classnames('pm-menu-item pm-menu-submenu-item', className, {
    'is-active': context.index === index,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return cloneElement(childElement, { index: i });
      }
      console.error('Warning: Menu has a child which is not a MenuItem component');
    });
    return <ul className="pm-submenu">{childrenComponent}</ul>;
  };

  return (
    <li className={classes} key={index}>
      <div className="title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
