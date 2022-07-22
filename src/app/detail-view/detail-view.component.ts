import {Component, OnDestroy, OnInit} from '@angular/core';
import {IssuesService} from '../issues.service';
import {Subscription} from 'rxjs';
import {IssueMainType} from '../main-view/main-view.component';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit, OnDestroy {
  data: IssueMainType;
  private subscription: Subscription;
  CLOSED = 'Closed';
  comments = [];

  constructor(private issuesService: IssuesService) {
  }

  ngOnInit() {
    this.subscription = this.issuesService.getSelectedIssue().pipe(switchMap(selectedIssue => {
      this.data = selectedIssue;
      return this.issuesService.getComments();
    })).subscribe(comments => {
      this.comments = comments;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
