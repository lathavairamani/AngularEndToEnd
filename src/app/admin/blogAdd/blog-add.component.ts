import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../adminShared/blog';
import { BlogAdminService } from '../adminShared/blog-admin.service';

@Component({
  selector: 'add-menu',
  templateUrl: './blog-add.component.html'
})

export class BlogAddComponent {
  imgTitle: string;
  imageSrc: string;
  postTitle: string;
  content: string;
  post: Blog;
  
  constructor(private blogAdminService: BlogAdminService, private router: Router){}
  
  fileLoad($event:any){
    let reader: FileReader = new FileReader();
    let file: File = $event.target.files[0];
    this.imgTitle = file.name;
    reader.readAsDataURL(file);
    
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    }
  }
  
  createPost(){
    this.post = new Blog(this.postTitle, this.content, this.imgTitle, this.imageSrc.substring(23));
    this.blogAdminService.createPost(this.post);
    alert(`${this.postTitle} added to posts`);
    this.router.navigate(['/admin']);
  }
  
  cancel(){
    this.router.navigate(['/admin']);
  }
  
}