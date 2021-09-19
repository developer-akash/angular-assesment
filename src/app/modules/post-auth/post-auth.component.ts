import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventService } from 'src/app/service/event/event.service';
import { ProgressBarService } from 'src/app/common/modules/progress-bar/progress-bar.service';

@Component({
  selector: 'app-post-auth',
  templateUrl: './post-auth.component.html',
  styleUrls: ['./post-auth.component.scss']
})
export class PostAuthComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private eventService: EventService,
    private progressBar: ProgressBarService
  ) {
    /**
     * This get event is responsible for showing the loader in the post auth components
     * @memberof PostAuthComponent
     */
    this.subscriptions.push(this.eventService.GetEvent('SHOW_LOADER').subscribe((data) => {
      if (data) { this.progressBar.show(); }
    }));

    /**
     * This get event is responsible for showing the loader in the post auth components
     * @memberof PostAuthComponent
     */
    this.subscriptions.push(this.eventService.GetEvent('HIDE_LOADER').subscribe((data) => {
      if (data) { this.progressBar.hide(); }
    }));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
