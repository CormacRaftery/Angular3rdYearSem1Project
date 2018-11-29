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


  posts: any = [];
  datasaver: any = [];
  title = "";
  content = "";
  constructor(private ps: PostService) { }
  ngOnInit() {
    this.ps.getPostsData().subscribe(data => {
      this.datasaver = data;
      console.log(this.datasaver);
    });
  }

  onSearchPost(form: NgForm) {
    var k = 0;
    this.posts = this.datasaver;
    console.log(this.posts);
    console.log(this.datasaver);
    var indexes: any = [];
    for (let i in this.datasaver) {
      if (this.datasaver[i].title != form.value.search) {
        indexes[k] = i;
        k++;
      }
    }
    if (k > 0) {
      while (k > 0) {
        k--;
        var removed = this.posts.splice(indexes[k], 1);
        console.log(this.datasaver);
      }
    }
    form.resetForm();
    this.ngOnInit();
  }

  onDelete(id: String) {
    console.log("Delete called " + id);
    this.ps.deletePost(id).subscribe(() => {
      this.ngOnInit();
      this.posts=[];
    })
  }
}
