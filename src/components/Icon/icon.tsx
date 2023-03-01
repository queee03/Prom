import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
// fas = 所有图标
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

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
  const classes = classnames(`${PM_PREFIX_CLS}-icon`, className, {
    [`${PM_PREFIX_CLS}-icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon data-testid={`${PM_PREFIX_CLS}-icon`} className={classes} {...props} />;
};

export default Icon;
