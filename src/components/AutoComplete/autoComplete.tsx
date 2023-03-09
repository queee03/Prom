import { useState } from 'react';

import classnames from 'classnames';
import Input from 'components/Input';
import { InputProps } from 'components/Input/input';
import { PM_PREFIX_CLS } from 'configs/constant';

export interface OptionType {
  label?: string | JSX.Element;
  value: string;
}
export type FilterOptionFunctionType = (value: string, option: OptionType) => boolean;
export interface AutoComplateProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  options: OptionType[];
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: OptionType) => void;
  onChange?: (value: string) => void;
  value?: string;
  filterOption?: boolean | FilterOptionFunctionType;
}

export const AutoComplate: React.FC<AutoComplateProps> = (props) => {
  const {
    options,
    onSearch,
    onSelect,
    onChange,
    onFocus,
    onBlur,
    filterOption = true,
    ...restProps
  } = props;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const classess = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});

  if (!('value' in props)) {
    restProps.value = inputValue;
  }

  const handleChange: InputProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onSearch?.(e.target.value);
    onChange?.(e.target.value);
    // setIsOpened(true);
  };

  const handleSelect: AutoComplateProps['onSelect'] = (value, option) => {
    setInputValue(value);
    // onChange 在 onSelect 之前，后者修改 value 的优先级更高
    onChange?.(value);
    onSelect?.(value, option);
    setIsOpened(false);
  };

  const generateDropdown = () => {
    let filter: FilterOptionFunctionType;
    if (filterOption) {
      if (typeof filterOption === 'boolean') {
        filter = (_, option) => option.value.indexOf(restProps.value || '') !== -1;
      } else {
        filter = filterOption;
      }
    } else {
      filter = () => true;
    }

    const currentOptions = options.filter((option) => filter(restProps.value || '', option));

    return (
      <ul>
        {currentOptions.map((option) => {
          const label = option.label || option.value;
          return (
            <li key={option.value} onClick={() => handleSelect(option.value, option)}>
              {label}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={classess}>
      <Input
        onChange={handleChange}
        onFocus={(e) => {
          setIsOpened(true);
          onFocus?.(e);
        }}
        {...restProps}
      />
      {isOpened && generateDropdown()}
    </div>
  );
};

export default AutoComplate;
