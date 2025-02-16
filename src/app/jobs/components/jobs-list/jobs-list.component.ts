import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  signal,
  input,
  inject,
  effect,
} from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { JobInterface } from '../../models/job.model';
import { Router } from '@angular/router';


@Component({
  selector: 'jobs-list',
  imports: [JobCardComponent],
  templateUrl: './jobs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class JobsListComponent {
  public jobs = input.required<JobInterface[]>();
  @Output() jobSelected = new EventEmitter<JobInterface>();
  private router = inject(Router);



  public selectedJob = signal<JobInterface | null>(null);
  
  constructor() {
    effect(() => {
      const selectedJob = this.selectedJob();
      if (selectedJob) {
        this.router.navigate([], {
          queryParams: { title: selectedJob.title },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  public onJobClick(job: JobInterface): void {
    this.jobSelected.emit(job); 
  }
}
