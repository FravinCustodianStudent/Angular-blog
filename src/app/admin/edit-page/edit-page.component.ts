import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form!:FormGroup
  post!:Post
  public submitted = false
  constructor(
    private route:ActivatedRoute,
    private postService:PostService,
    private alert:AlertService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params:Params)=>{
          return this.postService.getById(params['id'])
      })).subscribe((post:Post)=>{
        this.post = post
       this.form = new FormGroup<any>({
         title:new FormControl(post.title,Validators.required),
         text:new FormControl(post.text,Validators.required)
       })
    })
  }

  submit() {
    this.submitted =true
    if (this.form.invalid){
      return
    }
    this.postService.update({
      id:this.post.id,
      text:this.form.value.text,
      title:this.form.value.text,
      author:this.post.author,
      date:this.post.date
    }).subscribe(()=>{
      this.submitted = false
      this.alert.success('post was updated')
    })
  }
}
