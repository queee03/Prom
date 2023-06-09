import { useReducer, useState } from 'react';

import Schema, { RuleItem, Rules, ValidateError } from 'async-validator';
// import { each, mapValues } from 'lodash';
import each from 'lodash/each';
import mapValues from 'lodash/mapValues';

// async-validator 验证不通过时默认返回的 error 类型
export interface ValidateCatchError extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, ValidateError[]>;
}

export interface FieldDetail {
  label?: string;
  name?: string;
  initialValue?: unknown;
  value?: unknown;
  rules?: RuleItem[];
  isValid?: boolean;
  errors?: ValidateError[];
}

export interface FieldsState {
  [key: string]: FieldDetail;
}

export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name?: string;
  detail: Partial<FieldDetail>;
}

function fieldReducer(state: FieldsState, action: FieldsAction): FieldsState {
  if (!action.name) return state;

  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: action.detail,
      };
    case 'updateValue': {
      const { value } = action.detail;
      return {
        ...state,
        [action.name]: { ...state[action.name], value },
      };
    }
    case 'updateValidateResult': {
      const { isValid, errors } = action.detail;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors },
      };
    }
    default:
      return state;
  }
}

function useStore(initialValues?: Object) {
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} });
  const [fields, dispatch] = useReducer(fieldReducer, {});

  const getFieldsValue = () => mapValues(fields, 'value');
  const getFieldValue = (key: string) => fields[key] && fields[key].value;
  const setFieldValue = (name: string, value: any) => {
    if (name in fields) {
      dispatch({ type: 'updateValue', name, detail: { value } });
    }
  };
  const resetFields = () => {
    each(fields, (field, name) => {
      dispatch({
        type: 'updateValue',
        name,
        detail: { value: initialValues?.[name] || field.initialValue },
      });
      dispatch({ type: 'updateValidateResult', name, detail: { isValid: true, errors: [] } });
      setForm({ ...form, isSubmitting: false, isValid: true, errors: {} });
    });
  };

  const validateField = async (name: string, value) => {
    let isValid = true;
    let errors: ValidateError[] = [];
    const { rules } = fields[name];

    // 此处拿的 value 未必是最新的，待解决
    if (rules) {
      const descriptor: Rules = {
        [name]: rules,
      };

      const values = {
        [name]: value,
      };

      const validator = new Schema(descriptor);
      try {
        await validator.validate(values);
      } catch (err) {
        isValid = false;
        errors = (err as ValidateCatchError).errors;
      } finally {
        dispatch({ type: 'updateValidateResult', name, detail: { isValid, errors } });
      }
    }
  };

  const validateAllFields = async () => {
    setForm({ ...form, isSubmitting: true });

    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};

    const values = mapValues(fields, 'value'); // { username: 'abc' }
    const descriptor = mapValues(fields, (item) => item.rules || []); // { username: [..] }
    const validator = new Schema(descriptor);

    try {
      await validator.validate(values);
    } catch (err) {
      isValid = false;
      errors = (err as ValidateCatchError).fields;
      each(fields, (field, name) => {
        // errors 中有对应的 key
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: 'updateValidateResult',
            name,
            detail: { isValid: false, errors: itemErrors },
          });
        } else if (field.rules && field.rules.length > 0) {
          // 该 key 没有对应的 errors，却有对应的 rules
          dispatch({ type: 'updateValidateResult', name, detail: { isValid: true, errors: [] } });
        }
      });
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
    }

    return { isValid, errors, values };
  };

  return {
    initialValues,
    form,
    fields,
    dispatch,
    getFieldsValue,
    getFieldValue,
    setFieldValue,
    resetFields,
    validateAllFields,
    validateField,
  };
}
export default useStore;
