import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-post-delete-all',
  templateUrl: './post-delete-all.component.html',
  styleUrls: ['./post-delete-all.component.css']
})
export class PostDeleteAllComponent implements OnInit {
//initialise variables and hardcode developerPassword required to delete all posts
  developerPassword = "deleteAll";
  posts: any = [];
  title = "";
  content = "";
  constructor(private ps: PostService) { }
  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      //get all data into posts
      this.posts = data;
      console.log(this.posts);
    });
  }

  onDelete(form: NgForm) {
    console.log("Delete called ");
    if (this.developerPassword == form.value.password) {
      console.log("passwords match");
      //if password is correct delete each post by id
      for (let i in this.posts) {
        this.onDeleting(this.posts[i]._id);
      }
    }
  }

  onDeleting(id: String) {
    console.log("Delete called " + id);
    this.ps.deletePost(id).subscribe(() => {
      this.ngOnInit();
    })
  }
}
