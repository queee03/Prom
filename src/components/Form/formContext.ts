import { createContext } from 'react';

import useStore from './useStore';

export interface FormContextProps {
  fields?: ReturnType<typeof useStore>['fields'];
  dispatch?: ReturnType<typeof useStore>['dispatch'];
}

const FormContext = createContext<FormContextProps>({});

export default FormContext;
