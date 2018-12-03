import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
//initialise variables
  posts: any = [];
  datasaver: any = [];

  //set up constructor
  constructor(private ps: PostService) { }
  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      //copy data into datasaver array
      this.datasaver = data;
      console.log(this.datasaver);
    });
  }

  onSearchPost(form: NgForm) {
    var k = 0;
    //copy data into posts array
    this.posts = this.datasaver;
    console.log(this.posts);
    console.log(this.datasaver);
    var indexes: any = [];
    //enter a for loop to remove each post with the incorrect password, 
    //cannot simply search for password as you need the end of the post
    for (let i in this.datasaver) {
      if (this.datasaver[i].password != form.value.search) {
        //remember each index which is not the correct password
        indexes[k] = i;
        k++;
      }
    }
    if (k > 0) {
      while (k > 0) {
        //remove from end first so that the indexes remain the same
        k--;
        //remove posts using splice
        var removed = this.posts.splice(indexes[k], 1);
        console.log(this.datasaver);
      }
    }
    form.resetForm();
    this.ngOnInit();
  }
  //delete each individual post
  onDelete(id: String) {
    console.log("Delete called " + id);
    this.ps.deletePost(id).subscribe(() => {
      this.ngOnInit();
      this.posts=[];
    })
  }
}
