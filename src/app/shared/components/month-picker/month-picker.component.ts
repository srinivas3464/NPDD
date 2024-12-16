import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { datePickerConfig } from '../../models/date-picker.models';
import { DatePickerService } from '../../services/date-picker.service';
import { SessionService } from '../../services/session.service';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
})
export class MonthPickerComponent implements OnInit {
  bsConfig: datePickerConfig = this.datePicker.getDatePickerConfig();
  @ViewChild('dpDate') dpDate: ElementRef | undefined;
  minMode: BsDatepickerViewMode = 'month';

  @Input() PlaceHolder: any;
  @Input()
  maxMonth!: Date;
  @Input() minMonth!: Date;

  @Output()
  selectedDateChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  selectedDate!: string;

  constructor(
    private datePicker: DatePickerService,
    private session: SessionService,
    private toast: ToasterService,
    private utils: UtilsService
  ) {
    this.bsConfig.containerClass = this.datePicker.getColor('dark-blue');
    this.bsConfig.minMode = this.minMode;
  }

  ngOnInit(): void {}

  onDateChange(value: Date): void {
    if (value !== null && value !== undefined) {
      const dateString = this.session.getDateString(value);
      if (!this.utils.isEmpty(dateString)) {
        if (this.utils.isValidDate(dateString)) {
          this.selectedDateChange.emit(dateString);
          return;
        }
      }
    }
    if (this.dpDate) {
      this.dpDate.nativeElement.value = '';
      this.selectedDateChange.emit('');
    }
    return;
  }
  
}
