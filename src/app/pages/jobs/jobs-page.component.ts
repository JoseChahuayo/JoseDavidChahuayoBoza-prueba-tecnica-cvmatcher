import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { JobInterface } from '../../jobs/models/job.model';
import { JobDetailComponent } from '../../jobs/components/job-detail/job-detail.component';
import { JobsListComponent } from '../../jobs/components/jobs-list/jobs-list.component';
import { JobsService } from '../../jobs/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [JobDetailComponent, JobsListComponent],
  templateUrl: './jobs-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class JobsPageComponent implements OnInit {
  private jobsService = inject(JobsService);

  private title = inject(Title);
  private meta = inject(Meta);

  public jobs = signal<JobInterface[]>([]);

  public route = inject(ActivatedRoute);
  private router = inject(Router);

  public selectedJob = signal<JobInterface | null>(null);

  ngOnInit(): void {
    this.title.setTitle('Jobs Page');
    this.meta.updateTag({
      name: 'JobsPage',
      content: 'Jose David Chahuayo Boza',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Jose David Chahuayo Boza',
    });

    this.route.queryParams.subscribe((params) => {
      const title = params['title'] || '';
      const location = params['location'] || '';
      const modality = params['modality'] ? +params['modality'] : undefined;
      const experience = params['experience']
        ? +params['experience']
        : undefined;
      const code = params['code'] || null;

      if (
        title !== '' ||
        location !== '' ||
        modality !== null ||
        experience !== undefined
      ) {
        this.loadJobs(title, location, modality, experience);
      }

      if (code) {
        this.loadJobDetail(code);
      }
    });
  }

  loadJobDetail(code: string) {
    this.jobsService.getJobs().subscribe((jobs) => {
      const job = jobs.find((j) => j.code === code);
      this.selectedJob.set(job || null);
    });
  }

  updateUrlWithParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  searchJobs(
    title: string,
    location: string,
    modality: number | null,
    experience: number | null = null
  ) {
    const params: any = {};
    if (title) params.title = title.trim();
    if (location) params.location = location.trim();
    if (modality) params.modality = modality;
    if (experience) params.experience = experience;
    this.loadJobs(
      params.title,
      params.location,
      params.modality,
      params.experience
    );
    this.updateUrlWithParams(params);
  }

  loadJobs(
    title?: string,
    location?: string,
    modality?: number,
    experience?: number
  ) {
    this.jobsService
      .getJobs(title || '', location || '', modality, experience)
      .subscribe((jobs) => {
        this.jobs.set(jobs);
        const params: any = {};
        if (title) params.title = title;
        if (location) params.location = location;
        if (modality) params.modality = modality;
        if (experience) params.experience = experience;

        this.updateUrlWithParams(params);
      });
  }

  onJobSelected(job: JobInterface) {
    this.selectedJob.set(job);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { code: job.code },
      queryParamsHandling: 'merge',
    });
  }
}
