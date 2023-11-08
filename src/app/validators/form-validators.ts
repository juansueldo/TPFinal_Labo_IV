import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class FormValidator{

  static onlyLetters(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^([^\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u02B0-\u036F\u00D7\u00F7\u2000-\u2BFF])+$/;

    if (regex.test(valor)) {
      return null;
    } else {
      return { onlyLetters: true };
    }
  }
  static lettersAndNumbers(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^[A-z0-9Á-ü]+$/;
    if (regex.test(valor)) {
      return null;
    } else {
      return { lettersAndNumbers: true };
    }
  }

  static onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^[0-9]+$/;

    if (regex.test(valor)) {
      return null;
    } else {
      return { onlyNumbers: true };
    }
  }

  static validDate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex = /^([0-9]{4})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;

    if (regex.test(valor)) {
      return null;
    } else {
      return { validDate: true };
    }
  }
  static onlyLettersAndSpaces(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    const regex =  /^[a-zA-Z\s.\-]*$/;
  
    if (regex.test(valor)) {
      return null;
    } else {
      return { onlyLettersAndSpaces: true };
    }
  }
  static validateFileType(allowedExtensions: string[]) {
    return (control: any) => {
      const file = control.value;
      if (file instanceof File) { // Verifica si es una instancia de File
        const extension = file.name.split('.').pop();
        if (!allowedExtensions.includes(extension)) {
          return { invalidFileType: true };
        }
      }
      return null;
    };
  }


}