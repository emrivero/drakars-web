type Property<T> = keyof T;

type Validator = {
  errorMessage: string;
  isValid: (propertyValue: any) => boolean;
};

type FormValidatorProps<T> = { [x in Property<T>]?: Validator[] };
type ValidateResult<T> = {
  [x in Property<T>]?: { valid: boolean; errorMessage: string };
};

export class FormValidator<T> {
  private target: T = null;
  constructor(private validatorProps: FormValidatorProps<T>) {}

  validate(target: T): ValidateResult<T> {
    this.target = target;
    const entries = Object.entries(this.validatorProps);
    let validateResult: ValidateResult<T> = {};

    entries.forEach((val) => {
      const [name, value] = val as [Property<T>, Validator[]];
      validateResult = {
        ...validateResult,
        ...this.validateProperty(name, value),
      };
    });
    return validateResult;
  }

  private validateProperty(
    name: Property<T>,
    validators: Validator[]
  ): {
    [x: string]: {
      valid: boolean;
      errorMessage: string;
    };
  } {
    const infoValidator = validators.find(({ isValid }) => {
      return this.target && !isValid(this.target[name]);
    });

    if (!infoValidator) {
      return {
        [name]: { valid: true, errorMessage: "" },
      };
    }

    return {
      [name]: { valid: false, errorMessage: infoValidator.errorMessage },
    };
  }
}
