import { ChangeDetectionStrategy, Component, Output, input, EventEmitter } from '@angular/core';
import { JobInterface } from '../../models/job.model';

@Component({
  selector: 'job-card',
  imports: [],
  templateUrl: './job-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCardComponent {

  public job = input.required<JobInterface>();

  @Output() jobClick = new EventEmitter<JobInterface>();

  public onCardClick() {
    this.jobClick.emit(this.job());
  }

}
