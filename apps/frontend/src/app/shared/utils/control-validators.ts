import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const validateEmail = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^\w+([.+-]|\w+)*@\w+([.-]\w+)*\.\w{2,3}$/;
    return regex.test(control.value) ? null : {'invalidEmail':true};
  };
}

export const validatePhone  = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null  => {
    const regex = new RegExp(/^[0-9]{8}$/);
    return (regex.test(control.value)) ? null : {'invalidPhone':true};
  }
}
