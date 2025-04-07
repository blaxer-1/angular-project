import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function titleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value !== value.toUpperCase()) {
      return {notUppercase: true};
    }
    return null;
  };
}

export function directorValidator(): ValidatorFn {
  const regex = /^[A-Z]+ [A-Z][a-z]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !regex.test(value)) {
      return {invalidNameFormat: true};
    }
    return null;
  };
}

export function releaseDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      const inputDate = new Date(value);
      const today = new Date();
      if (inputDate > today) {
        return {dateNotBeforeToday: true};
      }
    }
    return null;
  };
}
