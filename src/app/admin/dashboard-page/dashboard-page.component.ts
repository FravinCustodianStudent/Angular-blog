import { Component, OnInit } from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private postService:PostService) { }
  searchStr='';
  posts:Post[] = []
  ngOnInit(): void {
    this.postService.getAll().subscribe(posts=>{
      this.posts = posts
    })
  }

  remove(id: string | undefined){
      this.postService.remove(id as string).subscribe(()=>{
        this.posts = this.posts.filter(post=>post.id!==id)
      });
  }
}
