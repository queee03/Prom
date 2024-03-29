import React, { useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { InputProps } from '@/components/Input/input';
import Transition from '@/components/Transition';
import { PM_PREFIX_CLS } from '@/configs/constant';
import { useDebounce } from '@/hooks';

export interface OptionType {
  label?: string | JSX.Element;
  value: string;
}
export type FilterOptionFunctionType = (value: string, option: OptionType) => boolean;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  options: OptionType[];
  onSearch?: (value: string) => void;
  onSelect?: (value: string, option: OptionType) => void;
  onChange?: (value: string) => void;
  value?: string;
  filterOption?: boolean | FilterOptionFunctionType;
  loading?: boolean;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    options,
    onSearch,
    onSelect,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    filterOption = true,
    loading,
    ...restProps
  } = props;
  const classes = classnames(`${PM_PREFIX_CLS}-auto-complete`, {});
  const [inputValue, setInputValue] = useState<string>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hightlightIndex, setHightlightIndex] = useState(-1);
  const selfRef = useRef<HTMLDivElement | null>(null);

  if (!('value' in props)) {
    restProps.value = inputValue;
  }
  const debounceValue = useDebounce(restProps.value || '');

  const handleChange: InputProps['onChange'] = (e) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
    // onSearch?.(e.target.value);
    // 仅用 onFocus 开启 isSearching 是不够的，因为键盘选择不会使 Input 失焦，自然也无法触发 focus
    setIsSearching(true);
  };

  const handleSelect: AutoCompleteProps['onSelect'] = (value, option) => {
    setInputValue(value);
    // onChange 在 onSelect 之前，后者修改 value 的优先级更高
    onChange?.(value);
    onSelect?.(value, option);
    // 仅用 onBlur 关闭 isSearching 是不够的，因为如果是键盘选择，是不会使 Input 失焦的
    setIsSearching(false);
  };

  const hightlight = (nextIndex: number) => {
    let index = nextIndex;
    if (nextIndex < 0) index = 0;
    if (nextIndex >= options.length) index = options.length - 1;
    setHightlightIndex(index);
  };

  const handleKeyDown: AutoCompleteProps['onKeyDown'] = (e) => {
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
        filter = (value, option) => option.value.indexOf(value || '') !== -1;
      } else {
        filter = filterOption;
      }
    } else {
      filter = () => true;
    }

    const currentOptions = options.filter((option) => filter(restProps.value || '', option));
    if (currentOptions.length <= 0) return null;

    return (
      <Transition animation="zoom-in-top" in={isSearching} timeout={300}>
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
      </Transition>
    );
  };

  useEffect(() => {
    if (isSearching) onSearch?.(debounceValue);
    setHightlightIndex(-1);
  }, [debounceValue]);

  return (
    <div className={classes} ref={selfRef}>
      <Input
        onChange={handleChange}
        onFocus={(e) => {
          setIsSearching(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          // 如果不做延迟，那么鼠标单击选择 option 的瞬间 Input 就已经失焦、options 也会被移除，此时点击事件还未完成，也就无法点击到 option-item
          setTimeout(() => {
            setIsSearching(false);
          }, 100);
          onBlur?.(e);
        }}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {/* {isSearching && generateDropdown()} */}
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
