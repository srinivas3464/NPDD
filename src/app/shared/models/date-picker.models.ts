import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

// tslint:disable-next-line: class-name
export class datePickerConfig {
  dateInputFormat: string;
  containerClass: string;
  selectFromOtherMonth: boolean;
  isAnimated: boolean;
  adaptivePosition: boolean;
  showWeekNumbers: boolean;
  returnFocusToInput: boolean;
  isDisabled: boolean;
  clearButtonLabel: string;
  clearPosition: string;
  showClearButton: boolean;
  minMode: BsDatepickerViewMode | undefined;
}
