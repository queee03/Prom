import { forwardRef, useImperativeHandle } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import FormContext, { FormContextProps } from './formContext';
import useStore, { ValidateCatchError } from './useStore';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
export interface FormProps extends OriginFormProps, Pick<FormContextProps, 'initialValues'> {
  onFinish?: (values: Record<string, unknown>) => void;
  onFinishFailed?: (values: Record<string, unknown>, errors: ValidateCatchError['fields']) => void;
}
export type FormInstance = Required<Pick<FormContextProps, 'getFieldValue'>>;

export const Form = forwardRef<FormInstance, FormProps>((props, ref) => {
  const { children, className, initialValues, onSubmit, onFinish, onFinishFailed, ...restProps } =
    props;
  const { form, fields, dispatch, validateField, validateAllFields, getFieldValue } = useStore();

  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  const passedContext: FormContextProps = { fields, dispatch, validateField, initialValues };

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
    getFieldValue,
  }));

  return (
    <>
      <form className={classes} onSubmit={handleSubmit} {...restProps}>
        <FormContext.Provider value={passedContext}>{children}</FormContext.Provider>
      </form>
      <div>
        <code>{JSON.stringify(form)}</code>
        <br />
        <code>{JSON.stringify(fields)}</code>
      </div>
    </>
  );
});

export default Form;
