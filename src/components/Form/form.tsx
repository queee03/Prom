import { forwardRef, ReactNode, useImperativeHandle } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import FormContext, { FormContextProps } from './formContext';
import useStore, { ValidateCatchError } from './useStore';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
export interface FormProps extends OriginFormProps, Pick<FormContextProps, 'initialValues'> {
  onFinish?: (values: Record<string, unknown>) => void;
  onFinishFailed?: (values: Record<string, unknown>, errors: ValidateCatchError['fields']) => void;
}
export type FormInstance = Omit<
  ReturnType<typeof useStore>,
  'initialValues' | 'form' | 'fields' | 'dispatch'
>;

export const Form = forwardRef<FormInstance, FormProps>((props, ref) => {
  const { children, className, initialValues, onSubmit, onFinish, onFinishFailed, ...restProps } =
    props;
  const { initialValues: _, form, fields, dispatch, ...restStore } = useStore(initialValues);
  const { validateAllFields, validateField } = restStore;

  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  const passedContext: FormContextProps = { initialValues, fields, dispatch, validateField };

  const handleSubmit: FormProps['onSubmit'] = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit?.(e);
    const { isValid, errors, values } = await validateAllFields();
    if (isValid) {
      onFinish?.(values);
    } else {
      onFinishFailed?.(values, errors);
    }
  };

  useImperativeHandle(ref, () => ({
    ...restStore,
  }));

  let childrenNode: ReactNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }

  return (
    <form className={classes} onSubmit={handleSubmit} {...restProps}>
      <FormContext.Provider value={passedContext}>{childrenNode}</FormContext.Provider>
    </form>
  );
});

export default Form;
