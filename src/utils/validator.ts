import Schema from 'async-validator';
import type { Rules, ValidateError, ValidateFieldsError, Values } from 'async-validator';

interface ResultType {
  errors: ValidateError[];
  fields: ValidateFieldsError | Values;
}

export const validator = (descriptor: Rules, formData: Values) => {
  const vt = new Schema(descriptor);

  let result: ResultType | undefined;
  vt.validate(formData, (errors, fields) => {
    if (errors) {
      result = { errors, fields };
    }
  });

  return result;
};
