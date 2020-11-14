import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import the router modules and the types for routes
import { RouterModule, Routes }   from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// import services
import { ContentfulService } from './contentful.service';
import { CategoryService } from './category.service';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MarkedPipe } from './marked.pipe';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function init_app(appConfigService: CategoryService) {
    return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    MarkedPipe,
    CategoryListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule, // to remove
    InfiniteScrollModule,
    NgbModule
  ],
  providers: [
  	ContentfulService,
    CategoryService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [CategoryService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
