import React, { useContext, useEffect } from 'react';

import classnames from 'classnames';
import { generateTriggerMap, isNil } from '@/utils/utils';

import { PM_PREFIX_CLS } from '@/configs/constant';

import FormContext from './formContext';
import { FieldDetail } from './useStore';

interface FormItemProps
  extends CommonProps,
    Pick<FieldDetail, 'label' | 'name' | 'initialValue' | 'rules'> {
  trigger?: string;
  valuePropName?: string;
  getValueFromEvent?: (...args: any[]) => unknown;
  validateTrigger?: string;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  /* ======================== 获取基础参数 ======================== */
  const {
    className,
    children,
    name,
    label,
    initialValue,
    trigger,
    valuePropName,
    getValueFromEvent,
    rules,
    validateTrigger,
    ...restProps
  } = props as SomeRequired<
    FormItemProps,
    'trigger' | 'valuePropName' | 'getValueFromEvent' | 'validateTrigger'
  >;
  const { fields, dispatch, validateField, initialValues } = useContext(FormContext);
  const fieldState: FieldDetail = fields?.[name!] || {};
  const { value, errors } = fieldState;

  /* ======================== 分析参数 ======================== */
  const hasError = errors && errors.length > 0;
  const isRequired = rules?.some((rule) => rule.required);
  const rowClasses = classnames(
    `${PM_PREFIX_CLS}-form-item-row`,
    { 'no-label': !label },
    className,
  );
  const labelClasses = classnames({
    [`${PM_PREFIX_CLS}-form-item-required`]: isRequired,
  });
  const itemClasses = classnames(`${PM_PREFIX_CLS}-form-item-control`, {
    'has-error': hasError,
  });

  /* ======================== 处理 children ======================== */
  let renderChildren = children;
  const chlidList = React.Children.toArray(children);

  // 在有参数 name 且 child 只有 1 个的情况下才注册 field
  if (name && chlidList.length === 1) {
    // 0. 获取并分析数据

    // 1. 手动的创建一个属性列表，需要有 value 以及 onChange 属性
    const onValueUpdate = (e) => {
      dispatch?.({ type: 'updateValue', name, detail: { value: getValueFromEvent(e) } });
    };
    const onValueValidate = (e) => validateField?.(name, getValueFromEvent(e));

    const events = [
      { trigger, func: onValueUpdate },
      rules && { trigger: validateTrigger, func: onValueValidate },
    ];

    const controlProps: Record<string, unknown> = {
      [valuePropName]: value,
      ...generateTriggerMap(events),
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
        detail: { label, name, initialValue, value: getInitialValue(), rules },
      });
    }, []);
  }

  // 多个 chlid 的情况
  if (chlidList.length > 1) {
    console.warn('Warning: Only support one child element in Form.Item, others will be omitted');
  }

  /* ======================== Return ======================== */
  return (
    <div className={rowClasses} {...restProps}>
      {label && (
        <div className={`${PM_PREFIX_CLS}-form-item-label`}>
          <label className={labelClasses} title={label}>
            {label}
          </label>
        </div>
      )}
      <div className={`${PM_PREFIX_CLS}-form-item-content`}>
        <div className={itemClasses}>{renderChildren}</div>
        {hasError && (
          <div className={`${PM_PREFIX_CLS}-form-item-explain`}>
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  trigger: 'onChange',
  valuePropName: 'value',
  getValueFromEvent: (e) => e.target.value,
  validateTrigger: 'onBlur',
};
export default FormItem;
