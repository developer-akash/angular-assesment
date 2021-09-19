import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ProgressBarState {
    show: boolean;
}

@Injectable()
export class ProgressBarService {
    private loaderSubject = new Subject<ProgressBarState>();
    public progressBarState = this.loaderSubject.asObservable();
    constructor() { }
    /**
     * Function responsible for show progress bar
     * @memberof ProgressBarState
     */
    show() {
        this.loaderSubject.next(<ProgressBarState>{ show: true });
    }

    /**
     * Function responsible for hide progrssbar
     * @memberof ProgressBarState
     */
    hide() {
        this.loaderSubject.next(<ProgressBarState>{ show: false });
    }
}
