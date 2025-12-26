import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const ISO_DATE_REGEX = /^(\d{4})(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\d|3[01]))?$/;

export function isoDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // champ vide autorisé
    }

    return ISO_DATE_REGEX.test(value) ? null : { isoDate: true };
  };
}
