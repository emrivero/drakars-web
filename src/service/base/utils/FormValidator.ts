type Property<T> = keyof T;

type Validator<T> = {
  errorMessage: string;
  isValid: (propertyValue: any, target?: T) => boolean;
};

type FormValidatorProps<T> = { [x in Property<T>]?: Validator<T>[] };
type ValidateResult<T> = {
  [x in Property<T>]?: { valid: boolean; errorMessage: string };
};

export class FormValidator<T> {
  private target: T = null;
  private _validateInfo: ValidateResult<T> = {};
  constructor(private validatorProps: FormValidatorProps<T>) {
    this.setValid();
  }

  setValid() {
    this._validateInfo = Object.keys(this.validatorProps).reduce(
      (prev, current) => {
        const validateInfo = prev as ValidateResult<T>;
        prev[current] = {
          valid: true,
          errorMessage: "",
        };
        return validateInfo;
      },
      this._validateInfo
    );
  }

  get validateInfo() {
    return this._validateInfo;
  }

  validateProp(name: Property<T>) {
    this._validateInfo = {
      ...this.validateInfo,
      ...this.validateProperty(name, this.validatorProps[name]),
    };
  }

  validate(target: T): ValidateResult<T> {
    this.target = target;
    const entries = Object.entries(this.validatorProps);
    let validateResult: ValidateResult<T> = {};

    entries.forEach((val) => {
      const [name, value] = val as [Property<T>, Validator<T>[]];
      validateResult = {
        ...validateResult,
        ...this.validateProperty(name, value),
      };
    });
    this._validateInfo = validateResult;
    return validateResult;
  }

  private validateProperty(
    name: Property<T>,
    validators: Validator<T>[]
  ): {
    [x: string]: {
      valid: boolean;
      errorMessage: string;
    };
  } {
    const infoValidator = validators.find(({ isValid }) => {
      return this.target && !isValid(this.target[name], this.target);
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
