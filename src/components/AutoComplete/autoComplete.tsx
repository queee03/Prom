import { useEffect, useState } from 'react';

import classnames from 'classnames';
import Icon from 'components/Icon';
import Input from 'components/Input';
import { InputProps } from 'components/Input/input';
import { PM_PREFIX_CLS } from 'configs/constant';
import { useDebounce } from 'hooks';

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
  loading?: boolean;
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
    loading,
    ...restProps
  } = props;
  const classess = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();

  if (!('value' in props)) {
    restProps.value = inputValue;
  }
  const debounceValue = useDebounce(restProps.value || '');

  const handleChange: InputProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
    // onSearch?.(e.target.value);
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
        {loading && <Icon icon="spinner" spin />}
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

  useEffect(() => {
    onSearch?.(debounceValue);
  }, [debounceValue]);

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
