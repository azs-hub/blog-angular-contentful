import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

	post: Entry<any>;
	markdownString: string;
	richText: string;


  constructor(private route: ActivatedRoute,
  private location: Location,
  private contentfulService: ContentfulService) { }

  ngOnInit(): void {

  	
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) => this.contentfulService.getPost(params.get('postslug'))))

    .subscribe((post) => {
      console.log('post-detail', post);
      if (post) {
      	this.post = post;
      	this.markdownString = post['fields']['content'];
      	let options = {
  			  renderNode: {
  			    'embedded-asset-block': (node) =>
  			      `<img class="img-fluid" width="150" src="${node.data.target.fields.file.url}"/>`
  			  }
  			}
        this.richText = documentToHtmlString(post.fields.content || '', options);
      }
    });

  }

}