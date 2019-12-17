import { Injectable } from '@angular/core';
import { FormGroup} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }
  MustMatch(controlName: string, matchingControlName: string) {
    return (group: FormGroup) => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.notSame) {
        //return if another validator has already found an error on the matchingControl
        return;
      }
      //set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ notSame: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
