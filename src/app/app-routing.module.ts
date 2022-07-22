import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailViewComponent} from './detail-view/detail-view.component';
import {MainViewComponent} from './main-view/main-view.component';

const routes: Routes = [
  {path: 'detail-view/:id', component: DetailViewComponent},
  {path: '', component: MainViewComponent},
  {path: '**', component: MainViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
