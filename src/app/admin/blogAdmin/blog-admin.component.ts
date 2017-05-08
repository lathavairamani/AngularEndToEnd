import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'blog-admin.component.html',
  styleUrls: ['blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
  
  user: string;
  menuChoice: string;
  blogPosts: Blog[];
  formDisplay: boolean = true;
  singlePost: Blog;
  
  constructor(private userService: UserService, private router: Router, private blogAdminService: BlogAdminService){}
  
  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }
  
  chooseMode(mode: string){
    this.menuChoice = mode;
  }
  
  ngOnInit(){
    this.user = this.userService.loggedInUser;
    this.getPosts();
  }
  
  getPosts(){
    let dbRef = firebase.database().ref('blogPosts/');
    dbRef.once('value')
    .then((snapshot) => {
      let tmp: string[] = snapshot.val();
      this.blogPosts = Object.keys(tmp).map(key => tmp[key])
    });
  }
  
  editPost(thePost: Blog){
    this.singlePost = thePost;
    this.formDisplay = false;
  }
  
  cancelEdit(){
    this.formDisplay = true;
  }
  
  updatePost(single: Blog){
    this.blogAdminService.editPost(single);
    this.formDisplay = true;
  }
  
  deletePost(single: Blog){
    let verify = confirm(`Are you sure you want to delete this post?`);
    if(verify === true){
      this.blogAdminService.removePost(single);
      this.router.navigate(['/admin/']);
    }else{
      alert('Nothing deleted');
    }
  }
  
}