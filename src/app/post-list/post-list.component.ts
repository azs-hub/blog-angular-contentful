import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Entry } from 'contentful';

// import { InfiniteScroll } from 'ngx-infinite-scroll';

import { ContentfulService } from '../contentful.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
	posts: Entry<any>[] = [];
  category: string;
  params: Object = {
    skip: 0,
    limit: 2
  };

// pagination var
  page: Number = 1;
  count: Number = 0;
  tableSize: Number = 7;
  tableSizes: Array<Number> = [3, 6, 9, 12];
  
  constructor(private route: ActivatedRoute,
  private contentfulService: ContentfulService,
  private categoryService: CategoryService) { }

  // fetch data on init
  ngOnInit() {

    this.route.params.subscribe(routeParams =>{
      
      if (routeParams.slug === undefined)
      {
        this.category = undefined;
        this.getPosts();

      } else {
        this.category = routeParams.slug;
        var catId = this.categoryService.getCategory(routeParams.slug);
        
        if (catId.length > 0) {
          var req = {
            key: 'fields.category.sys.id',
            val: catId[0].sys.id
          }
          this.getPosts(req);
        }
      }
    });
  }

  nextPage(event) {
     this.params['skip'] = (event-1) * this.params['limit'];
    this.page = event;

    this.getPosts();
  }

  getPosts (query?: Object) {
    var req = [];

    if (query !== undefined) {
      req[query['key']] = query['val'];
    }
    
    req['skip'] = this.params['skip'];
    req['limit'] = this.params['limit'];

    this.contentfulService.getPosts(req)
    .then((res) => {
      
      // this.posts = res['posts'];
      this.posts = this.posts.concat(res['posts']);
      this.count = res['pagination'].total;
      this.params['skip'] = res['pagination'].skip;
    });
  }

  onScroll() {
    console.log('onScroll', this.params);

    if (this.params['skip'] == 0)
      this.params['skip'] = 2
    else
      this.params['skip'] = this.params['skip'] + 2

    this.getPosts();
  }

}
