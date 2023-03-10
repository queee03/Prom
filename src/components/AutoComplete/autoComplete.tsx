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
    onKeyDown,
    filterOption = true,
    loading,
    ...restProps
  } = props;
  const classess = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});
  const [inputValue, setInputValue] = useState<string>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [hightlightIndex, setHightlightIndex] = useState(-1);

  if (!('value' in props)) {
    restProps.value = inputValue;
  }
  const debounceValue = useDebounce(restProps.value || '');

  const handleChange: InputProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
    // onSearch?.(e.target.value);
    setIsOpened(true);
  };

  const handleSelect: AutoComplateProps['onSelect'] = (value, option) => {
    setInputValue(value);
    // onChange 在 onSelect 之前，后者修改 value 的优先级更高
    onChange?.(value);
    onSelect?.(value, option);
    setIsOpened(false);
  };

  const hightlight = (nextIndex: number) => {
    let index = nextIndex;
    if (nextIndex < 0) index = 0;
    if (nextIndex >= options.length) index = options.length - 1;
    setHightlightIndex(index);
  };

  const handleKeyDown: AutoComplateProps['onKeyDown'] = (e) => {
    switch (e.key) {
      case 'Enter': {
        const option = options[hightlightIndex];
        if (option) handleSelect(option.value, option);
        break;
      }
      case 'ArrowDown':
        hightlight(hightlightIndex + 1);
        break;
      case 'ArrowUp':
        hightlight(hightlightIndex - 1);
        break;
      // case 27:
      //   break;
      default:
        break;
    }
    onKeyDown?.(e);
  };

  const generateDropdown = () => {
    const suggestionClasses = classnames(`${PM_PREFIX_CLS}-suggestion-list`);

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
    if (currentOptions.length <= 0) return null;

    return (
      <ul className={suggestionClasses}>
        {loading && (
          <div className="icon-loading">
            <Icon icon="spinner" spin />
          </div>
        )}
        {currentOptions.map((option, index) => {
          const suggestionItemClasses = classnames(`${PM_PREFIX_CLS}-suggestion-item`, {
            'is-active': hightlightIndex === index,
          });
          const label = option.label || option.value;
          return (
            <li
              className={suggestionItemClasses}
              key={option.value}
              onClick={() => handleSelect(option.value, option)}
            >
              {label}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {}, []);

  useEffect(() => {
    onSearch?.(debounceValue);
    setHightlightIndex(-1);
  }, [debounceValue]);

  return (
    <div className={classess}>
      <Input
        onChange={handleChange}
        onFocus={(e) => {
          setIsOpened(true);
          onFocus?.(e);
        }}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {isOpened && generateDropdown()}
    </div>
  );
};

export default AutoComplate;
