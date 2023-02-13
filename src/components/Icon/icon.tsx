import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
// fas = 所有图标
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

export type ThemeType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeType;
}

library.add(fas);

const Icon: React.FC<IconProps> = ({ className, theme, ...props }) => {
  const classes = classnames('pm-icon', className, {
    [`pm-icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...props} />;
};

export default Icon;
