import { Component, OnInit } from '@angular/core';
import {PostService} from "../../shared/post.service";

import {Post} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private postService:PostService,private alert:AlertService) { }
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
        this.alert.danger("post was deleted")
      });
  }
}
