import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IssuesService} from '../issues.service';
import {Subscription} from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router} from '@angular/router';

export interface User {
  avatar_url: string;
  login: string;
}

export interface IssueMainType {
  id: string;
  state: string;
  title: string;
  comments: number;
  issue_nr: string;
  created_at: Date;
  closed_at: Date;
  body: string;
  user: User;
  comments_url: string;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['state', 'title', 'comments', 'id', 'date'];
  dataSource: MatTableDataSource<IssueMainType>;
  subscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  CLOSED = 'Closed';

  constructor(private issuesService: IssuesService, private liveAnnouncer: LiveAnnouncer, private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.issuesService.getIssues().subscribe(data => {
      this.dataSource = new MatTableDataSource<IssueMainType>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showDetail(issue): void {
    console.log(issue);
    this.issuesService.setSelectedIssue(issue);
    this.router.navigate([`detail-view/${issue.id}`]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

}
