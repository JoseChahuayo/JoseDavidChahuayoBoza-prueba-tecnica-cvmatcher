import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  imports: [],
  selector: 'name-page',
  templateUrl: './name-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NamePageComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Name Page');
    this.meta.updateTag({
      name: 'Name Page',
      content: 'Jose David Chahuayo Boza',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Jose David Chahuayo Boza',
    });
  }
}
