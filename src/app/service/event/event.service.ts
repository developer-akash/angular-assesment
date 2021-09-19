// Used to store key value pairs
interface Event {
    key: string;
    value: any;
}

/**
 * All data sharing through out the application should passing data from here.
 * @export
 * @class EventService
 * @author Akash Das
*/

// Start of Event Service code
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    protected _eventsSubject = new Subject<Event>();

    constructor() {
    }

    /**
     * Method is responsible for Broadcast event
     * @param {string} key
     * @param {any} value
     */
    public BroadcastEvent(key: string, value: any) {
        this._eventsSubject.next({ key, value });
    }

    /**
     * Method is responsible for receive event
     * @param {string} key
     */
    public GetEvent(key: string): Observable<any> {
        return this._eventsSubject.asObservable().pipe(
            filter(e => e.key === key),
            map(e => e.value)
        );
    }
}
