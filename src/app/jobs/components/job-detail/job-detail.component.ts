import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JobInterface } from '../../models/job.model';

@Component({
  selector: 'job-detail',
  imports: [],
  templateUrl: './job-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailComponent {
  @Input() job: JobInterface | null = null;

}
