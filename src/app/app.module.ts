import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainViewComponent} from './main-view/main-view.component';
import {DetailViewComponent} from './detail-view/detail-view.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    DetailViewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatTableModule,
        HttpClientModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
