import { Component, OnInit } from '@angular/core';
import { ContentfulService } from './contentful.service';
import { Entry } from 'contentful';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'contentful-product-catalog-angular';

  constructor(private contentfulService: ContentfulService) { }

  // fetch data on init
  ngOnInit() {
    
  }
}
