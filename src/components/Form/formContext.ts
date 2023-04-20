import { createContext } from 'react';

import useStore from './useStore';

export type FormContextProps = Partial<
  Pick<ReturnType<typeof useStore>, 'initialValues' | 'fields' | 'dispatch' | 'validateField'>
>;

const FormContext = createContext<FormContextProps>({});

export default FormContext;
