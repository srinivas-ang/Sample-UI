import { FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
   static dateFormatVaidator(AC: AbstractControl) {
    if (AC && !moment(AC.value, 'MM-DD-YYYY', true).isValid()) {
      return 'Please enter correct date format "MM/DD/YYYY".';
    }
    return null;
  }
}