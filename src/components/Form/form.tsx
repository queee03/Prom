import { forwardRef, useImperativeHandle } from 'react';

import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import FormContext, { FormContextProps } from './formContext';
import useStore from './useStore';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
export interface FormProps extends OriginFormProps, Pick<FormContextProps, 'initialValues'> {}
export type FormInstance = Required<Pick<FormContextProps, 'getFieldValue'>>;

export const Form = forwardRef<FormInstance, FormProps>((props, ref) => {
  const { children, className, initialValues, ...restProps } = props;
  const { form, fields, dispatch, validateField, getFieldValue } = useStore();

  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  const passedContext: FormContextProps = { fields, dispatch, validateField, initialValues };

  useImperativeHandle(ref, () => ({
    getFieldValue,
  }));

  return (
    <>
      <form className={classes} {...restProps}>
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
