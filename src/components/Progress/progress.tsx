import { ThemeType } from '../Icon/icon';

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  theme?: ThemeType;
}

export const Progress: React.FC<ProgressProps> = () => {
  return <div></div>;
};

export default Progress;
