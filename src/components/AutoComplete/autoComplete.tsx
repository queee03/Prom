import { useState } from '@storybook/addons';
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
export interface AutoComplateProps extends Omit<InputProps, 'onSelect'> {
  options: OptionType[];
  onSearch: (value: string) => void;
  onSelect?: (value: string) => void;
}

export const AutoComplate: React.FC<AutoComplateProps> = (props) => {
  const { options, onSearch, onSelect, onChange, value, ...restProps } = props;
  // const [inputValue, setInputValue] = useState(value);
  const classess = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});

  const handleChange: InputProps['onChange'] = (e) => {
    // setInputValue(e.target.value);
    onSearch(e.target.value);
    onChange?.(e);
  };

  const handleSelect = (item: { value: string }) => {
    // setInputValue(item.value);
    onSelect?.(item.value);
  };

  const generateDropdown = () => {
    return (
      <ul>
        {options.map((item) => {
          const label = typeof item === 'string' ? item : item.label || item.value;
          const itemValue = typeof item === 'string' ? item : item.value;
          return (
            <li key={itemValue} onClick={() => handleSelect({ value: itemValue })}>
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
