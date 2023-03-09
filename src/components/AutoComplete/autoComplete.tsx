import { useState } from 'react';

import classnames from 'classnames';
import Input from 'components/Input';
import { InputProps } from 'components/Input/input';
import { PM_PREFIX_CLS } from 'configs/constant';

export type OptionType =
  | string
  | {
      label?: string | JSX.Element;
      value: string;
    };
export interface AutoComplateProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  options: OptionType[];
  onSearch?: (value: string) => void;
  onSelect?: (value: string, item: OptionType) => void;
  onChange?: (value: string) => void;
}

export const AutoComplate: React.FC<AutoComplateProps> = (props) => {
  const { options, onSearch, onSelect, onChange, ...restProps } = props;
  const [inputValue, setInputValue] = useState<string>();
  const classess = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});

  if (!('value' in props)) {
    restProps.value = inputValue;
  }

  const handleChange: InputProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onSearch?.(e.target.value);
    onChange?.(e.target.value);
  };

  const handleSelect: AutoComplateProps['onSelect'] = (value, item) => {
    setInputValue(value);
    // onChange 在 onSelect 之前，后者修改 value 的优先级更高
    onChange?.(value);
    onSelect?.(value, item);
  };

  const generateDropdown = () => {
    return (
      <ul>
        {options.map((item) => {
          const label = typeof item === 'string' ? item : item.label || item.value;
          const value = typeof item === 'string' ? item : item.value;
          return (
            <li key={value} onClick={() => handleSelect(value, item)}>
              {label}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={classess}>
      <Input onChange={handleChange} {...restProps} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplate;
