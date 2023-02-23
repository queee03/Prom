import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
}

export const Input: React.FC<InputProps> = () => {
  return <>1</>;
};

export default Input;
