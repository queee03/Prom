import { createContext } from 'react';

import useStore from './useStore';

export interface FormContextProps
  extends Partial<
    Pick<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'validateField' | 'getFieldValue'>
  > {
  initialValues?: Object;
}

const FormContext = createContext<FormContextProps>({});

export default FormContext;
