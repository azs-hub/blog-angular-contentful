import { Component, OnInit } from '@angular/core';

import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';

// import { NgbdCarouselBasic } from '../carousel-basic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	posts: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulService) { }

  ngOnInit(): void {
  	this.contentfulService.getPosts({skip: 0, limit: 4})
    .then((res) => {
      
      this.posts = res['posts'];
      console.log('posts', res);
    });
  }

}
