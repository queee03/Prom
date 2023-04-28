import { ThemeType } from '../Icon/icon';
import classnames from 'classnames';

import { PM_PREFIX_CLS } from '@/configs/constant';

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  theme?: ThemeType;
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const { className, percent, strokeHeight, showText, theme, ...restProps } = props;
  return (
    <div className={classnames(`${PM_PREFIX_CLS}-progress-bar`, className)} {...restProps}>
      <div
        className={`${PM_PREFIX_CLS}-progress-bar-outer`}
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={classnames(`${PM_PREFIX_CLS}-progress-bar-inner`, `color-${theme}`)}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{percent}%</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};
export default Progress;
