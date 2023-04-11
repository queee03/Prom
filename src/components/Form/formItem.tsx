import React, { useContext, useEffect } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import FormContext from './formContext';
import { FieldDetail } from './useStore';

interface FormItemProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  label?: string;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { className, children, name, label, ...restProps } = props;
  const { fields, dispatch } = useContext(FormContext);

  const rowClasses = classnames(
    `${PM_PREFIX_CLS}-form-item-row`,
    {
      'no-label': !label,
    },
    className,
  );

  const fieldState: FieldDetail = fields?.[name!] || {};
  const { value } = fieldState;

  // 1. 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const onValueUpdate = (e) => {
    dispatch?.({ type: 'updateValue', name, value: e.target.value });
  };
  const controlProps: Record<string, unknown> = {
    // todo: 需自定义
    value,
    onChange: onValueUpdate,
  };
  // 2. 获取 children 数组的第一个元素
  // todo: 判断 children 类型，显示警告
  const chlidList = React.Children.toArray(children);
  const child = chlidList[0] as React.ReactElement;
  // 3. cloneElement，混合这个child 以及 手动的属性列表
  const renderChild = React.cloneElement(child, { ...controlProps });

  useEffect(() => {
    dispatch?.({ type: 'addField', name, value: { name, label } });
  }, []);

  return (
    <div className={rowClasses} {...restProps}>
      {label && (
        <div className={`${PM_PREFIX_CLS}-form-item-label`}>
          <label title={label}>{label}</label>
        </div>
      )}
      <div className={`${PM_PREFIX_CLS}-form-item-content`}>{renderChild}</div>
    </div>
  );
};

export default FormItem;
