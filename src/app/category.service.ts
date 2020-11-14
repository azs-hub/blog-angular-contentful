import { Injectable } from '@angular/core';
import { ContentfulService } from './contentful.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ContentfulService {

  categories = [];

  addCategory(category) {
    var check = this.categories.filter(link => (link.sys.id === category.sys.id));
		if (check.length == 0)
			this.categories.push(category);
  }

  getCategories() {
    return this.categories;
  }

  getCategory(index) {
    return this.categories.filter(link => (link.sys.id === index || link.fields.slug === index));
  }

  clearCategories() {
    this.categories = [];
    return this.categories;
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getNavigation()
		    .then(links => {
		    	for (var link of links) {
		    		this.addCategory(link);
		    	}
		    	resolve(true);
		    });
    });
    }

}