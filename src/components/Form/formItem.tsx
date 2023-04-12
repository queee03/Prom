import React, { useContext, useEffect } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';
import { isNil } from 'utils';

import FormContext from './formContext';
import { FieldDetail } from './useStore';

interface FormItemProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  label?: string;
  initialValue?: unknown;
  trigger?: string;
  valuePropName?: string;
  getValueFromEvent?: (...args: any[]) => string;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const {
    className,
    children,
    name,
    label,
    initialValue,
    trigger,
    valuePropName,
    getValueFromEvent,
    ...restProps
  } = props;
  const { fields, dispatch, initialValues } = useContext(FormContext);

  const rowClasses = classnames(
    `${PM_PREFIX_CLS}-form-item-row`,
    {
      'no-label': !label,
    },
    className,
  );

  let renderChildren = children;
  const chlidList = React.Children.toArray(children);

  // 在有参数 name 且 children 只有 1 个的情况下才注册 field
  if (name && chlidList.length === 1) {
    const fieldState: FieldDetail = fields?.[name] || {};
    const { value } = fieldState;

    // 1. 手动的创建一个属性列表，需要有 value 以及 onChange 属性
    const onValueUpdate = (e) => {
      dispatch?.({ type: 'updateValue', name, value: getValueFromEvent!(e) });
    };
    const controlProps: Record<string, unknown> = {
      [valuePropName!]: value,
      [trigger!]: onValueUpdate,
    };
    // 2. 处理 children
    const child = chlidList[0] as React.ReactElement;
    if (!React.isValidElement(child)) {
      console.error('Child component is not a valid React Element');
    }
    renderChildren = React.cloneElement(child, { ...controlProps });

    useEffect(() => {
      const getInitialValue = () => {
        if (isNil(initialValues?.[name])) return initialValue;
        return initialValues?.[name];
      };

      dispatch?.({
        type: 'addField',
        name,
        value: { name, label, value: getInitialValue() },
      });
    }, []);
  }

  if (chlidList.length > 1) {
    console.warn('Warning: Only support one child element in Form.Item, others will be omitted');
  }

  return (
    <div className={rowClasses} {...restProps}>
      {label && (
        <div className={`${PM_PREFIX_CLS}-form-item-label`}>
          <label title={label}>{label}</label>
        </div>
      )}
      <div className={`${PM_PREFIX_CLS}-form-item-content`}>{renderChildren}</div>
    </div>
  );
};

FormItem.defaultProps = {
  trigger: 'onChange',
  valuePropName: 'value',
  getValueFromEvent: (e) => e.target.value,
};
export default FormItem;
