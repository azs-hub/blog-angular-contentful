import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home',  component: HomeComponent },
  { path: 'posts',  
  	children: [
      {
        path: '',    
        component: PostListComponent,
      },
      {
        path: ':slug',    
        children: [
        {
          path: '',    
          component: PostListComponent,
        },{
          path: 'post/:postslug',    
          component: PostDetailComponent,
        }]
      }
    ]
	},
  { path: 'post/:postslug',  component: PostDetailComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
