import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
}

export const Input: React.FC<InputProps> = ({ disabled }) => {
  const classes = classnames();
  return <input disabled={disabled} />;
};

export default Input;
