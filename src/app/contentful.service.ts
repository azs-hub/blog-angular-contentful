import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { ApiService } from './api.service';

const CONFIG = {
  
  category: '5KMiN6YPvi42icqAUQMCQe',
  author: '1kUEViTN4EmGiEaaeC6ouY',
  post: '2wKn6yEnZewu2SCCkus4as'
  
}

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient;

  constructor(private api: ApiService) {
    this.cdaClient = createClient(api.apiAccess());
  }

  getNavigation(): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.category
    }, { 'fields.navigation': true })).then(res => {
    	return res.items;
    });
  }

  getPosts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.post
    }, query)).then(res => {
      var posts = [];
      posts["pagination"] = {
        total: res['total'],
        skip: res['skip'],
        limit: res['limit']
      };
      // posts["pagination"]["total"] = res['total'];
      // posts["pagination"]["skip"] = res['skip'];
      // posts["pagination"]["limit"] = res['limit'];
      posts["posts"] = res.items;
      return posts;
    });
  }

  getPost(slug: string): Promise<Entry<any>> {
    return this.getPosts({ 'fields.slug': slug })
    .then(items => {
    	// const rawRichTextField = items[0].fields.body;
     //  items[0].fields.body = documentToHtmlString(rawRichTextField);
    	return items['posts'][0];
    })
  }
 
  // getCategoryId(slug: string): Promise<Entry<any>> {
  //   return this.cdaClient.getEntries(Object.assign({
  //     content_type: CONFIG.category
  //   }, { 'fields.sys.id': slug }))
  //   .then(res => {
  //     return res.items[0];
  //   });
  // }


}
