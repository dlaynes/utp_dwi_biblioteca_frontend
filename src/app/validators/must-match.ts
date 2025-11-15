import { AbstractControl, ValidatorFn } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
        return null; // Controls not found, no validation to perform
    }

    // Set error on matchingControl if validation fails
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null; // Return if another validator has already found an error on matchingControl
    }

    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null); // Clear errors if values match
    }

    return null; // Return null at the FormGroup level
    };
}