import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {EventModel} from '../../shared/models/event.model';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: EventModel;
  category: CategoryModel;
  /*Флаг загрузки*/
  isLoaded = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params
        .pipe(
          mergeMap(params => {
            return this.eventsService.getEventById(params['id']);
          }),
          mergeMap((event: EventModel) => {
            this.event = event;
            return this.categoriesService.getCategoryById(event.categoryId);
          })
        )
        .subscribe((category) => {
          this.category = category;
          this.isLoaded = true;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
