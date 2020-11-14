import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ContentfulService } from '../contentful.service';
import { CategoryService } from '../category.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
	nav: Entry<any>[] = [];
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  	this.nav = this.categoryService.getCategories();
  }

}
