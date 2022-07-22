import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private url = 'https://api.github.com/repos/angular/angular/issues';
  private commentsUrl;
  private readonly selectedIssue: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.selectedIssue = new BehaviorSubject<any>({});
  }

  getIssues(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      retry(1),
      catchError(error => {
        console.error('An error happened during getting issues data ', error);
        return EMPTY;
      }));
  }

  setSelectedIssue(issue: any): void {
    this.selectedIssue.next(issue);
    this.commentsUrl = issue.comments_url;
  }

  getSelectedIssue(): Observable<any> {
    return this.selectedIssue;
  }

  getComments(): Observable<any> {
    return this.http.get(this.commentsUrl);
  }
}
