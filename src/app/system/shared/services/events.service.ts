import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {EventModel} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})

export class EventsService extends BaseApi {

  constructor(protected http: HttpClient) {
    super(http);
  }

  /*Добавление события*/
  addEvent(event: EventModel): Observable<EventModel> {
    return this.post('events', event);
  }

  /*Получение всех событий*/
  getEvents(): Observable<EventModel[]> {
    return this.get('events');
  }
}
