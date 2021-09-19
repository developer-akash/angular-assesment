import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { ProgressBarService } from './progress-bar.service';
import { Subscription } from 'rxjs';

export interface ProgressBarState {
  show: boolean;
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements AfterViewInit {

  @ViewChild('progressBar', { static: false }) progressBar: NgProgressComponent;

  public activeNow: boolean;
  public subscription: Subscription;

  constructor(private progressbarService: ProgressBarService) {
    this.activeNow = false;
  }

  ngAfterViewInit() {
    this.subscription = this.progressbarService.progressBarState.subscribe((state: ProgressBarState) => {
      this.activeNow = state.show;
      if (this.activeNow && this.progressBar) {
        this.progressBar.start();
      } else {
        this.progressBar.complete();
      }
    });
  }

}
