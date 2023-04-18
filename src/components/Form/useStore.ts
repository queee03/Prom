import { useReducer, useState } from 'react';

import Schema, { RuleItem, Rules, ValidateError } from 'async-validator';

export interface FormState {
  isValid: boolean;
}

export interface FieldDetail {
  label?: string;
  name?: string;
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
  detail: FieldDetail;
}

export interface ValidateErrorDetail extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
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

function useStore() {
  const [form, setForm] = useState<FormState>({ isValid: true });
  const [fields, dispatch] = useReducer(fieldReducer, {});

  const validateField = async (name: string) => {
    const { value, rules } = fields[name];

    // 此处拿的 value 未必是最新的，待解决
    if (rules) {
      const descriptor: Rules = {
        [name]: rules,
      };

      const values = {
        [name]: value,
      };

      const validator = new Schema(descriptor);
      let isValid = true;
      let errors: ValidateError[] = [];
      try {
        await validator.validate(values);
      } catch (err) {
        isValid = false;
        errors = (err as ValidateErrorDetail).errors;
      } finally {
        dispatch({ type: 'updateValidateResult', name, detail: { isValid, errors } });
      }
    }
  };

  return {
    form,
    fields,
    dispatch,
    validateField,
  };
}
export default useStore;
