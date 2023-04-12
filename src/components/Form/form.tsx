import classnames from 'classnames';
import { PM_PREFIX_CLS } from 'configs/constant';

import FormContext, { FormContextProps } from './formContext';
import useStore from './useStore';

type OriginFormProps = React.FormHTMLAttributes<HTMLFormElement>;
interface FormProps extends OriginFormProps, Pick<FormContextProps, 'initialValues'> {}

export const Form: React.FC<FormProps> = (props) => {
  const { children, className, initialValues, ...restProps } = props;
  const { form, fields, dispatch } = useStore();

  const classes = classnames(`${PM_PREFIX_CLS}-form`, className);
  const passedContext: FormContextProps = { fields, dispatch, initialValues };

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
};

export default Form;
