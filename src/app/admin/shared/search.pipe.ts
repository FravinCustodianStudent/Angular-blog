import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "./interfaces";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {

  transform(posts: Post[],search=''): Post[] {
    if (search==''){
      return posts
    }else{
      console.log(search)
      return posts.filter(post=>{
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    }

  }

}
